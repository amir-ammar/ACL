import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';

import'./background.css'
import Reportform from '../Reportform';
import { Button } from '@mui/material';
import GetReport from '../GetReport';



export default function DataGridDemo() {
  
  
  return (
    
<>
  <Reportform></Reportform>
  <GetReport></GetReport>
</>   
  );
}