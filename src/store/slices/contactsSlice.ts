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

export const fetchContactsBySearch = createAsyncThunk(
    'fetchContactsBySearch',
    async (data: {email: string, phrase: string}) => {
        const {email, phrase} = data;
        const contactsByName = await axios.get(`http://localhost:3001/contacts?ownerEmail=${email}&name_like=${phrase}`);

        const contactsByPhone = await axios.get(`http://localhost:3001/contacts?ownerEmail=${email}&phone_like=${phrase}`);

        if (contactsByPhone.data.length > 0) return contactsByPhone.data;

        return contactsByName.data;
    }
)

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
                state.contacts = [];
                state.status = 'error';
                state.errorMessage = action.payload;
            })
            .addCase(fetchContactsBySearch.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchContactsBySearch.rejected, (state) => {
                state.contacts = [];
                state.status = 'error';
            })
    },
})

export default contactsSlice.reducer