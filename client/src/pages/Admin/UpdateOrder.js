import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { clearError, clearUpdateStatus, getOrderDetails, updateOrderStatus } from '../../features/orderSlice';
import { Typography } from '@mui/material'
import { toast } from 'react-toastify';


const UpdateOrder = () => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orderDetails } = useSelector(state => state.orderDetails)

    const { error, isOrderUpdated } = useSelector(state => state.AllOrders)

    const [status, setStatus] = useState('')


    const orderId = params.id

    useEffect(() => {
        dispatch(getOrderDetails({ orderId }))

        if (error) {
            toast.error(error)
            dispatch(clearError)
        }

        if (isOrderUpdated) {
            toast.success("Order status Updated")
            dispatch(clearUpdateStatus())
            navigate('/admin/orders')
        }
    }, [dispatch, params.id, isOrderUpdated, error])

    const handleStatusUpdate = () => {

        const data = new FormData()

        data.set("status", status)

        dispatch(updateOrderStatus({ orderId, data }))
    }
    return (
        orderDetails && <>
            <div className='dashboard__container' >
                <div style={{
                    margin: "10px 20px"
                }} >
                    <h2>Order ID: {orderDetails && orderDetails._id}</h2>
                </div>
                <div className="confirmOrder__container">
                    <div className="order__details">
                        <h2>Shipping Info:</h2>
                        <div className="shippingInfo">
                            <div>
                                <Typography>Name:</Typography>
                                <Typography>{orderDetails.user.name}</Typography>
                            </div>
                            <div>
                                <Typography>Phone:</Typography>
                                <Typography>{orderDetails.shippingInfo.phoneNo}</Typography>
                            </div>
                            <div>
                                <Typography>Address:</Typography>
                                <Typography>{`${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.country}, ${orderDetails.shippingInfo.pinCode}`}</Typography>
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: 5 }} >
                                <Typography>Payment Status :</Typography>
                                <Typography style={{ color: 'green' }} >{orderDetails.paymentInfo.status === 'succeeded' ? "Paid" : "Unpaid"}</Typography>
                            </div>
                        </div>
                        <div className='flex gap-2 mb-5'>
                            <Typography>Total Amount:</Typography>
                            <Typography>₹{orderDetails && orderDetails.totalPrice}</Typography>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: 5 }} >
                                <Typography>Order Status :</Typography>
                                <Typography style={{ color: orderDetails.orderStatus === 'Delivered' ? "green" : "red" }} >{orderDetails.orderStatus}</Typography>
                            </div>
                        </div>
                        <h2>Items:</h2>
                        <div className="order__items__container">
                            <div>
                                <Typography>Item</Typography>
                                <Typography>Price</Typography>
                                <Typography>Quantity</Typography>
                                <Typography>Total</Typography>
                            </div>
                            <div className='confirmOrder__items'>

                                {
                                    orderDetails.orderItems && orderDetails.orderItems.map((item, i) => (
                                        <div key={i}>
                                            <div>

                                                <img src={item.image} alt={item.name} />
                                                <Typography>{item.name}</Typography>
                                            </div>
                                            <Typography>₹{item.price}</Typography>
                                            <Typography>{item.quantity}</Typography>
                                            <Typography>₹{item.price * item.quantity}</Typography>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {orderDetails && <div className="order__process__container flex flex-col items-center gap-5">
                        <h1 className='text-center text-2xl text-gray-700 font-medium'>Process Order</h1>

                        <select className='px-5 py-3 w-60 bg-white border border-gray-300' onChange={(e) => setStatus(e.target.value)} >
                            <option value="">Choose Status</option>
                            {orderDetails.orderStatus === "processing" && (
                                <option value="Shipped">Shipped</option>
                            )}

                            {orderDetails.orderStatus === "Shipped" && (
                                <option value="Delivered">Delivered</option>
                            )}
                        </select>

                        <button className='border px-10 py-3 bg-orange-500 text-white uppercase hover:bg-orange-600' onClick={handleStatusUpdate} >
                            Process
                        </button>

                    </div>}
                </div>
            </div>

        </>
    )
}

export default UpdateOrder