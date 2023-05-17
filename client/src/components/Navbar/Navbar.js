import React, { useState } from 'react'
import './navbar.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { CgMenu, CgClose, CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/userSlice';
import { toast } from 'react-toastify';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const { isAuthenticated, user } = useSelector((state) => state.user)
    const { cartItems } = useSelector(state => state.cart)

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }
    const handleLogout = () => {
        dispatch(logout())
        toast.success("Logout Successfully")
    }

    const cartBtnHandler = () => {
        navigate('/cart')
    }

    return (
        <nav className='navbar'>
            <div className="nav__left">
                <div className="menu" onClick={handleMenuOpen}>
                    {!menuOpen ? (<CgMenu className='menu__btn' />) : (<CgClose className='menu__btn' />)}
                </div>
                <div className="logo">
                    <span>ECOMMERCE</span>
                </div>
                <div className={`nav__links__container ${!menuOpen && 'closeMenu'}`} onClick={handleMenuOpen}>
                    <ul className="nav__links">
                        <li className="nav__links__item">
                            <NavLink to='/' className='link'>
                                home
                            </NavLink>
                        </li>
                        <li className="nav__links__item">
                            <NavLink to='/products' className='link'>
                                products
                            </NavLink>
                        </li>
                        <li className="nav__links__item" >
                            <NavLink to='/about' className='link'>
                                about
                            </NavLink>
                        </li>
                        <li className="nav__links__item">
                            <NavLink to='/contact' className='link'>
                                contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nav__right">
                <Badge badgeContent={cartItems.length} color='secondary' >
                    <ShoppingCartIcon className='cart' onClick={cartBtnHandler} sx={{ cursor: "pointer" }} />
                </Badge>

                {
                    !isAuthenticated ? (
                        <div className="nav__right__btns">
                            <Link to='/login'>
                                <button className='login__btn'>
                                    login
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className='dropdown_menu__container'>
                            <div className='dropdown__img'>
                                <img src={user.avatar.url} alt="" />
                            </div>
                            <div className="dropdown__menu">
                                <div className="dropdown__content">
                                    <ul>
                                        <Link to='/profile'>
                                            <li>
                                                Profile
                                            </li>
                                        </Link>
                                        {user.isAdmin && <Link to='/admin/dashboard' >
                                            <li>
                                                Dashboard
                                            </li>
                                        </Link>}
                                        <li onClick={handleLogout} className='flex col gap-2 items-center'>
                                            Logout <CgLogOut />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </nav>
    )
}

export default Navbar