
import React from 'react'
import { Outlet } from 'react-router-dom';

import SideBar from '../components/admin/SideBar';
import '../components/admin/background.css'
import { NavBar } from '../components';
const componentName = () => {
 
  
  return (
    <>
    
    <SideBar></SideBar>
    <Outlet ></Outlet>
    

    </>
  )
}

export default componentName
