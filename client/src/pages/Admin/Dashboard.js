import React from 'react'
import './dashboard.css'
import Sidebar from '../../components/Admin/Sidebar'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const doughnutData = {
        labels: ['mobiles', 'laptops', 'clothes', 'electronics'],
        datasets: [
            {
                data: [10, 50, 20, 15],
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
    return (
        <div className='bg-gray-200'>
            <div className="dashboard__container px-5">
                <div className="dashboard__heading">
                    <p className='text-center text-3xl text-blue-900'>DASHBOARD</p>
                </div>

                <div className='mt-10 flex justify-center items-center mx-auto w-full bg-purple-600 text-white py-4 text-xl text-center font-medium'>
                    <p>Total Amount: <br />₹1222 </p>
                </div>

                <div className='flex w-full justify-center my-10 gap-5' >
                    <Link className='dashboard__summary' >
                        <p>Products</p>
                        <p>10</p>
                    </Link>
                    <Link className='dashboard__summary'>
                        <p>Orders</p>
                        <p>10</p>
                    </Link>
                    <Link to='/admin/users' className='dashboard__summary'>
                        <p>Users</p>
                        <p>10</p>
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