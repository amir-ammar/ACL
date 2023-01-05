import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import { SideBarcontent } from './Instructorprofilecontent';
import './Instructorprofile.css';
import { IconContext } from 'react-icons';

function Instructorprofile() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar position-absolute bg-transparent' style={{ zIndex: 2, top: "10px" }}>
          <Link to='#' className=' menu-bars'>
            <FaIcons.FaBars className='text-dark' onClick={showSidebar} />
          </Link>
        </div>
        <div className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: "2" }}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideBarcontent.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
      <div>      <Outlet></Outlet>
      </div>
    </>
  );
}

export default Instructorprofile;
