import { createSlice } from "@reduxjs/toolkit";
const cateInitialState = {
    categories : []
}

const category = createSlice({
    name : "category",
    initialState:cateInitialState,
    reducers : {
        fetchCategory(state:any,action:any){
            state.categories = [...action.payload]
        }
    }
})
export const cateActions = category.actions


export default category