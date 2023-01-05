import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CourseRequest() {
  const[opensnake,setopensnake]=useState(false);
  const[message,setmessage]=useState("");
  const[typemessage,settypemessage]=useState("");
  const[progress,setprogress]=useState(true);
  
  const[course,setcourse]=useState([])
  
  useEffect(()=>{
     
     axios.get("http://localhost:8080/api/v1/admin/coursereqeut").then(res=>{
     console.log(res.data);
     setprogress(false);
     setcourse(res.data);
    })
    .catch(err=>
     {console.log(err)}
    );
    
   
  },[]);
  const resovle =(id,courseid,state)=>{
    setprogress(true);
    // id.preventDefault();
     axios.patch(`http://localhost:8080/api/v1/admin/grantcourse`,{id:id,courseid:courseid,state:state}).then(res=>{
       console.log(res.data._id);
       const c=res.data
       setmessage("Course reques is "+state)
       settypemessage("success")
       setopensnake(true);
       setprogress(false)
       setcourse((old)=> old.map((report)=>{
        if (report._id==res.data._id){
          return res.data
        }
        else{
          return report
        }
      
       }));
      })
      .catch(err=>
       {console.log(err)
        setopensnake(true);
        setprogress(false)

        setmessage("there are an error")
        settypemessage("error")

      }
      );
    }
   return (
    
     <>
       <div className="container mt-3">
   <h2>CoursesRequests</h2>
   <table className="table table-striped table-hover bg-light border border-success ">
     <thead>
       <tr>
         <th>Name of Student</th>
         <th>Course</th>
         <th>State</th>
         <th>     </th>
         <th>     </th>

 
       </tr>
     </thead>
     <tbody>
       {course.map(course=>
         <tr>
           <td>{course.createdBy.username}</td>
           <td>{course.course.title}</td>
           <td>{course.state}</td>
           <td> {course.state=="PENDING" && <button type="button" className="btn btn-primary" onClick={()=>{resovle(course.createdBy._id,course.course._id,"GRANTED")}}>Grant</button>}</td> 
           <td> {course.state=="PENDING"&&<button type="button" className="btn btn-primary" onClick={()=>{resovle(course.createdBy._id,course.course._id,"DENIED")}}>Deny</button>}</td> 

 
         </tr>)
       }
       
     </tbody>
   </table>
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

export default CourseRequest