import { configureStore,createSlice } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import category from "./cateSlice";
import user from "./userSlice";
const initProduct = {
    product : []
}


const products = createSlice({
    name : 'products',
    initialState : initProduct,
    reducers : {
        fetchData(state:any,action:any){
            state.product = [...action.payload]
        }
    }
})
export const productAction = products.actions



const store = configureStore({
    reducer : {
        products : products.reducer,
        cart : cart.reducer,
        category : category.reducer,
        user : user.reducer
    }
})

export default store

