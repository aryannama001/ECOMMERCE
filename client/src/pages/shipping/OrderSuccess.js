import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)', flexDirection: 'column', gap: "10px" }}>
            <div>
                <DoneIcon style={{ fontSize: '80px', color: 'white', backgroundColor: "green", borderRadius: '50%', padding: '20px' }} />
            </div>
            <Typography>Order Placed Successfully</Typography>
            <Link to='/products' style={{ color: 'blue', fontSize: '20px', }}>
                Continue Shopping
            </Link>
        </div>

    )
}

export default OrderSuccess