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

function CustomerLayout() {

    const [data, setData] = useState([]);


    useEffect(() => {
        api.get("http://127.0.0.1:5000/api/v1/adminRoute/getAllUsers")
            .then(res => {
                console.log(res.data)

                setData(res.data)
                console.log(data)
            })
            .catch(error=>{
                console.log("Error")
            })
    }, [])

    const orders = [
        {
            id: uuid(),
            ref: 'CDD1049',
            amount: 30.5,
            customer: {
                name: 'Ekaterina Tankova'
            },
            createdAt: 1555016400000,
            status: 'pending'
        },
        {
            id: uuid(),
            ref: 'CDD1048',
            amount: 25.1,
            customer: {
                name: 'Cao Yu'
            },
            createdAt: 1555016400000,
            status: 'delivered'
        },
        {
            id: uuid(),
            ref: 'CDD1047',
            amount: 10.99,
            customer: {
                name: 'Alexa Richardson'
            },
            createdAt: 1554930000000,
            status: 'refunded'
        },
        {
            id: uuid(),
            ref: 'CDD1046',
            amount: 96.43,
            customer: {
                name: 'Anje Keizer'
            },
            createdAt: 1554757200000,
            status: 'pending'
        },
        {
            id: uuid(),
            ref: 'CDD1045',
            amount: 32.54,
            customer: {
                name: 'Clarke Gillebert'
            },
            createdAt: 1554670800000,
            status: 'delivered'
        },
        {
            id: uuid(),
            ref: 'CDD1044',
            amount: 16.76,
            customer: {
                name: 'Adam Denisov'
            },
            createdAt: 1554670800000,
            status: 'delivered'
        }
    ];

    return(
        <Card>
            <CardHeader sx={{fontWeight: 'bold',fontSize: '30rem',color:'red',textAlign: "center"}}  title="Customers"/>
            <Divider/>
            <PerfectScrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{mr:50}}>
                                    Customer Nic
                                </TableCell>
                                <TableCell>
                                    Customer Name
                                </TableCell>
                                <TableCell>
                                    Email Address
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.id}</TableCell>
                                    <TableCell>{list.name}</TableCell>
                                    <TableCell>{list.email}</TableCell>
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
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon/>}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box>
        </Card>
    );

}
export default CustomerLayout;
