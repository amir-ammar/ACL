import axios from 'axios';
import { useAppContext } from '../context/App/appContext';
import { backendApi } from '../projectConfig';
import { useEffect, useState } from 'react';

function RequestCourse({ courseId }) {
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const { user, token } = useAppContext();
  console.log(user);
  useEffect(() => {
    setLoading(true);
    let url = `${backendApi}request/getRequests/${courseId}`;
    axios.get(url,
      {
        headers:
          { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log("request", res);
        if (res.data.length > 0) {
          setState(true);
        }
      })
      .catch(
        (err) => console.warn(err)
      ).finally(()=>setLoading(false));
  }, []);
  function handleRequestCourse() {
    setLoading(true);
    let url = `${backendApi}request/addRequest/${courseId}`;
    let data = {};
    axios.post(url, data,
      {
        headers:
          { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res);
        setState(true);
      })
      .catch(
        (err) => console.warn(err)
      ).finally(
        ()=>setLoading(false)
      );
  }
  return (
    <>
      {state ? <button
        className='btn btn-primary w-75'
        disabled={true}>
          {isLoading ? <i className="fa fa-refresh fa-spin"></i>
            : "Bending"}
      </button> :
        <button
          className='btn btn-primary w-75'
          disabled={isLoading}
          onClick={handleRequestCourse}>
          {isLoading ? <i className="fa fa-refresh fa-spin"></i>
            : "Request"}
        </button>}
    </>
  )
}
export default RequestCourse;