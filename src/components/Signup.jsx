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
import { getAuth,createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Fullscreen } from '@mui/icons-material';
import { auth } from '../firebase/firebase';
import { storageRef,uploadBytes,storage } from '../firebase/firebase';
// import { doCreateUserWithEmailAndPassword,createUserWithEmailAndPassword } from '../firebase/auth';
import { db,collection,addDoc } from '../firebase/firebase';
 import { getDownloadURL,ref } from 'firebase/storage';
import { deleteUser } from 'firebase/auth';
// import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  },
 
];

function Signup() {

  const navigate = useNavigate();
  const [success,setSuccess] = useState(null)
  const [error,setError] = useState('')
  const [imgUrl,setImgUrl]=  useState(null)
  const [values,setValues] = useState({
    name:'',
    email:'',
    phone:'',
    dateOfBirth:'',
    password:'',
    gender: '',
    city : ''
  })
  const [loading, setLoading] = useState(false);
  
  const [buttonColor,setButtonColor] = useState('#78909c')
  const handleSelectProfile =(event)=>{

    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImgUrl(file);   
        setButtonColor('#4caf50'); 
        event.target.value = "";
        setError(false); 
      } else {
        setError('Please select an image other files are not allowed');
        setButtonColor('#78909c'); 
      }
    }
  }
  useEffect(() => {
    if (imgUrl) {
      setButtonColor('#4caf50'); 
    }
  }, [imgUrl]);
  

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

  
  const handleSignUp = async () => {

    
    if (!values.name || !values.email || !values.password || !values.phone || !values.dateOfBirth || !values.gender|| !values.city || !imgUrl) {
      setError('Please ensure all input fields are completed before proceeding.');
      setSuccess(null);
      return; 
    }
  
    try {
    setLoading(true);  

      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
  
      try {
        const fileRef = ref(storage, `${user.uid}/profilePic/`);
        await uploadBytes(fileRef, imgUrl);
        const downloadURL = await getDownloadURL(fileRef);
  
        await updateProfile(user, { displayName: values.name, photoURL: downloadURL });
  
        await addDoc(collection(db, "users"), {
          userUid: user.uid,
          userName: values.name,
          phone: values.phone,
          profileUrl: downloadURL,
          born: values.dateOfBirth,
          city : values.city,
          gender : values.gender
        });

        setSuccess(true);
        navigate('/login');
  
      } catch (error) {
        await deleteUser(user);
        setError(`An error occurred while signing up : ${error.message}`);
        setSuccess(null);
      }
  
    } catch (error) {
      setLoading(false);  
      setError(`An error occurred while signing up : ${error.message}`);
      setSuccess(null);
    }
  };
  return (
    <div>
      <Box sx={{width:"53ch",border: `1px solid  rgb(189, 188, 188)`,padding:20}} className="signUpCard">

        <Typography color="primary" size="large">Friends App</Typography>
        <Typography fontWeight={500} mt={3} variant='h4'>Sign Up</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2.7}>
      <Grid item xs={6} >  <TextField onChange={(event)=> setValues((prev)=>({...prev,name:event.target.value}))}  size="small" id="outlined-basic-name" label="Name" variant="outlined" fullWidth/></Grid>
      <Grid item xs={6} >  <TextField sx={{width:'200px'}} onChange={(event)=> setValues((prev)=>({...prev,dateOfBirth:event.target.value}))} size="small" id="outlined-basic-date"  type='date' variant="outlined" fullWidth/></Grid>
      <Grid item xs={6} >  <TextField onChange={(event)=> setValues((prev)=>({...prev,phone:event.target.value}))} size="small" id="outlined-basic-number" label="Phone" type='number' variant="outlined" fullWidth/></Grid>
      <Grid item xs={6} >  <TextField onChange={(event)=> setValues((prev)=>({...prev,email:event.target.value}))} size="small" id="outlined-basic-email" label="E-mail" variant="outlined" fullWidth/></Grid>
      <Grid item xs={6} >  <TextField  onChange={(event)=> setValues((prev)=>({...prev,password:event.target.value}))} size="small" id="outlined-password-input" label="Password"type="password" autoComplete="current-password" fullWidth/></Grid>
      <Grid item xs={6}>  <Button style={{backgroundColor:buttonColor}} component="label" sx={{height:'40px'}} fullWidth role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}> Upload Profile <VisuallyHiddenInput type="file" accept="image/*"  onChange={(event)=>handleSelectProfile(event)} multiple /></Button></Grid>
      <Grid item xs={6} >  <TextField onChange={(event)=> setValues((prev)=>({...prev,city:event.target.value}))}  size="small" id="outlined-basic-city" label="City" variant="outlined" fullWidth/></Grid>
   <Grid item xs={6}>  
      <TextField
          id="outlined-select-gender"
          select
          size='small'
          // label="Select"
          defaultValue="Other"
          fullWidth
          onChange={(event)=> setValues((prev)=>({...prev,gender:event.target.value}))}
          // helperText="Please select your currency"
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
      </Grid>

        <Stack  sx={{justifyContent: "center",alignItems: "center",marginTop:3}}   direction="column">
     <LoadingButton style={{ padding: "11px 183px",marginTop:15 }} onClick={handleSignUp} loading={loading} variant="contained">  Sign Up </LoadingButton>
        <Typography mt={2} color="error" variant='caption' size="large">{error}</Typography>
        <Typography sx={{fontSize: '0.9rem'  }} mt={2} size="small">Already have an account click here for<NavLink to={'/login'}> Login</NavLink></Typography>
      </Stack>


      </Box>

    </div>
  )
}

export default Signup