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



function LoginPage() {
  return (
    <div >
      <Box className="signUpCard"
        sx={(theme) => ({
          
          width: '29%',
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

        <Box sx={{marginLeft:0.7}} spacing={20} direction="row">
     <NavLink to="/"> <Button style={{ padding: "11px 168px",marginTop:40 }} variant="contained">Login</Button></NavLink>
      
      </Box>
      <Box sx={{marginLeft:0.7}} spacing={20} direction="row">
   <NavLink to="/signup"><Button  style={{ padding: "11px 161px",marginTop:10 , backgroundColor:'#424242'}} variant="contained">Sign Up</Button></NavLink>
      
      </Box>

  <Typography  variant='p' color="primary" size="large">there will be error</Typography>

      </Box>

    </div>
  )
}

export default LoginPage