import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProductDetails = createAsyncThunk('product/getProductDetails', async (id) => {
    try {
        const res = await axios.get(`/api/products/${id}`)
        return await res.data.product;
    } catch (error) {
        throw error.response.data.error
    }

})
export const reviewSubmit = createAsyncThunk('product/review/submit', async ({ id, data }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } }
        const res = await axios.put(`/api/products/${id}/review`, data, config)
        return await res.data.success;
    } catch (error) {
        throw error.response.data.error

    }

})

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearReviewStatus: (state) => {
            state.isReviewSubmited = null
        }
    },
    extraReducers: {
        [getProductDetails.pending]: (state) => {
            state.loading = true;
        },
        [getProductDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload
        },
        [getProductDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [reviewSubmit.pending]: (state) => {
            state.loading = true;
        },
        [reviewSubmit.fulfilled]: (state, action) => {
            state.loading = false;
            state.isReviewSubmited = action.payload
        },
        [reviewSubmit.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }
    }
})
export const { clearError, clearReviewStatus } = productSlice.actions

export default productSlice.reducer