import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ admin }) => {
    const location = useLocation()

    const { isAuthenticated, user } = useSelector(state => state.user)


    if (isAuthenticated === false) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    if (admin === true && user.isAdmin === false) {
        return <Navigate to='/profile' replace state={{ from: location }} />
    }

    return <Outlet />

    // return (
    //     isAuthenticated ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
    // )
}

export default ProtectedRoute