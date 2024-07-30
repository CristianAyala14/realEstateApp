import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
//pages
import Home from './pages/Home';
import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
//components
//contexts
import { AuthContextProvider } from './contexts/authContext';

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/sing-in' element={<SingIn/>}></Route>
          <Route path='/sing-up' element={<SingUp/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    
  )
}
