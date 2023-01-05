import React from 'react';
import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
}));

const Loading = ({ type, color }) => {
  const classes = useStyles();

  return (
    <ReactLoading type={type} color={color} className={classes.container} />
  );
};

export default Loading;
