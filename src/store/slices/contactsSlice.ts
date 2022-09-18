import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContact } from '../../types/types'
import type { RootState } from '../index'

interface ContactsState {
    contacts: IContact[],
    status: string
}

const initialState: ContactsState = {
    contacts: [],
    status: 'loading'
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
    },
})

export default contactsSlice.reducer