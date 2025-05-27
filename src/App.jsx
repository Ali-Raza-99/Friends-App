import { useState,useEffect ,useContext} from 'react'
import {  Route,Link,createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom';
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
// import { useAuth } from './context';
import { doSignInWithEmailAndPassword } from './firebase/auth';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)



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
    },
    {
      path:"/Profile",
      element:<Profile/>,
    }
  ])

  return (
    <>
  
    <RouterProvider router={router}/>
    </>
  )
}

export default App
