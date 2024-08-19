import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoutes() {

    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
    if( !isAuthenticated){
        return <Navigate to="/sign-in" replace/>
    }
    return (
        <div><Outlet/> </div>
    )
}
