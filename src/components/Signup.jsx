import { useState, useEffect, useContext } from 'react'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../App.css'
import Box from '@mui/material/Box';
import InputField from './InputField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { getAuth,createUserWithEmailAndPassword  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp,doc,deleteDoc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6-sjausmHzwHfAhQ9a5Klr3cb74SbfDs",
  authDomain: "arfacebookapp.firebaseapp.com",
  projectId: "arfacebookapp",
  storageBucket: "arfacebookapp.appspot.com",
  messagingSenderId: "675808701259",
  appId: "1:675808701259:web:96e93f2f68fcdf06b296ce",
  measurementId: "G-NPSBCG60B7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);


// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
    // Signed up 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });


function Signup() {
  return (
    <div >
      <Box className="signUpCard"
        sx={(theme) => ({
          
          width: '28%',
          height: 400,
          p: 1,
          my: 1,
          bgcolor: 'grey.30',
          color: 'grey.800',
          padding: 2,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          // textAlign: 'center',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}>

        <Typography color="primary" size="large">Friends App</Typography>
        <Typography fontWeight={500} mt={3} variant='h4'>Sign Up</Typography>
        <InputField/>

        <Stack sx={{marginLeft:1}} spacing={20} direction="row">
     <NavLink to={'/'}><Button style={{ padding: "11px 160px",marginTop:40 }} variant="contained">SignUp</Button></NavLink> 
      
      </Stack>
      <Stack sx={{marginLeft:1}} spacing={20} direction="row">
    <NavLink to={'/login'}> <Button  style={{ padding: "11px 153px",marginTop:10 , backgroundColor:'#424242'}} variant="contained">Login</Button></NavLink>
      
      </Stack>

{/* <Typography color="primary" size="large">f</Typography> */}

      </Box>

    </div>
  )
}

export default Signup