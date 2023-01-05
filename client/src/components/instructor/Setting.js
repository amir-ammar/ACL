
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/App/appContext';
import { Navigate } from 'react-router-dom';
import { backendApi } from '../../projectConfig';
function Setting() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [wallet,setWallet] = useState('');

  const { token, user, dispatch, addToLocalStorage } = useAppContext();
  if(!user){
    Navigate('/');
  }
  const [Bio, setbio] = useState(user.biography);
  const [Email,setemail]=useState(user.eamil);
  useEffect(()=>{
    axios.get(`${backendApi}user/wallet/${user._id}`,{headers:{authorization:`Bearer ${token}`}}).then((res)=>{
      setWallet(res.data);
    }
    ).catch((err)=>{
      console.warn(err);
    })
  },[])
  console.log("wallet",wallet);

  const changehandler = (e) => {
    axios.patch(
      `http://localhost:8080/api/v1/user/restestpassword/`, { oldPassword: oldPassword, newPassword: newPassword }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })

  };
  console.log(" Bio ", Bio)
  const updatehandler = async (e) => {
    e.preventDefault();
    await axios.patch(
      `http://localhost:8080/api/v1/user/updateBio/`, { Bio: Bio }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        user.biography = Bio;
        dispatch({
          type: 'USER_SETUP_SUCCESS',
          payload: {
            token,
            user,
          },
        })
        addToLocalStorage({ user, token })
      }).catch((err) => {
        console.log(err);
      })
  };
  const updatehandler1 = async (e) => {
    console.log(Email)
    e.preventDefault();
    await axios.patch(
      `http://localhost:8080/api/v1/user/updateEmail/`, { Email: Email }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        user.email = Email;
        dispatch({
          type: 'USER_SETUP_SUCCESS',
          payload: {
            token,
            user,
          },
        })
        addToLocalStorage({ user, token })
      }).catch((err) => {
        console.log(err);
      })
  };
  return (
    <>
      <div className="border border-5 p-5 shadow shadow-lg container" style={{ margin: "100px" }}>
        <h2>Wallet</h2>
        <h5 className="text-info">you earned from the system <b>{wallet.balance}$</b></h5>
        <h2>Change Password</h2>
        <form>
          <div class="row">
            <div class="col-sm-4">
              <lable>old password</lable>
              <input type="password" class="form-control" onChange={(e) => { setOldPassword(e.target.value) }} placeholder="Enter old password" />
            </div>
            <div class="col-sm-4">
              <lable>new password</lable>
              <input type="password" class="form-control" onChange={(e) => { setNewPassword(e.target.value) }} placeholder="Enter new password" />
            </div>
            <div class="col-sm-1">
              <br />
              <button type="button" class="btn btn-outline-success" onClick={changehandler}>Submit</button>
            </div>
            <label>{newPassword}</label>
          </div>
        </form>
        <hr></hr>
        <h2>Change Mail</h2>
        <form>
          <div class="row">
            <div class="col-sm-4">
            <lable>Email {user.email}</lable>
            </div>
            <div class="col-sm-4">
            <lable>New Email</lable>
              <input type="text" class="form-control" onChange={(e) => { setemail(e.target.value) }} placeholder="Enter new Email" />
            </div>
            <div class="col-sm-1">
              <br />
              <button type="button" class="btn btn-outline-success" onClick={updatehandler1}>Submit</button>
            </div>
            <label>{newPassword}</label>
          </div>
        </form>
        <hr></hr>
        <form className='container mt-3'>
          <h2>Edit the biography</h2>
          <div class="mb-3 mt-3">
            <label for="comment">Comments:</label>
            <textarea class="form-control" rows="5" onChange={(e) => { setbio(e.target.value) }}>{Bio}</textarea>
          </div>
          <button type="submit" class="btn btn-outline-success float-end" onClick={updatehandler} >Submit</button>
        </form>
      </div>
    </>
  );
}

export default Setting;