import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import * as Yup from 'yup';
import {Formik} from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Box, Button, Container, TextField, Typography,Card,
    CardHeader,
    Divider,
} from '@material-ui/core';
import React, {useEffect} from "react";
import axios from 'axios'
import SellerServices from './services/SellerServices'




import Swal from "sweetalert2";




const DistributeLayout = () => {

    const api = axios.create({
    })
    const sellerServices = new SellerServices();


    useEffect(() => {
        api.get("http://127.0.0.1:5000/api/v1/adminRoute/getAllQty")
            .then(res => {
                setData({
                    ...data,
                    adminqty: res.data.qty
                });
            })
            .catch(error=>{
                console.log("Error")
            })
    }, [])

    const loadQty = () => {
        api.get("http://127.0.0.1:5000/api/v1/adminRoute/getAllQty")
            .then(res => {
                setData({
                    ...data,
                    adminqty: res.data.qty
                });
            })
            .catch(error=>{
                console.log("Error")
            })
    }
    const [data, setData] = React.useState({
        nic: '',
        name: '',
        area: '',
        qty: 0,
        adminqty:'',
        newQty:0,
    });

    const getNic = (event)=>{
        const userValue=  event.target.value;
        console.log(userValue)
        setData({
            ...data,
            nic: userValue
        });
    };

    const getNewQty = (event)=>{
        const userValue=  event.target.value;
        console.log(userValue)
        setData({
            ...data,
            newQty: userValue
        });
    };

    const getQty = (nic) => {
        sellerServices
            .getQty(nic)
            .then(response => response.json())
            .then(json => {
                var code = json.StatusCode;
                if(code == 200){
                    console.log((json.data.area))
                    setData({
                        ...data,
                        name: json.data.user_name,
                        area:json.data.area,
                        qty:json.data.qty,
                    });

                }else{
                    Swal.fire({
                        title: "Error",
                        text: "Seller nic is incorrect",
                        icon: "error",
                        confirmButtonText: "OK",
                    })
                }

            });
    }

    const updateQty = (nic,newQty,qty) => {
        sellerServices
            .updateQty(nic,newQty,qty,data.adminqty)
            .then(response => response.json())
            .then(json => {
                Swal.fire({
                    title: "Success",
                    text: "Qty Updated Successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) =>{
                    loadQty()
                    sellerServices.addSellerRecord(nic,newQty)
                })

            });
    }


        return (
            <>
                <Card>
                    <CardHeader sx={{fontWeight: 'bold',fontSize: '50rem',color:'red',textAlign: "center"}}  title="Distribute Gas"/>
                    <Divider/>

                    <CardHeader sx={{fontWeight: 'bold',fontSize: '50rem',color:'red',textAlign: "right"}}  title={"Gas quantity : "+data.adminqty}/>
                    <Divider/>
                    <PerfectScrollbar>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'center'
                            }}
                        >
                            <Container maxWidth="sm">
                                <Formik
                                    initialValues={{
                                        fullName: '',
                                        nic1: '',
                                        area: '',
                                        qry: '',
                                    }}
                                    validationSchema={Yup.object().shape({
                                        nic: Yup.string().max(255).required('Nic is required'),
                                        fullName: Yup.string().max(255).required('Full Name is required'),
                                        area: Yup.string().max(255).required('Area is required'),
                                        qty: Yup.string().max(255).required('Qty is required'),
                                    })}
                                    onSubmit={async (values, {resetForm}) => {

                                    }}
                                >
                                    {({
                                          errors,
                                          handleBlur,
                                          handleChange,
                                          handleSubmit,
                                          isSubmitting,
                                          touched,
                                          values
                                      }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Box sx={{mb: 1}}>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h2"
                                                >
                                                    Distribute Gas For Seller
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width:'800px',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                            <TextField
                                                sx={{
                                                    width:'550px'
                                                }}

                                                fullWidth

                                                label="Seller Nic"
                                                margin="normal"
                                                name="nic"
                                                onBlur={handleBlur}
                                                onChange={getNic}
                                                variant="outlined"
                                            />
                                                <Button
                                                    sx={{
                                                        ml:5,
                                                        width:'50px',
                                                        mt:3
                                                    }}
                                                    onClick={() => { getQty(data.nic) }}
                                                    color="primary"
                                                    disabled={isSubmitting}
                                                    size="small"
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Search
                                                </Button>
                                            </Box>
                                            <TextField
                                                // error={Boolean(touched.fullName && errors.fullName)}
                                                fullWidth
                                                // helperText={touched.fullName && errors.fullName}
                                                label="Full Name"
                                                margin="normal"
                                                name="fullName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                value={data.name}
                                            />

                                            <TextField
                                                // error={Boolean(touched.area && errors.area)}
                                                fullWidth
                                                // helperText={touched.area && errors.area}
                                                label="Area"
                                                margin="normal"
                                                name="area"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                value={data.area}
                                            />
                                            <TextField

                                                fullWidth

                                                label="Qty"
                                                margin="normal"
                                                name="qty"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                value={data.qty}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Dispensing Amount"
                                                margin="normal"
                                                name="qty"
                                                onBlur={handleBlur}
                                                onChange={getNewQty}
                                                variant="outlined"
                                            />
                                            <Box sx={{py: 2}}>
                                                <Button
                                                    color="primary"
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    onClick={() => { updateQty(data.nic,data.newQty,data.qty) }}
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                            </Container>
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </>
        );
    }
;

export default DistributeLayout;
