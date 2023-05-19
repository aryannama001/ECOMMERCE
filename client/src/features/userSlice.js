import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
    try {

        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.post('/api/users/login', { email, password }, config)

        return res.data.user

    } catch (error) {
        throw error.response.data.error
    }
})
export const register = createAsyncThunk('user/register', async (userData) => {
    try {

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post('/api/users', userData, config)

        return res.data.user

    } catch (error) {
        throw error.response.data.error
    }
})
export const loadUser = createAsyncThunk('user/loadUser', async () => {
    try {

        const res = await axios.get('/api/users/profile')

        return res.data.user

    } catch (error) {
        throw error.response.data.error
    }
})
export const logout = createAsyncThunk('user/logout', async () => {
    try {

        const res = await axios.get('/api/users/logout')

        return res.data.message

    } catch (error) {
        throw error.response.data.error
    }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (userData) => {
    try {

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.put('/api/users/profile', userData, config)

        return res.data.success

    } catch (error) {
        throw error.response.data.error
    }
})
export const updatePassword = createAsyncThunk('user/updatePassword', async (userData) => {
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.put('/api/users/profile/password', userData, config)

        return res.data.success

    } catch (error) {
        throw error.response.data.error
    }
})



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: null,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearProfileUpdated: (state) => {
            state.isUpdated = null
        },
        clearPasswordUpdated: (state) => {
            state.isPasswordUpdated = null
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [register.pending]: (state) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [loadUser.pending]: (state) => {
            state.loading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        [logout.pending]: (state) => {
            state.loading = true;
        },
        [logout.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [updateProfile.pending]: (state) => {
            state.loading = true;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.isUpdated = false;
            state.error = action.error.message
        },
        [updatePassword.pending]: (state) => {
            state.loading = true;
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.isPasswordUpdated = action.payload;
        },
        [updatePassword.rejected]: (state, action) => {
            state.loading = false;
            state.isPasswordUpdated = false;
            state.error = action.error.message
        }
    }
})

export const { clearError, clearProfileUpdated, clearPasswordUpdated } = userSlice.actions

export default userSlice.reducer

//get all users

export const getAllUsers = createAsyncThunk('admin/getallusers', async () => {
    try {
        const res = await axios.get('/api/users/')
        return await res.data.users
    } catch (error) {
        throw error.response.data.error
    }
})

export const getAllUsersSlice = createSlice({
    name: "allusers",
    initialState: {
        loading: false,
        users: [],
        error: null
    },
    reducers: {
        clearAllUsersError: (state) => {
            state.error = null
        }
    },
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.loading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        }

    }
})

export const { clearAllUsersError } = getAllUsersSlice.actions


export const getSingleUser = createAsyncThunk('admin/user/detail', async (id) => {
    try {
        const res = await axios.get(`/api/users/${id}`)
        return await res.data.user
    } catch (error) {
        throw error.response.data.error
    }
})
export const updateUserRole = createAsyncThunk('admin/user/update', async ({ userId, data }) => {
    try {
        const res = await axios.put(`/api/users/${userId}`, data)
        return await res.data.success
    } catch (error) {
        throw error.response.data.error
    }
})

export const deleteUser = createAsyncThunk('admin/user/delete', async (id) => {
    try {
        const res = await axios.delete(`/api/users/${id}`)
        return await res.data.success
    } catch (error) {
        throw error.response.data.error
    }
})
export const getUserSlice = createSlice({
    name: 'admin-user',
    initialState: {
        loading: false,
        user: {},
        error: null
    },
    reducers: {
        clearUserError: (state) => {
            state.error = null
        },
        clearRoleUpdate: (state) => {
            state.isRoleUpdated = null
        },
        clearUserDeleted: (state) => {
            state.isUserDeleted = null
        }
    },
    extraReducers: {
        [getSingleUser.pending]: (state) => {
            state.loading = true
        },
        [getSingleUser.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        [getSingleUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [updateUserRole.pending]: (state) => {
            state.loading = true
        },
        [updateUserRole.fulfilled]: (state, action) => {
            state.loading = false
            state.isRoleUpdated = action.payload
        },
        [updateUserRole.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.isUserDeleted = action.payload
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
    }
})

export const { clearUserError, clearRoleUpdate, clearUserDeleted } = getUserSlice.actions