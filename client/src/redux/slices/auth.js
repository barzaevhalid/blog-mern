import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetUserData', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data
})
const initialState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserData.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;

        },
        [fetchUserData.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },
    },
})

export const  authReducer = authSlice.reducer;
