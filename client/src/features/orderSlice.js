import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createOrder = createAsyncThunk("order/new", async ({ order }) => {
    try {
        const config = {
            Headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post("/api/order/new", order, config)

        return await data.order;
    } catch (error) {
        throw error.response.data.error
    }
})
//new order slice
export const orderSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        order: null,
        error: null
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null
        }
    },
    extraReducers: {
        [createOrder.pending]: (state) => {
            state.loading = true
        },
        [createOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.order = action.payload
        },
        [createOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }
    }

})
export const { clearErrors } = orderSlice.actions
export default orderSlice.reducer

//my orders slice

export const getMyOrders = createAsyncThunk('myorders', async () => {
    try {
        const { data } = await axios.get('/api/order/me/my-orders');
        return await data.order
    } catch (error) {
        throw error.response.data.error
    }
})
export const myOrders = createSlice({
    name: 'my-orders',
    initialState: {
        loading: false,
        myOrders: null,
        error: null
    },
    extraReducers: {
        [getMyOrders.pending]: (state) => {
            state.loading = true
        },
        [getMyOrders.fulfilled]: (state, action) => {
            state.loading = true;
            state.myOrders = action.payload
        },
        [getMyOrders.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }
    }
})

//get order details

export const getOrderDetails = createAsyncThunk('orderdetails', async ({ orderId }) => {
    try {
        const { data } = await axios.get(`/api/order/${orderId}`);
        return await data.order

    } catch (error) {
        throw error.response.data.error

    }
})

export const orderDetails = createSlice({
    name: 'orderdetails',
    initialState: {
        loading: false,
        orderDetails: null,
        error: null
    },
    extraReducers: {
        [getOrderDetails.pending]: (state) => {
            state.loading = true
        },
        [getOrderDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.orderDetails = action.payload
        },
        [getOrderDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }
    }
})