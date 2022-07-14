import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios'


const api = axios.create({
})

function RecordLayout() {

    const [data, setData] = useState([]);


    useEffect(() => {
        api.get("http://127.0.0.1:5000/api/v1/adminRoute/getAllRecord")
            .then(res => {
                console.log(res.data)
                setData(res.data)

            })
            .catch(error=>{
                console.log("Error")
            })
    }, [])


    return(
        <Card>
            <CardHeader sx={{fontWeight: 'bold',fontSize: '30rem',color:'red',textAlign: "center"}}  title="Records"/>
            <Divider/>
            <PerfectScrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{mr:50}}>
                                    Record ID
                                </TableCell>
                                <TableCell>
                                    Seller NIC
                                </TableCell>
                                <TableCell>
                                    Dispensing Amount
                                </TableCell>
                                <TableCell>
                                    Distribute Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.t_no}</TableCell>
                                    <TableCell>{list.seller_nic}</TableCell>
                                    <TableCell>{list.dispensing_amount}</TableCell>
                                    <TableCell>{list.distribute_date}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >

            </Box>
        </Card>
    );

}
export default RecordLayout;
