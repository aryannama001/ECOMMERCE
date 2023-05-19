import React, { useState } from 'react'
import './sidebar.css'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FaSitemap } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdOutlineShoppingBag, MdOutlineRateReview, MdOutlineShoppingCart, MdOutlineLibraryAdd } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {

    const [productExpand, setProductExpand] = useState(false)

    return (
        <div className='sidebar border-r-slate-300 border-r'>
            <div className="sidebar__header border-b border-gray-500">
                <Link to='/' >
                    <p className='text-2xl text-center py-4'>Ecommerce</p>
                </Link>
            </div>

            <div className="sidebar__content__container">
                <div className="sidebar__content">
                    <Link className='sidebar__content__heading' to='/admin/dashboard'>
                        <RxDashboard />
                        <Typography>Dashboard</Typography>
                    </Link>
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__content__heading cursor-pointer" onClick={() => setProductExpand(!productExpand)} >
                        <FaSitemap />
                        <Typography>Products</Typography>
                        {productExpand ? <MdExpandLess /> : <MdExpandMore />}
                    </div>
                    {productExpand && <div className="product__expand__content">
                        <Link className='sidebar__content__heading' to='/admin/products/all'>
                            <MdOutlineShoppingBag />
                            <Typography>All</Typography>
                        </Link>
                        <Link className='sidebar__content__heading' to='/admin/products/create' >
                            <MdOutlineLibraryAdd />
                            <Typography>Add</Typography>
                        </Link>
                    </div>}
                </div>
                <div className="sidebar__content">
                    <Link className='sidebar__content__heading' to='/admin/orders'>
                        <MdOutlineShoppingCart />
                        <Typography>Orders</Typography>
                    </Link>
                </div>
                <div className="sidebar__content">
                    <Link className='sidebar__content__heading' to='/admin/users/all'>
                        <FiUsers />
                        <Typography>Users</Typography>

                    </Link>
                </div>
                <div className="sidebar__content">
                    <Link className='sidebar__content__heading' to='/admin/reviews'>
                        <MdOutlineRateReview />
                        <Typography>Reviews</Typography>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar