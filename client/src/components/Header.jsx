import {FaSearch} from "react-icons/fa"
import {Link, useNavigate, } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Header() {

    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated)
    const user = useSelector((state)=>state.user)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get("searchTerm")
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])
    
       
    
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>RealState</span>
                        <span className='text-slate-700'>WeebApp</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input 
                    type="text" 
                    placeholder='Search' 
                    className='bg-transparent' 
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    
                    />
                    <button><FaSearch className='text-slate-600'/></button>
                    
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

