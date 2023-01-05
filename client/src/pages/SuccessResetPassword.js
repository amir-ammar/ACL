import React from 'react';
import { Link } from 'react-router-dom';
import Success from '../assets/images/success.png';
import CustomStepper from '../components/CustomStepper';

function SuccessResetPassword() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5rem',
        height: '100vh',
        width: '100vw',
      }}
    >
      <CustomStepper
        steps={['Email', 'Reset Password', 'Success']}
        activeStep={2}
      />
      <img src={Success} alt='success' style={{ width: '10rem' }} />
      <h1 style={{ fontSize: '2rem', fontWeight: '300' }}>
        Your password has been reset successfully
      </h1>
      <p style={{ fontSize: '1.2rem', fontWeight: '300' }}>
        You can now login with your new password
      </p>
      <Link
        to='/login'
        style={{
          width: '20rem',
          height: '3rem',
          border: 'none',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '1.2rem',
          fontWeight: '300',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
          textDecoration: 'none',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        Go to login
      </Link>
    </main>
  );
}

export default SuccessResetPassword;
