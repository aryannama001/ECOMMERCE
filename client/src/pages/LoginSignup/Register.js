import React, { useEffect, useState } from 'react'
import { CgLock, } from 'react-icons/cg'
import { AiOutlineMail } from 'react-icons/ai'
import { HiOutlineFaceSmile } from 'react-icons/hi2'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, register } from '../../features/userSlice'
import { toast } from 'react-toastify'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { isAuthenticated, error } = useSelector((state) => state.user)

    const [avatar, setAvatar] = useState("/images/profile-icon.png");
    const [avatarPreview, setAvatarPreview] = useState("/images/profile-icon.png");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;



    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result)
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set("name", name);
        data.set("email", email);
        data.set("password", password);
        data.set("avatar", avatar)

        dispatch(register(data))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [error, navigate, isAuthenticated, dispatch])
    return (
        <div className='login__page'>
            <div className="login__container">
                <h2>Register</h2>
                <form className='login__form' encType='multipart/form-data' onSubmit={handleRegisterSubmit}>
                    <div>
                        <HiOutlineFaceSmile />
                        <input type="text" className=' border-2 rounded-md' required placeholder='Full Name' name='name' value={name} onChange={registerDataChange} />
                    </div>
                    <div>
                        <AiOutlineMail />
                        <input type="email" className=' border-2 rounded-md' required placeholder='Email' name='email' value={email} onChange={registerDataChange} />
                    </div>
                    <div>
                        <CgLock />
                        <input type="password" className=' border-2 rounded-md' required placeholder='Password' name='password' value={password} onChange={registerDataChange} />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                            required
                            className=' border-2 rounded-md'
                        />
                    </div>
                    <div>
                        <button type='submit'>Register</button>
                    </div>
                </form>
                <div className="login__link">
                    Already Registered?{"  "}
                    <Link to='/login'>
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register