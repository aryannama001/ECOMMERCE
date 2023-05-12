import React, { useState, useEffect } from 'react'
import { CgLock, } from 'react-icons/cg'
import { AiOutlineMail } from 'react-icons/ai'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, login } from '../../features/userSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { isAuthenticated, error } = useSelector((state) => state.user)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from, { replace: true })
        }
    }, [error, isAuthenticated, navigate, dispatch, location])

    return (
        <div className='login__page'>

            <div className="login__container">
                <h2>Login</h2>
                <form className='login__form' onSubmit={handleLoginSubmit} >
                    <div>
                        <AiOutlineMail />
                        <input type="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className=' border-2 rounded-md' />
                    </div>
                    <div>
                        <CgLock />
                        <input type="password" required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className=' border-2 rounded-md' />
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <div className="register__link">
                    New User?{"  "}
                    <Link to='/register'>
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login