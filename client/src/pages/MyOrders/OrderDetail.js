import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../../features/orderSlice';
import { Typography } from '@mui/material'


const OrderDetail = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const { orderDetails } = useSelector(state => state.orderDetails)




    useEffect(() => {

        const orderId = params.id
        dispatch(getOrderDetails({ orderId }))
    }, [dispatch, params.id])
    return (
        orderDetails && <>
            <div className='h-screen' >
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
                                <Typography style={{ color: 'green' }} >{orderDetails.paymentInfo.status}</Typography>
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: 5 }} >
                                <Typography>Order Status :</Typography>
                                <Typography >{orderDetails.orderStatus}</Typography>
                            </div>
                        </div>
                        <h2>Cart Items:</h2>
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
                    {orderDetails && <div className="order__summary">
                        <h2>Order Summary</h2>
                        <div>
                            <Typography>Sub Total:</Typography>
                            <Typography>₹{orderDetails && orderDetails.itemsPrice}</Typography>
                        </div>
                        <div>
                            <Typography>Shipping Cost:</Typography>
                            <Typography>₹{orderDetails && orderDetails.shippingPrice}</Typography>
                        </div>
                        <div>
                            <Typography>GST:</Typography>
                            <Typography>₹{orderDetails && orderDetails.taxPrice}</Typography>

                        </div>
                        <div>
                            <Typography>Total:</Typography>
                            <Typography>₹{orderDetails && orderDetails.totalPrice}</Typography>
                        </div>

                    </div>}
                </div>
            </div>

        </>
    )
}

export default OrderDetail