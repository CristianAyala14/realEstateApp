import React from 'react'
import { useAuthContext } from '../contexts/authContext'
import { Navigate, Outlet } from 'react-router-dom'


export default function ProtectedRoutes() {

    const { loading, isAuthenticated} = useAuthContext()

    if(loading) return <h1>Loading...</h1>

    if(!loading && !isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    return (
        <div><Outlet/> </div>
    )
}
