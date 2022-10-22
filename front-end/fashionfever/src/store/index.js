import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/users.js'


export const { login, logout } = userSlice.actions;

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
    }
});