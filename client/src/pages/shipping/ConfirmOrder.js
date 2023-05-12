import React from 'react'
import ShippingSteps from '../../components/Stepper/ShippingSteps'
import './confirmOrder.css'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const { user } = useSelector(state => state.user)
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate()

    const subtotal = cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0);
    const shippingCost = subtotal > 1000 ? 0 : 100;
    const gst = subtotal * 0.18;
    const totalPrice = subtotal + shippingCost + gst

    const handlePaymentClick = () => {
        const data = {
            subtotal,
            shippingCost,
            gst,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate('/process/payment')

    }
    return (
        <div>
            <ShippingSteps activeStep={1} />
            <div className="confirmOrder__container">
                <div className="order__details">
                    <h2>Shipping Info:</h2>
                    <div className="shippingInfo">
                        <div>
                            <Typography>Name:</Typography>
                            <Typography>{user.name}</Typography>
                        </div>
                        <div>
                            <Typography>Phone:</Typography>
                            <Typography>{shippingInfo.phoneNo}</Typography>
                        </div>
                        <div>
                            <Typography>Address:</Typography>
                            <Typography>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`}</Typography>
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
                                cartItems && cartItems.map((item, i) => (
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
                <div className="order__summary">
                    <h2>Order Summary</h2>
                    <div>
                        <Typography>Sub Total:</Typography>
                        <Typography>₹{subtotal}</Typography>
                    </div>
                    <div>
                        <Typography>Shipping Cost:</Typography>
                        <Typography>₹{shippingCost}</Typography>
                    </div>
                    <div>
                        <Typography>GST:</Typography>
                        <Typography>₹{gst}</Typography>

                    </div>
                    <div>
                        <Typography>Total:</Typography>
                        <Typography>₹{totalPrice}</Typography>
                    </div>
                    <button onClick={handlePaymentClick} >Proceed to Payment</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder