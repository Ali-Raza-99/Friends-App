import { useState,useEffect ,useContext} from 'react'
import {  Route,Link,createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom';
import './App.css'
import Signup from './components/Signup'
import LoginPage from './components/LoginPage';
import Home from './components/Home';

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

function App() {

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //     <Route path="/" element={<Home />}>
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/login" element={<LoginPage />} />
  //     </Route>
  //     </>
  //   )
  // );

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>,
    },
    {
      path:"/login",
      element:<LoginPage/>,
    },
    {
      path:"/signup",
      element:<Signup/>,
    }
  ])

  return (
    <>
  
    <RouterProvider router={router}/>;
    </>
  )
}

export default App
