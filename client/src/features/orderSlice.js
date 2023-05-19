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


//get all orders

export const getAllOrders = createAsyncThunk('admin/allorders', async () => {
    try {
        const res = await axios.get('/api/order/admin/all-orders');
        return await res.data
    } catch (error) {
        throw error.response.data.error

    }
})

export const deleteOrder = createAsyncThunk('admin/order/delete', async (id) => {
    try {
        const res = await axios.delete(`/api/order/${id}`)
        return await res.data.success
    } catch (error) {
        throw error.response.data.error
    }
})

export const updateOrderStatus = createAsyncThunk('admin/order/update-status', async ({ orderId, data }) => {
    try {
        const res = await axios.put(`/api/order/${orderId}`, data)
        return await res.data.success
    } catch (error) {
        throw error.response.data.error
    }
})

export const AllOrdersSlice = createSlice({
    name: "allorders",
    initialState: {
        loading: false,
        allOrders: [],
        toatlAmount: null,
        error: null
    },
    reducers: {
        clearOrderStatus: (state) => {
            state.isOrderDeleted = null
        },
        clearError: (state) => {
            state.error = null
        },
        clearUpdateStatus: (state) => {
            state.isOrderUpdated = null
        }
    },
    extraReducers: {
        [getAllOrders.pending]: (state) => {
            state.loading = true
        },
        [getAllOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.allOrders = action.payload.orders
            state.totalAmount = action.payload.totalAmount
        },
        [getAllOrders.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [deleteOrder.pending]: (state) => {
            state.loading = true
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.isOrderDeleted = action.payload
        },
        [deleteOrder.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [updateOrderStatus.pending]: (state) => {
            state.loading = true
        },
        [updateOrderStatus.fulfilled]: (state, action) => {
            state.loading = false
            state.isOrderUpdated = action.payload
        },
        [updateOrderStatus.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
    }
})

export const { clearError, clearOrderStatus, clearUpdateStatus } = AllOrdersSlice.actions


