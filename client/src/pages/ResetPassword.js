import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CustomStepper from '../components/CustomStepper';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  resetForm: {
    width: '30rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetInput: {
    width: '100%',
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
  resetButton: {
    width: '70%',
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

const ResetPassword = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { token } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/auth/resetPassword`,
          {
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmRef.current.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        localStorage.setItem('token', response.data.token);
        navigate('/resetPassword');
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      console.log('Password do not match');
    }
  };

  return (
    <main className={`${classes.main}`}>
      <CustomStepper
        steps={['Send Email', 'Reset Password', 'Reset Password Success']}
        activeStep={1}
      ></CustomStepper>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1rem',
        }}
      >
        Reset Password
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          fontWeight: '300',
          marginBottom: '1rem',
        }}
      >
        Enter new password
      </p>
      <form
        action=''
        onSubmit={handleSubmit}
        className={`${classes.resetForm}`}
      >
        <input
          type='password'
          ref={passwordRef}
          placeholder={'Password'}
          className={`${classes.resetInput}`}
        />
        <input
          type='password'
          ref={passwordConfirmRef}
          placeholder={'Confirm password'}
          className={`${classes.resetInput}`}
        />
        <button type='submit' className={`${classes.resetButton}`}>
          Reset Password
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
