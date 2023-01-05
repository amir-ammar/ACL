import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  quote: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    '& h2': {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    '& p': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
    },

    '&:hover': {
      transform: 'translate(-50%, -50%) scale(1.1)',
      transition: 'all 0.3s ease-in-out',
    },

    '&:focus': {
      transform: 'translate(-50%, -50%) scale(1.1)',
      transition: 'all 0.3s ease-in-out',
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default function PageHeader() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <img
          className={classes.img}
          src='/Images/head.jpg'
          alt='nerd header'
        ></img>
        {/* make a quote here
         */}
        <div className={classes.quote}>
          <h2>Learning that gets you</h2>
          <p>Skills for your present (and your future). Get started with us.</p>
        </div>
      </div>
    </div>
  );
}
