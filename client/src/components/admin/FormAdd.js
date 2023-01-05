import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GetAdmin from './getadmin';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
<script src="./main.js"></script>


export default function FormAdd() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="submit" className=" btn float-end back-to-top " onClick={handleClickOpen}><Fab color="primary" aria-label="add">
<PersonAddIcon></PersonAddIcon>
</Fab></button>
      <Dialog  open={open} onClose={handleClose} fullWidth={'true'}
        maxWidth={'md'}>
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Add user                                       
          </DialogContentText>
          <GetAdmin ></GetAdmin>
        </DialogContent>
      </Dialog>
    </div>
  );
}