import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';
import { useSelector } from 'react-redux';

export default function SingUp() {

  const {singUp} = useAuthContext()
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=> state.user)

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    singUp(formData)
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-bold my-7'>Sing Up</h1>

      <form className='flex  flex-col gap-4' onSubmit={handleSubmit}>

        <input type="text" placeholder='username' className='border p-3 rounded-lg' id="username" onChange={handleChange} />

        <input type="email" placeholder='email' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>

        <input type="password" placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disable:opacity-80'>{loading ? "Loading..." : "Sing Up"}</button>

      </form>
      
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/sing-in">
          <span className='text-blue-700'>Sing In</span>
        </Link>
      </div>
      {error? <p className='text-red-500 mt-5'>{error}</p> : ""}
    </div>
  )
}
