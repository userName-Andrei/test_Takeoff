import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { IContact } from '../../types/types'

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

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id: number) => {
        await axios.delete(`http://localhost:3001/contacts/${id}`);

        return id;
    }
)

export const editContact = createAsyncThunk(
    'contacts/editContact',
    async (contact: {id: number | undefined, data: IContact}) => {
        const res = await axios.patch(`http://localhost:3001/contacts/${contact.id}`, contact.data);

        return res.data;
    }
)

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact',
    async (data: IContact) => {
        const contact = await axios.post('http://localhost:3001/contacts', data);

        return contact.data;
    }
)

export const fetchContactsBySearch = createAsyncThunk(
    'contacts/fetchContactsBySearch',
    async (data: {email: string, phrase: string}) => {
        const {email, phrase} = data;
        const contactsByName = await axios.get(`http://localhost:3001/contacts?ownerEmail=${email}&name_like=${phrase}&_sort=name&_order=asc`);

        const contactsByPhone = await axios.get(`http://localhost:3001/contacts?ownerEmail=${email}&phone_like=${phrase}&_sort=name&_order=asc`);

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
    'contacts/fetchContactsByUserEmail',
    async (email, thunkAPI) => {
        try {
            const contacts = await axios.get(`http://localhost:3001/contacts?ownerEmail=${email}&_sort=name&_order=asc`);

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
            .addCase(addNewContact.fulfilled, (state, action) => {
                state.contacts?.push(action.payload);
            })
            .addCase(addNewContact.rejected, (state) => {
                state.contacts = [];
                state.status = 'error';
            })
            .addCase(editContact.fulfilled, (state, action) => {
                state.contacts = state.contacts!.map(item => {
                    if (item.id === action.payload.id) return action.payload

                    return item
                });
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts!.filter(item => item.id !== action.payload);
            })
    },
})

export default contactsSlice.reducer