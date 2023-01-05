import React from 'react';
import pageNotFoundImage from '../assets/images/pageNotFound.jpg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  notFound: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& h1': {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
    },
    '& p': {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
    },
    borderRadius: '10px',
    padding: '1rem',
    margin: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      transform: 'translateY(-5px)',
      transition: 'all 0.3s ease-in-out',
    },
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <main className={classes.notFound}>
      <h1>Oops..! 404 Page Not Found</h1>
      <p>Looks like you came to wrong page on our server</p>
      <img src={pageNotFoundImage} height='500' width='500' alt='not found' />
    </main>
  );
}

export default NotFound;
