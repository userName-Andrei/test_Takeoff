import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { IContact } from '../../types/types'
import type { RootState } from '../index'

interface ContactsState {
    contacts: IContact[] | null,
    status: 'idle' | 'loading' | 'loaded' | 'error',
    errorMessage: string | undefined
}

const initialState: ContactsState = {
    contacts: null,
    status: 'loading',
    errorMessage: ''
}

export const fetchContactsByUserEmail = createAsyncThunk<
    IContact[],
    string,
    {
        rejectValue: string 
    }
>(
    'fetchContactsByUserEmail',
    async (email, thunkAPI) => {
        try {
            const contacts = await axios.get(`http://localhost:3001/contacts?ownerEmail=${email}`);

            return contacts.data
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 400) {
                return thunkAPI.rejectWithValue(error.response.data)
            }
        }
    }
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchContactsByUserEmail.pending, (state) => {
                state.contacts = null;
                state.status = 'loading';
                state.errorMessage = '';
            })
            .addCase(fetchContactsByUserEmail.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.status = 'loaded';
                state.errorMessage = '';
            })
            .addCase(fetchContactsByUserEmail.rejected, (state, action) => {
                state.contacts = null;
                state.status = 'error';
                state.errorMessage = action.payload;
            })
    },
})

export default contactsSlice.reducer