import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useRef } from "react";
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  alert,
  alertContent,
  Alert,
  IconButton,
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '../icons/Google';
import LoginServices from './services/LoginServices';



const Login = () => {
  const navigate = useNavigate();



  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const loginServices = new LoginServices();


  const getEmailValue = (event)=>{
    const userValue=  event.target.value;
    setData({
      ...data,
      email: userValue
  });
};
const getPasswordValue = (event)=>{
  const userValue=  event.target.value;
  console.log(userValue)
  setData({
    ...data,
    password: userValue
});
};

const shoot = () => {
  alert(data.email+" "+data.password);
}
const [open, setOpen] = React.useState(true);
const [alert, setAlert] = React.useState(false);
const [alertContent, setAlertContent] = React.useState('');

const loginHandle = () => {

  loginServices
    .signIn(data.email, data.password)
    .then(response => response.json())
    .then(json => {
      var code = json.StatusCode;
      if(code == 200){
          console.log('ok')
          console.log('id :',json.user_nic)
          console.log('token :',json.Token)
          console.log('Type :',json.user_type)
          console.log('Name :',json.user_name)
          console.log('Name :',json.area)
          sessionStorage.setItem('token', json.Token)
          sessionStorage.setItem('fullName', json.user_name)
          sessionStorage.setItem('userType', json.user_type)
          sessionStorage.setItem('id', json.user_nic)
          sessionStorage.setItem('authStatus', 'true')
          sessionStorage.setItem('area', json.area)

          if (json.user_type === 'ADMIN') {
              navigate('/admin/dashboard', {replace: true});
          } else {
              navigate('/seller/dashboard', {replace: true});
          }

      }else{
        setAlertContent(json.massage);
        setAlert(true);
      }

    });
}

  return (
    <>
      <Helmet>
        <title>Happy Gas Login</title>
      </Helmet>
      {alert ? <Alert
      variant="outlined" severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ backgroundColor:'#FF8A8A' }}
        >
          {alertContent}
        </Alert> : <></> }
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            // onSubmit={() => {
            //   navigate('/admin/dashboard', { replace: true });
            // }}


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
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="Black"
                    fontWeight="bold"
                    variant="h2"

                  >
                    Sign in
                  </Typography>

                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      style={{
                        color: "white",

                    }}
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="black"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                   sx={{
                    "& .MuiInputLabel-root": {color: 'Black'},//styles the label

                  }}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={getEmailValue}
                  type="email"
                  variant="outlined"
                />
                <TextField
                 sx={{
                  "& .MuiInputLabel-root": {color: 'Black'},//styles the label

                }}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={getPasswordValue}
                  type="password"
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={loginHandle}
                  >
                    Sign in now
                  </Button>
                </Box>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
