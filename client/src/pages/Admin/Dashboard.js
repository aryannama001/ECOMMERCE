import React, { useEffect } from 'react'
import './dashboard.css'
import Sidebar from '../../components/Admin/Sidebar'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/orderSlice';
import { getAllUsers } from '../../features/userSlice';
import { getAllAdminProducts } from '../../features/productsSlice';

const Dashboard = () => {

    const dispatch = useDispatch()
    const { totalAmount, allOrders } = useSelector(state => state.AllOrders)
    const { users } = useSelector(state => state.allUsers)
    const { products } = useSelector(state => state.adminProducts)


    ChartJS.register(ArcElement, Tooltip, Legend);

    const categoryCount = products.reduce((count, product) => {
        const category = product.category;
        count[category] = (count[category] || 0) + 1;
        return count;
    }, {});



    const doughnutData = {
        labels: Object.keys(categoryCount),
        datasets: [
            {
                data: Object.values(categoryCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',

                ],
            }
        ]
    }

    useEffect(() => {
        dispatch(getAllOrders())
        dispatch(getAllUsers())
        dispatch(getAllAdminProducts())
    }, [dispatch])
    return (
        <div className='bg-gray-200'>
            <div className="dashboard__container px-5">
                <div className="dashboard__heading">
                    <p className='text-center text-3xl text-blue-900'>DASHBOARD</p>
                </div>

                <div className='mt-10 flex justify-center items-center mx-auto w-full bg-purple-600 text-white py-4 text-xl text-center font-medium'>
                    <p>Total Amount: <br />₹ {totalAmount}</p>
                </div>

                <div className='flex w-full justify-center my-10 gap-5' >
                    <Link className='dashboard__summary' to='/admin/products/all'>
                        <p>Products</p>
                        <p>{products.length}</p>
                    </Link>
                    <Link className='dashboard__summary' to='/admin/orders'>
                        <p>Orders</p>
                        <p>{allOrders.length}</p>
                    </Link>
                    <Link to='/admin/users/all' className='dashboard__summary' >
                        <p>Users</p>
                        <p>{users.length}</p>
                    </Link>
                </div>

                <div className='w-full h-96 justify-center flex mt-20 pb-10'>
                    <Doughnut data={doughnutData} />
                </div>

            </div>
        </div>
    )
}

export default Dashboard