import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';


function Reports() {

  const [open, setOpen] = React.useState(false);
  const [comment,setcomment]=useState("");
  const [reportid,setid]=useState("");
  const[opensnake,setopensnake]=useState(false);
  const[message,setmessage]=useState("");
  const[typemessage,settypemessage]=useState("");
  const[progress,setprogress]=useState(true);
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const handleClickOpen = (reportid) => {
setid(reportid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const[reports,setreports]=useState([]);
  useEffect(()=>{
    const state="unseen"
    axios.get(`http://localhost:8080/api/v1/admin/report/?status=${state}`).then(res=>{
    console.log(res.data);
    setreports(res.data);
    setprogress(false);
   })
   .catch(err=>
    {console.log(err)}
   );
 },[]);
 

 const getreport =(state)=>{
  setprogress(true);

  axios.get(`http://localhost:8080/api/v1/admin/report/?status=${state}`).then(res=>{
    console.log(res.data);
    setreports(res.data);
    setprogress(false);

   })
   .catch(err=>
    {console.log(err)}
   );
 }
 const resovle =(id)=>{
  setprogress(true);

 // id.preventDefault();
  axios.patch(`http://localhost:8080/api/v1/admin/reportstate`,{id:id,state:"resolved"}).then(res=>{
    console.log(res.data);
    setreports((old)=> old.filter((report)=>report._id!==id));
    setprogress(false);
    setopensnake(true);
    setmessage("Problem have been resolved")
    settypemessage("success")


   })
   .catch(err=>
    {console.log(err)
      setopensnake(true);
      setmessage(err)
      settypemessage("error")}
   );
 }
 const pending =(id)=>{
  setprogress(true);

 // id.preventDefault();
  axios.patch(`http://localhost:8080/api/v1/admin/reportstate`,{id:id,state:"pending"}).then(res=>{
    console.log(res.data);
    setreports((old)=> old.filter((report)=>report._id!==id));
    setprogress(false);
    setopensnake(true);
    setmessage("Problem have been Pending")
    settypemessage("success")

   })
   .catch(err=>
    {console.log(err)
      setopensnake(true);
      setmessage(err)
      settypemessage("error")}
   );
 }
 const addcomment =()=>{
  setprogress(true);

  // id.preventDefault();
   axios.patch(`http://localhost:8080/api/v1/admin/setcomment`,{reportId:reportid,comment:comment}).then(res=>{
     console.log(res.data);
     setopensnake(true);
     setmessage("comment add sussefully")
     settypemessage("success")
     setprogress(false);
     setOpen(false);



     setreports((old)=> old.map((report)=>{
      if (report._id==reportid){
        return res.data
      }
      else{
        return report
      }
    
     }));
     console.log(reports);
    })
    .catch(err=>
     {console.log(err)
      setopensnake(true);
      setmessage(err)
      settypemessage("error")
    
    }
    );
  }


  return (
    <>
      <div class="container mt-3">
      <div class="btn-group">
  <button type="button" class="btn btn-primary" onClick={()=>{getreport('unseen');}}>Unseen</button>
  <button type="button" class="btn btn-primary" onClick={()=>{getreport('pending');}}>Pending</button>
  <button type="button" class="btn btn-primary" onClick={()=>{getreport("resolved");}}>Resolved</button>
</div> 
  <h2>Reports</h2>
  <table class="table  table-hover bg-light border border-success ">
    <thead>
      <tr>
        <th>UserName</th>
        <th>Course</th>
        <th>Descrption</th>
        <th>Type</th>
        <th>Status</th>
        <th>follew up</th>
        <th>      </th>
        <th>      </th>



      </tr>
    </thead>
    <tbody>
      {reports.map(report=>
        <tr>
        <td>{report.createdBy.username }</td>
        <td>{report.course.title}</td>
          <td>{report.title}</td>
          <td>{report.type}</td>
          <td>{report.status}</td>
        <td>{
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
       //   aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Messages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <ul> {report.commentsadmin.map(comment=>
            <li>{comment}</li>
          )} </ul>   
         
          </Typography>
        </AccordionDetails>
      </Accordion>
        }
        </td>
      
        <td> {report.status!=="resloved" && <button type="button" class="btn btn-primary"onClick={()=>{resovle(report._id)}}>resolve</button>}</td> 
        <td> {report.status=="unseen" && <button type="button" class="btn btn-primary"onClick={()=>{pending(report._id)}}>pending</button>}</td> 
        <td> {report.status!=="unseen" && <button type="button" class="btn btn-primary"onClick={()=>{handleClickOpen(report._id)}}>add message</button>}</td> 


        </tr>)
      }
      
    </tbody>
  </table>
  <div>
 
      <Dialog open={open} onClose={handleClose}  fullWidth={'true'} maxWidth={'sm'}>

        <DialogContent>
          <DialogContentText>
          Comment  
          </DialogContentText>
          <div class="mb-3">
  

</div>
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Comment</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setcomment(e.target.value)}}></textarea>
</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addcomment}>add Message</Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>
  <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={opensnake}
        onClose={opensnake}
        message={message}
        key={"top" + "center"}
      >
       <Alert onClose={()=> setopensnake(false)} severity={typemessage} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


    </>
  )
}

export default Reports