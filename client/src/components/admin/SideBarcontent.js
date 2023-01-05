import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as IconName  from "react-icons/fc";

export const SideBarcontent = [
   

  
 
  {
    title: 'Users',
    path: '/admin/users',
    icon: <IconName.FcBusinessman />,
    cName: 'nav-text'
  },
  {
    title: 'Courses',
    path: '/admin/course',
    icon: <IconName.FcStatistics />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/admin/Report',
    icon: <IconName.FcSupport />,
    cName: 'nav-text'
  },
  {
    title: 'Course Access Reqest',
    path: '/admin/courserequest',
    icon: <IconName.FcAbout/>,
    cName: 'nav-text'
  },
 
  {
    title: 'Refund Request',
    path: '/admin/Refund',
    icon: <IconName.FcAbout/>,
    cName: 'nav-text'
  },
  
];
