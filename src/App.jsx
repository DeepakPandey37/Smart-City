import React from 'react'
import Footer from './components/Shared/Footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Navbar from './components/Shared/Navbar';
import  Home  from './components/Home';
import Register from './components/Register';
import AllComplaints from './components/AllComplaints';
import AdminComplaintsTable from './components/Admin/AdminComplaintsTable';
import Login from './components/auth/login';
import Signup from './components/auth/Signup';
import Profile from './components/Profile';
import Dynamic from './components/Admin/Dynamic';
import Notifications from './components/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  const appRouter = createBrowserRouter([
     {
      path: "/",
      element: <Home/>
     },
     {
      path: "/registercomplaint",
      element: <Register/> 
     },
     
     {
      path: "/login",
      element: <Login/>
     },
     {
      path: "/signup",
      element: <Signup/>

     },
     {
      path: "/profile",
      element: <Profile/>
     },
     {
      path: "/getAll",
      element: <AllComplaints/>

      
     },
     {
      path: "/admin/complaints/table",
      element: <ProtectedRoute> <AdminComplaintsTable/> </ProtectedRoute> 
     },
     {
      path: "/admin/complaints/:id",
      element: <ProtectedRoute>  <Dynamic/> </ProtectedRoute> 

      ///admin/complaints/:id
     },
     {
      path: "/admin/notice",
      element: <ProtectedRoute> <Notifications/> </ProtectedRoute> 
 
      
     },
     

      ])
  return (
   <>
   <RouterProvider router= {appRouter}/>
   </>
  )
}

export default App
