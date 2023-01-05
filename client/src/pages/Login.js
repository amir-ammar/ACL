import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import { Loading } from '../components';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../context/App/appContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Nerd academy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const { setup, user, token } = useAppContext();

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState(null);

  if (user && token) {
    return <Navigate to='/' />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      email: email.current.value,
      password: password.current.value,
      endPoint: 'login',
    };
    if (!user.email || !user.password) {
      setAlert('Please fill in all fields');
      setAlertType('error');
      setTimeout(() => {
        setAlert(null);
        setAlertType(null);
      }, 3000);
    } else {
      const result = await setup(user);
      if (result.type) {
        setAlert(result.msg);
        setAlertType('success');
        let redirect = '/';
        if (result.admin) {
          redirect = '/admin';
        }
        console.log('login result', result);
        setTimeout(() => {
          setAlert(null);
          setAlertType(null);
          navigate(redirect);
        }, 3000);
      } else {
        setAlert(result.msg);
        setAlertType('error');
        setTimeout(() => {
          setAlert(null);
          setAlertType(null);
        }, 3000);
      }
    }
    setLoading(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {loading && <Loading type='spinningBubbles' color='red' />}
        {alert && (
          <Alert variant='filled' severity={alertType}>
            {alert}
          </Alert>
        )}
        <form className={classes.form} noValidate>
          <TextField
            inputRef={email}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            inputRef={password}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                variant='body2'
                onClick={() => {
                  navigate('/forgetPassword');
                }}
                style={{ cursor: 'pointer' }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
