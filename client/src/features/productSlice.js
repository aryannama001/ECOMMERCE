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

export const deleteProduct = createAsyncThunk('product/delete', async (id) => {
    try {
        const res = await axios.delete(`/api/products/${id}`)

        return await res.data.success

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
        },
        clearIsdeletedStatus: (state) => {
            state.isProductDeleted = false
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
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isProductDeleted = action.payload
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },

    }
})
export const { clearError, clearReviewStatus, clearIsdeletedStatus } = productSlice.actions

//update Product

export const updateProduct = createAsyncThunk('update/product', async ({ productId, formData }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } }
        const res = await axios.put(`/api/products/${productId}`, formData, config)
        console.log(formData)
        return await res.data.success;

    } catch (error) {
        throw error.response.data.error

    }
})


export const updateProductSlice = createSlice({
    name: "updateProduct",
    initialState: {
        loading: false,
        updateError: null,
        isUpdated: false
    },
    reducers: {
        clearUpdateError: (state) => {
            state.updateError = null
        },
        clearUpdateStatus: (state) => {
            state.isUpdated = false
        }
    },
    extraReducers: {
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.updateError = action.error.message
        }
    }
})

export const { clearUpdateError, clearUpdateStatus } = updateProductSlice.actions


export default productSlice.reducer

export const getAllReviews = createAsyncThunk('admin/reviews', async (id) => {
    try {
        const res = await axios.get(`/api/products/${id}/review`)
        return await res.data.reviews

    } catch (error) {
        throw error.response.data.error
    }
})

export const deleteReview = createAsyncThunk('admin/review/delete', async ({ productId, reviewId }) => {
    try {
        const res = await axios.delete(`/api/products/${productId}/review?reviewId=${reviewId}`)
        return await res.data.success

    } catch (error) {
        throw error.response.data.error
    }
})

export const getAllReviewsSlice = createSlice({
    name: 'admin-reviews',
    initialState: {
        loading: false,
        reviews: null,
        error: null
    },
    reducers: {
        clearReviewError: (state) => {
            state.error = null
        },
        clearDeleteReviewStatus: (state) => {
            state.isReviewDeleted = null
        }
    },
    extraReducers: {
        [getAllReviews.pending]: (state) => {
            state.loading = true
        },
        [getAllReviews.fulfilled]: (state, action) => {
            state.loading = false
            state.reviews = action.payload
        },
        [getAllReviews.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [deleteReview.pending]: (state) => {
            state.loading = true
        },
        [deleteReview.fulfilled]: (state, action) => {
            state.loading = false
            state.isReviewDeleted = action.payload
        },
        [deleteReview.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
    }
})

export const { clearReviewError, clearDeleteReviewStatus } = getAllReviewsSlice.actions