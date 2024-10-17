import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
//pages
import Home from './pages/Home';
import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import CreateListing from './pages/CreateListing';
import UserListings from "./pages/userListings"
//components
import ProtectedRoutes from './components/protectedRoutes';
//contexts
import { AuthContextProvider } from './contexts/authContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        
          <Header/>
          <Routes>
            {/* public routes */}
            <Route path='/' element={<Home/>}></Route>
            <Route path='/sign-in' element={<SingIn/>}></Route>
            <Route path='/sign-up' element={<SingUp/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            {/* private routes  */}
            <Route element={<ProtectedRoutes/>}>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/create' element={<CreateListing/>}></Route>
              <Route path='/listings/:id' element={<UserListings/>}></Route>

            </Route>

          </Routes>
      
      </AuthContextProvider>
    </BrowserRouter>
    
  )
}
