import todoSlice from "./slicers/todoSlice";
import postLayerSlice from "./slicers/postLayerSlice";
import authSlice from "./slicers/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        todo: todoSlice,
        postLayerSlice,
        auth: authSlice,
    },
});

export default store;