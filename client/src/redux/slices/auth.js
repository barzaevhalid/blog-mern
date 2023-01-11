import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me');
    return data;
});
const initialState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state, action) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;

        },
        [fetchAuth.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state, action) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;

        },
        [fetchAuthMe.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },
    },
});
export const selectIsAuth = state => !!state.auth.data;
export const {logout} = authSlice.actions
export const  authReducer = authSlice.reducer;
