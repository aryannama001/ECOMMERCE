import React from 'react'
import { Stepper, Step, StepLabel, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import './shippingSteps.css'

const ShippingSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];
    return (
        <div className='stepper__container'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((item, index) => (
                    <Step key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default ShippingSteps