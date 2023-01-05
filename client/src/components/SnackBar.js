import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackBar = ({ content }) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
        autoHideDuration={6000}
        message={content}
        action={
          <React.Fragment>
            <IconButton size='small' aria-label='close' color='inherit'>
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default SnackBar;
