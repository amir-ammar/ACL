import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppContext } from '../context/App/appContext';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
export default function Reportform({ courseid }) {
  const [open, setOpen] = React.useState(false);
  const [type, settype] = useState('');
  const [decsription, setdes] = useState('');
  const { user, token } = useAppContext();
  const [opensnake, setopensnake] = useState(false);
  const [message, setmessage] = useState('');
  const [typemessage, settypemessage] = useState('');
  const [oenncircule, setcir] = useState(false);
  console.log(courseid);

  const handleClickOpen = () => {
    settype('');
    setdes('');
    setOpen(true);

    setopensnake(false);
  };
  const handlersubmit = async (e) => {
    setcir(true);

    e.preventDefault();
    await axios
      .post(
        ` http://localhost:8080/api/v1/user/reportproblem/`,
        { title: decsription, type: type, course: courseid },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setopensnake(true);
        setmessage('report add sussefully');
        settypemessage('success');

        console.log(res.data);
      })
      .catch((err) => {
        setopensnake(true);
        setmessage('report failed');
        settypemessage('error');

        console.log(err);
      });
    setcir(false);
  };

  const handleClose = () => {
    setOpen(false);
    setopensnake(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Report
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogContent>
          <DialogContentText>Report</DialogContentText>
          <div class='mb-3'>
            <label for='exampleFormControlInput1' className='form-label'>
              Type of report
            </label>
            <select
              className='form-select form-select-sm'
              aria-label='.form-select-sm example'
              onChange={(e) => {
                settype(e.target.value);
              }}
            >
              <option defaultValue>Type of report {type}</option>
              <option value='technical'>technical</option>
              <option value='financial'>financial</option>
              <option value='other'>other</option>
            </select>
          </div>
          <div className='mb-3'>
            <label for='exampleFormControlTextarea1' className='form-label'>
              Description
            </label>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              onChange={(e) => {
                setdes(e.target.value);
              }}
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlersubmit}>Sumbit</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={opensnake}
          onClose={() => setopensnake(false)}
          message={message}
          key={'top' + 'center'}
        >
          <Alert
            onClose={() => setopensnake(false)}
            severity={typemessage}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
