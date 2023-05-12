import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const addToCart = createAsyncThunk('cart/add', async ({ id, quantity }) => {
    const { data } = await axios.get(`/api/products/${id}`)

    return {
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0] ? data.product.images[0].url : "dummy",
        stock: data.product.stock,
        quantity,
    }


})

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    },
    reducers: {
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload

            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
    },
    extraReducers: {
        [addToCart.fulfilled]: (state, action) => {
            const item = action.payload;

            const isExist = state.cartItems.find((i) => i.productId === item.productId)

            if (isExist) {
                state.cartItems = state.cartItems.map((i) => i.productId === item.productId ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
    }
})

export const { removeItem, saveShippingInfo, clearCart } = cartSlice.actions

export default cartSlice.reducer