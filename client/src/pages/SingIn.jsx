import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';



export default function SingIn() {

  const {singIn, error, loading} = useAuthContext()
  
  //validation user experience

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [frontErrorMessage, setFrontErrorMessage] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    setFrontErrorMessage("");
  }, [email, password]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFrontErrorMessage("Invalid entry.");
      return;
    }

    const formData = {
      email, password
    };
    singIn(formData)
    
    };


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-bold my-7'>Sing In</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        {/* email */}
        <label htmlFor="email" className='flex items-center gap-2'>Email:</label>
        <input 
          type="email" 
          id="email" 
          ref={emailRef}
          autoComplete='off'
          className='border p-3 rounded-lg' 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          required/>

        {/* password */}

        <label htmlFor="password" className='flex items-center gap-2'>Password: </label>
        <input 
          type="password" 
          id="password" 
          className='border p-3 rounded-lg' 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          required
        />

        
        {/* submit */}
        <button 
            className={`p-3 rounded-lg uppercase text-white ${!email || !password ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'} disabled:opacity-80`} 
            disabled={!email || !password }
          >{loading ? "Loading..." : "Sing In"}
          </button>

          {error? <p className='text-red-500 mt-5'>{error}</p> : ""}
          {frontErrorMessage? <p className='text-red-500 mt-5'>{frontErrorMessage}</p> : ""}
      </form>
      
      <p className='text-center'>
        <br />
        Don't you have an account? <Link to="/sing-up"><span className='text-blue-700'>Sign Up</span></Link>
      </p>

    </div>
  )
}
