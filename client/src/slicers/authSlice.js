import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name: "authSlice",
    initialState: {
        isAuth: false,
        token: null
    },
    reducers: {
        setCredencials: (state, action) => {

            state.isAuth = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
        }
    }
});

export const { setCredencials, logout } = authSlice.actions;
export default authSlice.reducer;