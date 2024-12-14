import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login';
import MaserLayout from './Layouts/MaserLayout/MaserLayout';
import Home from './Pages/Home/Home';
import UserList from './Pages/UserList/UserList';
import AddUser from './Pages/AddUser/AddUser';
import Profile from './Pages/Profile/Profile';

export default function App() {

let routers = createBrowserRouter([
{
path:'',
element:<AuthLayout/>,
errorElement:<NotFound/>,
children:[
  {index:true,element:<Login/>},
  {path:'login',element:<Login/>}
]
},
{
  path:'dashboard',
  element:<MaserLayout/>,
  errorElement:<NotFound/>,
  children:[
    {index:true,element:<Home/>},
    {path:'home',element:<Home/>},
    {path:'userslist',element:<UserList/>},
    {path:'adduser',element:<AddUser/>},
    {path:'profile',element:<Profile/>},
  ]
}
])

  return (
    <>
<RouterProvider router={routers}></RouterProvider>
    </>
  )
}
