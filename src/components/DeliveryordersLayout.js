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
    TableSortLabel, TextField,
    Tooltip
} from '@material-ui/core';
import Select from 'react-select';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios'
import Swal from "sweetalert2";
import SellerServices from './services/SellerServices'

const api = axios.create({
})

function DeliveryordersLayout() {

    const [data, setData] = useState([]);

    const [Oid, SetOid] = useState([]);

    const [Status, SetStatus] = useState([]);

    const sellerServices = new SellerServices();

    const setOrderID = (oid,status) => {
        SetOid(oid)
        SetStatus(status)
    }

    const updateStatus = (Oid,Status) => {
        sellerServices
            .updateStatus(Oid,Status)
            .then(response => response.json())
            .then(json => {
                Swal.fire({
                    title: "Success",
                    text: "Status Updated Successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) =>{
                    loadTable()
                    if (Status=="Completed"){
                        let qty = sessionStorage.getItem('gasqty')
                        let nic = sessionStorage.getItem('id')
                        let newqty =qty-1
                        sessionStorage.setItem('gasqty', newqty)
                        sellerServices.updatenewStatus(nic,newqty)
                    }
                })

            });
    }

    const loadTable = () => {
        api.post("https://happygas.herokuapp.com/api/v1/adminRoute/getAllDeliveryOrders",{
                city:sessionStorage.getItem('area')
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    city: sessionStorage.getItem('area'),
                }
            }
        )
            .then(res => {
                console.log(res.data)
                setData(res.data)

            })
            .catch(error=>{
                console.log("Error")
            })
    }

    useEffect(() => {
        api.post("https://happygas.herokuapp.com/api/v1/adminRoute/getAllDeliveryOrders",{
                city:sessionStorage.getItem('area')
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    city: sessionStorage.getItem('area'),
                }
            }
        )
            .then(res => {
                console.log(res.data)
                setData(res.data)

            })
            .catch(error=>{
                console.log("Error")
            })
    }, [])

    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Delivering', label: 'Delivering' }
    ]
    const handleChange = e => {
        SetStatus(e.value)
        console.log(e.value);
    }
    return(
        <Card>
            <CardHeader sx={{fontWeight: 'bold',fontSize: '30rem',color:'red',textAlign: "center"}}  title="Delivery Orders"/>
            <Divider/>
            <PerfectScrollbar>
                <Box sx={{ flexDirection: 'row'}}>
                    <TextField
                        label="Order Id"
                        margin="normal"
                        name="nic"
                        variant="outlined"
                        value={Oid}
                    />
                    <Button
                        sx={{
                            ml:5,
                            width:'50px',
                            mt:3
                        }}
                        onClick={() => { updateStatus(Oid,Status) }}
                        color="primary"
                        size="small"
                        type="submit"
                        variant="contained"
                    >
                        Update
                    </Button>
                </Box>
                <Box  sx={{width:500}}>
                    <Select

                        options={options}
                        value={{label : Status}}
                        width='100px'
                        menuColor='red'
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{mr:50}}>
                                    Order ID
                                </TableCell>
                                <TableCell>
                                    Contact Name
                                </TableCell>
                                <TableCell>
                                    Contact No
                                </TableCell>
                                <TableCell>
                                    City
                                </TableCell>
                                <TableCell>
                                    Address
                                </TableCell>
                                <TableCell>
                                    Item
                                </TableCell>
                                <TableCell>
                                    Payment Type
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Order Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell onClick={() =>setOrderID(list.order_id,list.order_status)}>{list.order_id}</TableCell>
                                    <TableCell>{list.user_name}</TableCell>
                                    <TableCell>{list.contact_no}</TableCell>
                                    <TableCell>{list.order_city}</TableCell>
                                    <TableCell>{list.order_delivery_address}</TableCell>
                                    <TableCell>{list.order_detail}</TableCell>
                                    <TableCell>{list.order_payment_type}</TableCell>
                                    <TableCell
                                    sx={{
                                        color:'red'
                                    }}
                                    >{list.order_status}</TableCell>
                                    <TableCell>{list.order_date}</TableCell>
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
export default DeliveryordersLayout;
