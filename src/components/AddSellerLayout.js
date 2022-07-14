import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import * as Yup from 'yup';
import {Formik} from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Box, Button, Container, TextField, Typography,Card,
    CardHeader,
    Divider,} from '@material-ui/core';
import React from "react";
import SellerServices from "./services/SellerServices";
import Swal from "sweetalert2";


const AddSellerLayout = () => {
        const navigate = useNavigate();

        return (
            <>
                <Card>
                    <CardHeader sx={{fontWeight: 'bold',fontSize: '30rem',color:'red',textAlign: "center"}}  title="Add Sellers"/>
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
                                email: '',
                                fullName: '',
                                nic: '',
                                area: '',
                                contactNo: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                nic: Yup.string().max(255).required('Nic is required'),
                                fullName: Yup.string().max(255).required('Full Name is required'),
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                area: Yup.string().max(255).required('Area is required'),
                                contactNo: Yup.string().max(255).required('Contact No is required'),
                                password: Yup.string().max(255).required('password is required')
                            })}
                            onSubmit={async (values, {resetForm}) => {
                                let sellerServices = new SellerServices();
                                    sellerServices
                                    .addSeller(values.nic,values.fullName,values.email,values.area,values.contactNo,values.password)
                                    .then(response => response.json())
                                    .then(json => {
                                        console.log('register response ', json);
                                        console.log('==========================');
                                        Swal.fire({
                                            title: "Success",
                                            text: "Seller Added Successful",
                                            icon: "success",
                                            confirmButtonText: "OK",
                                        }).then((result) =>{
                                            navigate('/admin/seller', { replace: true });
                                        })

                                    })
                                    .catch(error => {
                                        console.log('error ' + error);
                                        return error;
                                    });
                                console.log('button done');
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
                                            Create new account
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.nic && errors.nic)}
                                        fullWidth
                                        helperText={touched.nic && errors.nic}
                                        label="NIC"
                                        margin="normal"
                                        name="nic"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.fullName && errors.fullName)}
                                        fullWidth
                                        helperText={touched.fullName && errors.fullName}
                                        label="Full Name"
                                        margin="normal"
                                        name="fullName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Email Address"
                                        margin="normal"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="email"
                                        value={values.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.area && errors.area)}
                                        fullWidth
                                        helperText={touched.area && errors.area}
                                        label="Area"
                                        margin="normal"
                                        name="area"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.contactNo && errors.contactNo)}
                                        fullWidth
                                        helperText={touched.contactNo && errors.contactNo}
                                        label="Contact no"
                                        margin="normal"
                                        name="contactNo"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label="Password"
                                        margin="normal"
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.password}
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
                                        >
                                            Sign in now
                                        </Button>
                                    </Box>
                                    {/*<Typography*/}
                                    {/*    color="textSecondary"*/}
                                    {/*    variant="body1"*/}
                                    {/*>*/}
                                    {/*    Don&apos;t have an account?*/}
                                    {/*    {' '}*/}
                                    {/*    <Link component={RouterLink} to="/register" variant="h6" underline="hover">*/}
                                    {/*        Sign up*/}
                                    {/*    </Link>*/}
                                    {/*</Typography>*/}
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

export default AddSellerLayout;
