import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAppContext } from '../../context/App/appContext';


function BioGraphy() {
  const {user} = useAppContext();

        return (
      <>
       <head>
      <title>Bootstrap Images</title>
      <script src = "/scripts/jquery.min.js"></script>
      <script src = "/bootstrap/js/bootstrap.min.js"></script>
     </head>
       <img src='../Images/groot.jpg'
        class="rounded-circle mx-auto d-block"
        width={161}
        height={106}
        />
        <br></br>
       <h2 class="text-center">{user.username}</h2>
       <hr class="text-center"></hr>
       <h3 class="text-center">BioGraphy</h3>
       <p class="text-center">{user.biography}</p>
      </>
      
    );
  }
  
  export default BioGraphy;