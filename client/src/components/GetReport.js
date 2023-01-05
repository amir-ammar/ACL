import { Button } from '@mui/material'
import React from 'react'
import axios from 'axios';
import { useAppContext } from '../context/App/appContext';
import { useState } from 'react';

function GetReport() {
    const {user,token} = useAppContext();
    const[report,setreport]=useState([]);
    const handlersubmit = async (e) => {

        e.preventDefault();
        await axios.get(
          `  http://localhost:8080/api/v1/user/getrport/?id=635f73a23569cc0d7e43d80e`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(res => {
            setreport(res.data)
            console.log(res.data);
           
          }).catch((err) => {
            console.log(err);
          })
      };
  return (
    <><Button onClick={handlersubmit}> get all report</Button>
    <table className="table  table-hover bg-light border border-success tabelcolor ">
  <thead>
  
    <tr>

      <th>Description</th>
      <th>State</th>
      <th>Type</th>
     

    </tr>
  </thead>
  <tbody>
    {report.map(x=>
      <tr key={x._id}>
        <td>{x.title}</td>
        <td>{x.status}</td>
        <td>{x.type}</td>


      </tr>)
    }
    
  </tbody>
</table>
    
    </>
    
    
  )
}

export default GetReport