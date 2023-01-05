import React from 'react';
import notAllowed from '../assets/images/not-auth.png';

function NotAllowed() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img
        src={notAllowed}
        alt='Not allowed'
        style={{
          width: '50%',
          height: '30%',
          objectFit: 'contain',
          marginBottom: '1rem',
        }}
      />
      <div
        style={{
          width: '50%',
          backgroundColor: '#f5f5f5',
          borderRadius: '0.5rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>Not Authorized</h1>
        <p>
          You are not authorized to access this page.
          <span>
            <a href='/'>Go back to home page</a>, sorry for the inconvenience.
          </span>
        </p>
      </div>
    </main>
  );
}

export default NotAllowed;
