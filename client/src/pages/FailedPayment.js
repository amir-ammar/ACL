import React from 'react'
import { useNavigate } from "react-router-dom";

export default function FailedPayment() {
  const navigate = useNavigate();

  setTimeout(()=>navigate('/'),4000);

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
      <div className='w-100 text-center'>
        <i className='fa fa-times fa-5x text-danger border border-5 p-5 rounded rounded-circle' aria-hidden="true"></i>
        <h2 className='text-danger'>failed payment</h2>
        <h6 className='text-info'>you will be redirected to home page please try again</h6>
      </div>
    </div>
  )
}
