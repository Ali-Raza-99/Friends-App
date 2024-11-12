import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import Appbar from './Appbar';
import CssBaseline from '@mui/material/CssBaseline';

  function Home() {
    return(
      <>
            <CssBaseline /> 

      <Appbar/>
      </>
   )
     
   }
  
export default Home;
