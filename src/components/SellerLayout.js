import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Swal from "sweetalert2";
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
    Tooltip,
    IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios'
import SellerServices from './services/SellerServices'


const api = axios.create({
})

const sellerServices = new SellerServices();



function SellerLayout() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);


    useEffect(() => {
        api.get("http://127.0.0.1:5000/api/v1/adminRoute/getAllSellers")
            .then(res => {
                console.log(res.data)
                setData(res.data)
                console.log(data)
            })
            .catch(error=>{
                console.log("Error")
            })
    }, [])


    const deleteSeller = (nic) => {
        sellerServices
            .deleteSeller(nic)
            .then(response => response.json())
            .then(json => {
                var code = json.StatusCode;
                if(code == 200){
                    console.log('Seller Deleted')
                    console.log(json)
                    showAlert()
                    loadTable()

                }else{

                }

            });
    }

    const showAlert = () => {
        Swal.fire({
            title: "Success",
            text: "Seller Remove Successful",
            icon: "success",
            confirmButtonText: "OK",
        });
    }

    const onSubmit=() => {
        navigate('/admin/addseller', { replace: true });
    }


    const loadTable = () =>{
        api.get("http://127.0.0.1:5000/api/v1/adminRoute/getAllSellers")
            .then(res => {
                console.log(res.data)
                setData(res.data)
                console.log(data)
            })
            .catch(error=>{
                console.log("Error")
            })
    }




    return(
        <Card>
            <CardHeader sx={{fontWeight: 'bold',fontSize: '30rem',color:'red',textAlign: "center"}}  title="Sellers"/>
            <Divider/>
            <PerfectScrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{mr:50,width:80}}>
                                    Delete
                                </TableCell>
                                <TableCell>
                                    Seller Nic
                                </TableCell>
                                <TableCell>
                                    Seller Name
                                </TableCell>
                                <TableCell>
                                    Email Address
                                </TableCell>
                                <TableCell>
                                    Contact No
                                </TableCell>
                                <TableCell>
                                    Area
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map((list, index) => (
                                <TableRow key={index}>

                                    <TableCell>
                                        <IconButton edge="start" onClick={() =>deleteSeller(list.nic)} >
                                            <DeleteIcon sx={{ml:2,color:'red'}}/>
                                        </IconButton>
                                    </TableCell>

                                    <TableCell>{list.nic}</TableCell>
                                    <TableCell>{list.name}</TableCell>
                                    <TableCell>{list.email}</TableCell>
                                    <TableCell>{list.no}</TableCell>
                                    <TableCell>{list.area}</TableCell>



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
                    onClick={() =>onSubmit()}
                >
                    Add Seller
                </Button>
            </Box>
        </Card>
    );

}
export default SellerLayout;
