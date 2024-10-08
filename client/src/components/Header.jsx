import React from 'react'
import {FaSearch} from "react-icons/fa"
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';

export default function Header() {

    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated)
    const user = useSelector((state)=>state.user)


    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>RealState</span>
                        <span className='text-slate-700'>WeebApp</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='Search' className='bg-transparent'/>
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex items-center gap-4'>
                    <Link to="/"><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
                    <Link to="/about"><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/sign-in"><li className='text-slate-700 hover:underline'>Sign In</li></Link>
                            <Link to="/sign-up"><li className='text-slate-700 hover:underline'>Sign Up</li></Link>
                        </>
                    ) : (
                        <Link to="/profile">
                            <li className='flex items-center'>
                                <img 
                                    src={user.user.profileImage} 
                                    alt="profile" 
                                    className='rounded-full h-10 w-10 object-cover cursor-pointer' 
                                />
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    );
}

