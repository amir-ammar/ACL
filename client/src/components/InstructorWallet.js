

import React, { useEffect,useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useWallet from './CustomHooks/getWallet';
import axios from 'axios';
import { backendApi } from '../projectConfig';
import { useAppContext } from '../context/App/appContext';

function createData(
    month,
    earning
) {
    return { month, earning };
}


function BasicTable() {
    const { token, user } = useAppContext();
    const [rows,setRows] = useState([]);
    useEffect(() => {
        let url = `${backendApi}user/earning`;
        axios.get(url,
            {
                headers:
                    { authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log("earning",res);
                setRows(res.data);
            })
            .catch(
                (err) => console.warn(err)
            );
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> Month </TableCell>
                        <TableCell align="right">Earning</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.monthDate}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.monthDate}
                            </TableCell>
                            <TableCell align="right">{row.earning} $</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function InstructorWallet() {
    const wallet = useWallet();
    return (
        <div>
            <h1 className='text-center'>Total Earning: {wallet} $</h1>
            <BasicTable></BasicTable>
        </div>
    )
}
