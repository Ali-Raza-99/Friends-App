import React, { useContext } from 'react';
import { CssBaseline } from '@mui/material';
import Appbar from './Appbar';
import PostContainer from './PostContainer';
import { FirestoreProvider } from '../context/fetchData';
import { AuthContext } from '../context/authContext/firebaseAuth';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";

function Home() {

  return (

    <FirestoreProvider>
      <CssBaseline />
      <Appbar/>
      
      <PostContainer />
    </FirestoreProvider>
    
  );
}

export default Home;
