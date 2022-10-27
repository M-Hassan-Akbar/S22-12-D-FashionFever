import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: {
    email: '',
    address: "",
    dob: "",
    bio: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_image: "",
    gender: "",
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
