import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
    const location = useLocation()

    const { isAuthenticated } = useSelector(state => state.user)


    if (isAuthenticated === false) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return <Outlet />

    // return (
    //     isAuthenticated ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
    // )
}

export default ProtectedRoute