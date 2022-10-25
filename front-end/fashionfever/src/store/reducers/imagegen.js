import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: {
    images: [],
}};

const imageGenSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload;
        },

        reset: (state, action) => {
            state = initialState;
        },

        get: (state, action) => {
            return state;
        },
    },
});

export default imageGenSlice;