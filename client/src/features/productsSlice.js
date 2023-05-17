import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllProducts = createAsyncThunk('products/getAllProducts', async ({ category, page, limit, price, rating }) => {
    try {
        let link = `/api/products?page=${page}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
        if (category) {
            link = `/api/products?category=${category}&page=${page}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
        }
        const res = await axios.get(link)
        return await res.data;
    } catch (error) {
        throw error.response.data.error
    }

})

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        error: null,
        productsCount: null
    },
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loading = true
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.totalProducts
        },
        [getAllProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }
    }

})


export const getAllAdminProducts = createAsyncThunk('products/admin/all', async () => {
    try {
        const res = await axios.get('/api/products/admin/all')
        return await res.data
    } catch (error) {
        throw error.response.data.error
    }
})

export const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        loading: false,
        products: [],
        error: null,
    },
    extraReducers: {
        [getAllAdminProducts.pending]: (state) => {
            state.loading = true
        },
        [getAllAdminProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.products = action.payload.products
        },
        [getAllAdminProducts.rejected]: (state, action) => {
            state.error = action.error.message
        }
    }
})

export default productsSlice.reducer