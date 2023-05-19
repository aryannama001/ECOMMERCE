import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import './payment.css'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EventIcon from '@mui/icons-material/Event'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { Typography } from '@mui/material';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../features/orderSlice';
import { clearCart } from '../../features/cartSlice';

const PaymentForm = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const { user } = useSelector(state => state.user)
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const payBtn = useRef(null)
    const stripe = useStripe()
    const elements = useElements()

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.gst,
        shippingPrice: orderInfo.shippingCost,
        totalPrice: orderInfo.totalPrice

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true
        try {

            const config = {
                Headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post("/api/payment/process",
                paymentData,
                config)

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false
                toast.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder({ order }))
                    navigate('/order-place/success')
                    dispatch(clearCart())
                } else {
                    toast.error("Issue while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

    })

    return (
        <div className="payment__container">
            <form className="payment__form" onSubmit={handleSubmit}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className='payment__input' />
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className='payment__input' />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className='payment__input' />
                </div>

                <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='pay__btn bg-orange-500' />
            </form>
        </div>
    )
}

export default PaymentForm