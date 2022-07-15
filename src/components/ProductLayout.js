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

function ProductLayout() {

    const [data, setData] = useState([]);


    useEffect(() => {
        api.get("https://happygas.herokuapp.com/api/v1/adminRoute/getAllproduct")
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
            <CardHeader sx={{fontWeight: 'bold',fontSize: '30rem',color:'red',textAlign: "center"}}  title="Product"/>
            <Divider/>
            <PerfectScrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{mr:50}}>
                                    Product Code
                                </TableCell>
                                <TableCell>
                                    Product Name
                                </TableCell>
                                <TableCell>
                                    Size
                                </TableCell>
                                <TableCell>
                                    Price
                                </TableCell>
                                <TableCell>
                                    Quantity
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.code}</TableCell>
                                    <TableCell>{list.product_name}</TableCell>
                                    <TableCell>{list.product_size}</TableCell>
                                    <TableCell>{list.product_price}</TableCell>
                                    <TableCell>{list.product_qty}</TableCell>
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
export default ProductLayout;
