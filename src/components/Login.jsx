import { useState, useEffect, useContext } from 'react'
import * as React from 'react';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import '../App.css'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink,Navigate, useNavigate } from 'react-router-dom';
// import { getAuth,createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Fullscreen } from '@mui/icons-material';
import { auth } from '../firebase/firebase';
// import { storageRef,uploadBytes,storage } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { db,collection,addDoc } from '../firebase/firebase';
//  import { getDownloadURL,ref } from 'firebase/storage';
// import { deleteUser } from 'firebase/auth';

function Login() {

  const navigate = useNavigate();
  // const [success,setSuccess] = useState(null)
  const [error,setError] = useState('')
  // const [buttonColor,setButtonColor] = useState('#78909c')
  const [values,setValues] = useState({
    email:'',
    password:''
  })
  const [loading, setLoading] = useState(false);
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  
  const handleLogin = async () => {

    
    if (!values.email || !values.password) {
      setError('Please ensure all input fields are completed before proceeding.');
      // setSuccess(null);
      return; 
    }
  
    try {
    setLoading(true);  

      const userCredential = await signInWithEmailAndPassword(auth,values.email,values.password)
      const user = userCredential.user

      // setSuccess(true)
      // loading(true)
      navigate('/home')
      // console.log(user)
    } catch (error) {
      setLoading(false);  
      setError(`An error occurred while logging in: ${error.message}`);
      // setSuccess(null);
    }
  };

  return (
    <div>
      <Box sx={{width:"53ch",border: `1px solid  rgb(189, 188, 188)`,padding:20}} className="loginCard">

        <Typography color="primary" size="large">Friends App</Typography>
        <Typography fontWeight={500} mt={3} variant='h4'>Login</Typography>
        <Grid container rowSpacing={1.2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2.7}>
      <Grid item xs={12} >  <TextField onChange={(event)=> setValues((prev)=>({...prev,email:event.target.value}))} size="small" id="outlined-basic-email" label="email" variant="outlined" fullWidth/></Grid>
      <Grid item xs={12} >  <TextField  onChange={(event)=> setValues((prev)=>({...prev,password:event.target.value}))} size="small" id="outlined-password-input" label="Password"type="password" autoComplete="current-password" fullWidth/></Grid>
      </Grid>

        <Stack  sx={{justifyContent: "center",alignItems: "center",marginTop:3}}   direction="column">
     <LoadingButton style={{ padding: "11px 190px",marginTop:15 }} onClick={handleLogin} loading={loading} variant="contained">  Login</LoadingButton>
        <Typography mt={2} color="error" variant='caption' size="large">{error}</Typography>
        <Typography sx={{fontSize: '0.9rem'  }} mt={2} size="small">Don't have account click here for <NavLink to={'/signup'}> SignUp</NavLink></Typography>
      </Stack>


      </Box>

    </div>
  )
}

export default Login