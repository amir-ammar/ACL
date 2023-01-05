import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MenuItem,
} from '@material-ui/core';
import { CountrySelector, Loading } from '../components';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../context/App/appContext';
import AlertDialog from '../components/AlertDialog';
import TermsAndConditions from '../components/TermsAndConditions';
import contract from '../assets/contract.pdf';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const { setup } = useAppContext();

  const password = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const [country, setCountry] = useState('Country');
  const [showCompanyPolicy, setShowCompanyPolicy] = useState(true);
  const [disable, setDisable] = useState(true);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const { user, token } = useAppContext();
  const navigate = useNavigate();

  if (user && token) {
    navigate('/');
  }

  const downloadContract = () => {
    const element = document.createElement('a');
    element.setAttribute('href', contract);
    element.setAttribute('download', 'contract.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
      type: 'Individual trainee',
      country: country.value,
      endPoint: 'register',
    };

    if (
      !user.username ||
      !user.password ||
      !user.email ||
      !user.type ||
      !user.country
    ) {
      console.log('error');
      setAlert('Please fill in all the fields');
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
        setTimeout(() => {
          setAlert(null);
          setAlertType(null);
          navigate('/');
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

  const handleCompanyPolicy = (value) => {
    setShowCompanyPolicy(value);
    setDisable(value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        {loading && <Loading></Loading>}

        {alert && (
          <Alert variant='filled' severity={alertType}>
            {alert}
          </Alert>
        )}

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='First name'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={username}
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Last name'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={username}
                variant='outlined'
                required
                fullWidth
                id='username'
                label='User name'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={email}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={password}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>

            <Grid item xs={12}>
              <label>Country</label>
              <CountrySelector setCountry={setCountry} />
            </Grid>

            {showCompanyPolicy && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='allowExtraEmails'
                      color='primary'
                      onChange={(e) => {
                        setDisable(!e.target.checked);
                      }}
                    />
                  }
                />
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'gray',
                    display: 'inline-block',
                  }}
                >
                  I agree to the
                  <span
                    onClick={() => setTermsAndConditions(true)}
                    style={{ color: 'blue', cursor: 'pointer' }}
                  >
                    Terms and Conditions{'  '}
                  </span>
                  of the company
                </p>
              </Grid>
            )}
          </Grid>
          <AlertDialog
            open={termsAndConditions}
            title='Terms and Conditions'
            content={<TermsAndConditions />}
            handleAgree={() => {
              downloadContract();
              setTermsAndConditions(false);
            }}
            handleDisagree={() => setTermsAndConditions(false)}
          ></AlertDialog>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleRegister}
            disabled={disable}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-start'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
