import React from 'react'
import ShippingSteps from '../../components/Stepper/ShippingSteps'
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './payment.css'

const Payment = ({ stripeApiKey }) => {



    return (
        <>
            <ShippingSteps activeStep={2} />
            <Elements stripe={loadStripe(stripeApiKey)} >
                <PaymentForm />
            </Elements>
        </>
    )
}

export default Payment