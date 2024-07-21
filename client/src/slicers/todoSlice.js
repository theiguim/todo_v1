import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({

name:"TodoSlice",
initialState:[],
reducers:{
    Items: (state, action)=>{
        // console.log(action.payload)
        return state = action.payload;
    },
},
});

export const {Items} = todoSlice.actions;
export default todoSlice.reducer;