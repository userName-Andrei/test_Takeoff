import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './slices/contactsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        auth: userReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;