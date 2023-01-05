import * as React from 'react';
import {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import FormAdd from './FormAdd';
import './background.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



export default function GetIntstructor() {

  const[user,setuser]=useState([]);
  const [open, setOpen] = React.useState(true);
  useEffect(()=>{
    
    axios.get("http://localhost:8080/api/v1/admin").then(res=>{
    console.log(res.data);
    setuser(res.data);
    setOpen(false)

   })
   .catch(err=>
    {console.log(err)}
   );

  
 },[]);
 for(let i=0;i<user.length;i++){
  console.log(user[i].username);
 }


  return (
    <>
    <div className="adminbackground">
    <div className="container  ">
    <h1 classNmae="adminbackground">Users</h1>
    <div className="input-group mb-3 me-3">
    <div className="container float-end">    <FormAdd></FormAdd>
</div>

</div>

<table className="table  table-hover bg-light border border-success tabelcolor ">
  <thead>
  
    <tr>

      <th>UserName</th>
      <th>Email</th>
      <th>Type</th>
     

    </tr>
  </thead>
  <tbody>
    {user.map(x=>
      <tr key={x._id}>
        <td>{x.username}</td>
        <td>{x.email}</td>
        <td>{x.type}</td>


      </tr>)
    }
    
  </tbody>
</table>
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress  disableShrink  color="primary" />
      </Backdrop>
</div>
</div>

  </>
)
}
