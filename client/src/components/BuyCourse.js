import { handleCheckout } from '../services/Payment';
import { useAppContext } from '../context/App/appContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendApi } from '../projectConfig';
import { useNavigate } from 'react-router-dom';

function BuyCourse({ courseId, coursePrice }) {
  const navigate = useNavigate();
  const { token, user } = useAppContext();
  const [wallet, setWallet] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let url = `${backendApi}user/wallet/${user._id}`;
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setWallet(res.data.balance);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  function handleBuyCourse() {
    handleCheckout(courseId);
  }
  function handleBuyWithWallet() {
    setIsLoading(true);
    let url = `${backendApi}course/buyWithWallet/${courseId}`;
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        navigate(`/course/${courseId}/content`);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("sorry we couldn't complete the enrollment trying again");
        console.log(err);
      });
  }

  let buyFor = coursePrice - wallet;
  if (buyFor < 0) {
    buyFor = 0;
  }

  return (
    <>
      <p className='text-info'>your wallet balance {wallet}$</p>
      <small> </small>
      {buyFor !== 0 ? (
        <button className='btn btn-primary w-75' onClick={handleBuyCourse}>
          Buy Now
        </button>
      ) : (
        <button
          className='btn btn-primary w-75'
          disabled={isLoading}
          onClick={handleBuyWithWallet}
        >
          {isLoading ? (
            <i class='fa fa-refresh fa-spin'></i>
          ) : (
            'Buy with wallet'
          )}
        </button>
      )}
    </>
  );
}

export default BuyCourse;
