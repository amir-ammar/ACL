import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../context/App/appContext';
import CustomStepper from '../components/CustomStepper';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5rem',
    height: '100vh',
    width: '100vw',
  },
  emailForm: {
    width: '30rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    width: '30rem',
    height: '3rem',
    border: 'none',
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    fontWeight: '300',
    outline: 'none',
    '&:focus': {
      borderBottom: '1px solid #000',
    },
  },
  submitBtn: {
    width: '20rem',
    height: '3rem',
    border: 'none',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: '300',
    outline: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
}));

function ForgetPassword() {
  const classes = useStyles();
  const email = useRef();
  const navigate = useNavigate();
  const { setAlert, clearAlert, alert, alertText, alertType } = useAppContext();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (email.current.value) {
      try {
        console.log(email.current.value);
        const response = await axios.post(
          'http://localhost:8080/api/v1/auth/forgetPassword',
          { email: email.current.value }
        );
        console.log(response);
        setAlert('success', 'Reset link sent to your email');
        setTimeout(() => {
          clearAlert();
        }, 3000);
      } catch (error) {
        setAlert('error', error.response.data.message);
        setTimeout(() => clearAlert(), 3000);
      }
    } else {
      setAlert('error', 'Please Provide Email');
      setTimeout(() => clearAlert(), 3000);
    }
  };

  return (
    <main className={`${classes.main}`}>
      <CustomStepper
        steps={['Send Email', 'Reset Password', 'Reset Password Success']}
        activeStep={0}
      />
      {alert && (
        <Alert variant='filled' severity={alertType}>
          {alertText}
        </Alert>
      )}
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '300',
          marginBottom: '2rem',
        }}
      >
        Forget Password
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          fontWeight: '300',
          color: '#333',
          marginBottom: '2rem',
        }}
      >
        Enter your email address
      </p>
      <form onSubmit={handleForgetPassword} className={`${classes.emailForm}`}>
        <input
          type='email'
          ref={email}
          className={`${classes.email}`}
          placeholder={'Enter email address'}
        />
        <button type='submit' className={`${classes.submitBtn}`}>
          Send Email
        </button>
      </form>
    </main>
  );
}

export default ForgetPassword;
