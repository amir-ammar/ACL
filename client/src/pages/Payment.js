import React from 'react';
import { handleCheckout } from '../services/Payment';
export default function Payment() {
  // TODO only for testing purpose
  let courseId = '635f73a23569cc0d7e43d80e';
  return (
    <div className='container d-flex justify-content-center'>
      <button
        className='btn btn-lg btn-primary'
        onClick={() => handleCheckout(courseId)}
      >
        checkout
      </button>
    </div>
  );
}
