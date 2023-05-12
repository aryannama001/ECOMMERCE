import React from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Typography } from '@mui/material'
import { addToCart, removeItem } from '../../features/cartSlice'
import { Link } from 'react-router-dom'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const incrementQuantity = (id, quant, stock) => {
        if (quant >= stock) return;
        const quantity = quant + 1;
        dispatch(addToCart({ id, quantity }))

    }
    const decrementquantity = (id, quant) => {
        if (quant <= 1) return;
        const quantity = quant - 1;
        dispatch(addToCart({ id, quantity }))
    }
    const deleteItem = (id) => {
        dispatch(removeItem(id))
    }

    const subtotal = cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0);
    const shippingCost = subtotal > 1000 ? 0 : 100;
    const total = subtotal + shippingCost
    return (
        <>
            <div className="cart__page min-h-screen">
                <h2>Your Cart</h2>
                {
                    cartItems.length > 0 ?
                        <div className="cart__container">
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow
                                                key={item.productId}
                                            >
                                                <TableCell component="th" scope="row" >
                                                    <div className='cart__product__feild'>

                                                        <img src={item.image} alt={item.name} className='cart__product__image' />
                                                        <div>

                                                            <Link to={`/product/${item.productId}`}><Typography> {item.name}</Typography></Link>
                                                            <Typography

                                                                sx={{
                                                                    '&:hover': {
                                                                        textDecoration: "underline"
                                                                    },
                                                                    fontSize: "13px",
                                                                    color: "rgba(256,0,0,0.7)",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => deleteItem(item.productId)}
                                                            >remove</Typography>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">₹{item.price}</TableCell>
                                                <TableCell align="right">
                                                    <div className="cart__quantity">

                                                        <button onClick={() => decrementquantity(item.productId, item.quantity)} >-</button>
                                                        <input type="text" placeholder={item.quantity} readOnly />
                                                        <button onClick={() => incrementQuantity(item.productId, item.quantity, item.stock)}>+</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">₹{item.price * item.quantity}</TableCell>
                                            </TableRow>
                                        ))}


                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div style={{
                                display: "flex",
                                alignItems: "flex-end",
                                flexDirection: "column"
                            }}>
                                <div className='price__total__box'>
                                    <div>
                                        <Typography>Sub Total: </Typography>
                                        <Typography>₹{subtotal}</Typography>
                                    </div>
                                    <div>
                                        <Typography>Shipping Cost:</Typography>
                                        <Typography>₹{
                                            shippingCost
                                        }</Typography>
                                    </div>
                                    <div>
                                        <Typography>Grand Total:</Typography>
                                        <Typography>₹{total}</Typography>
                                    </div>
                                </div>
                                <div className='checkout__btn'>
                                    <Link to='/shipping' >Check Out</Link>
                                </div>
                            </div>

                        </div> : <div className='empty__cart__container'>
                            <RemoveShoppingCartIcon />
                            <Typography>Cart is Empty</Typography>
                            <Link to='/products'>Continue Shopping <ArrowForwardIcon /></Link>
                        </div>
                }
            </div>

        </>
    )
}

export default Cart