import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';
//redux
import { useDispatch } from 'react-redux';
import { singInStart, singInSuccess, singInFailure } from '../redux/user/userSlice';

export default function SingIn() {

  const {singIn, errors, loading} = useAuthContext()
  const [formData, setFormData] = useState({})


  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    singIn(formData)

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-bold my-7'>Sing In</h1>

      <form className='flex  flex-col gap-4' onSubmit={handleSubmit}>

        <input type="email" placeholder='email' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>

        <input type="password" placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disable:opacity-80'>{loading ? "Loading..." : "Sing In"}</button>

      </form>
      
      <div className='flex gap-2 mt-5'>
        <p>Don't you have an account?</p>
        <Link to="/sing-up">
          <span className='text-blue-700'>Sing Up</span>
        </Link>
      </div>
      {errors? <p className='text-red-500 mt-5'>{errors}</p> : ""}
    </div>
  )
}
