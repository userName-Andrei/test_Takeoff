import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ILoginForm, IUser } from '../../types/types'

interface UserState {
    user: IUser | null,
    status: 'idle' | 'loading' | 'loaded' | 'error',
    errorMessage: string | undefined
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    errorMessage: ''
}

export const fetchLogin = createAsyncThunk<
    IUser,
    ILoginForm,
    {
        rejectValue: string 
    }
>(
    'user/fetchLogin',
    async (data: ILoginForm, thunkAPI) => {
        try {
            const user = await axios.post('http://localhost:3001/login', data);

            const result = {...user.data.user, token: user.data.accessToken};

            return result
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 400) {
                return thunkAPI.rejectWithValue(error.response.data)
            }
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.user = null;
                state.status = 'loading';
                state.errorMessage = '';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'loaded';
                state.errorMessage = '';

            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.user = null;
                state.status = 'error';
                state.errorMessage = action.payload;
            })
    },
})

export default userSlice.reducer