import { useState,useEffect ,useContext} from 'react'
import {  Route,Link,createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom';
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login';
import Home from './components/Home';
// import { useAuth } from './context';
import { doSignInWithEmailAndPassword } from './firebase/auth';




function App() {


  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login/>,
    },
    {
      path:"/login",
      element:<Login/>,
    },
    {
      path:"/signup",
      element:<Signup/>,
    },
    {
      path:"/home",
      element:<Home/>,
    }
  ])

  return (
    <>
  
    <RouterProvider router={router}/>
    </>
  )
}

export default App
