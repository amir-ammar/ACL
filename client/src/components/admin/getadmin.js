import React,{useState} from 'react'
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const GetAdmin = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const[username,setusername]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[type,settype]=useState("");
  const addhandler =  (e) => {
     e.preventDefault();
    const res = axios.post("http://localhost:8080/api/v1/admin", { username:username,email:email,password:password,type:type }).then(res=>{
      console.log(res.data);
      handleClick();
     })
     .catch(err=>
      {console.log(err)}
     );
    console.log(res)
   
  }

  
  return (
  

    <>
    <div>
    
    <form className='container mb-3 border-2 bg-light shadow-lg tabelcolor'>
    <div className="mb-3 mt-3">
    <label for="username" className="form-label">username:</label>
    <input type="text" className="form-control" onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter username" />
  </div>
  <div className="mb-3 mt-3">
    <label for="email" className="form-label">Email:</label>
    <input type="email" className="form-control" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter email" name="email"/>
  </div>
  <div className="mb-3 mt-3">
    <label  className="form-label">password:</label>
    <input type="password" className="form-control" onChange={(e)=>{setpassword(e.target.value)}} placeholder="Enter password" />
  </div>
  <div className="mb-3">
    <label className="form-label mb-3">type:</label>
    
      <select calssName='container text-bg-light'  onChange={(e)=>settype(e.target.value)}>

         <option value="">""</option>
         <option value="Admin">Admin</option>
         <option value="Instructor">Instructor</option>
         <option value="Corporate trainee">Corporate trainee</option>


       </select>  </div>
  
  <button type="submit" className=" btn btn-outline-success float-end tabelcolor" onClick={addhandler}> Add</button>
</form> 
 <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        The user added successfully
        </Alert>
      </Snackbar>
     
    </Stack>
    </div>
    


  

  </>
  )
}

export default GetAdmin
