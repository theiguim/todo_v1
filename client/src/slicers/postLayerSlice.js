import { createSlice } from "@reduxjs/toolkit";

const postLayer = createSlice({

    name:"PostLayer",
    initialState: "",
    reducers:{
        showPost: (state, action)=>{
           return state = action.payload
        },
    },

});

export const {showPost} = postLayer.actions;
export default postLayer.reducer;