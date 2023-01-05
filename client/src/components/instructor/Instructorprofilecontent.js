import React from 'react';
import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
//import * as IoIcons from 'react-icons/io';
import * as IconName from 'react-icons/fc';

export const SideBarcontent = [
  {
    title: 'My Courses',
    path: '/profile/myCourses',
    icon: <FaIcons.FaBookOpen />,
    cName: 'nav-text',
  },

  {
    title: 'Wallet',
    path: '/profile/Wallet',
    icon: <FaIcons.FaRegMoneyBillAlt />,
    cName: 'nav-text',
  },

  {
    title: 'Settings',
    path: '/profile/gg',
    icon: <FaIcons.FaRegSun />,
    cName: 'nav-text',
  },
];
