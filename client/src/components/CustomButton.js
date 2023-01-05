import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { FaFilter } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '7rem',
    height: '4rem',
    border: '1px solid #000000',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
  },
  filterIcon: {
    fontSize: '1.1rem',
    marginRight: '0.5rem',
  },
}));

const CustomButton = ({ text, onClick, icon }) => {
  const classes = useStyles();
  return (
    <Button
      variant='outlined'
      onClick={() => onClick()}
      size='large'
      className={`${classes.button}`}
    >
      <span className={`${classes.filterIcon}`}>{icon}</span>
      <span>{text}</span>
    </Button>
  );
};

export default CustomButton;
