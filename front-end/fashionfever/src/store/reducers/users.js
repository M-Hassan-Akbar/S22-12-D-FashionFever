import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: {
    userID: 0,
    username: "",
    password: "",
}};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },

        logout: (state, action) => {
            state = initialState;
            return state
        },

        getstatus: (state, action) => {

        },
    },
});

export default userSlice;
