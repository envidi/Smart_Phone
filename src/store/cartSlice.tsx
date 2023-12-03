import { createSlice } from "@reduxjs/toolkit";
export const PENDING = 'Pending Confirmation'
export const PROCESS = 'Processing'
export const COMPLETED = 'Completed'
export const CANCELLED = 'Cancelled'
export const DELETED = 'Deleted'
const cartInitialState = {
    carts : [],
    statusCart : [PENDING,PROCESS,COMPLETED,CANCELLED,DELETED]
}


const cart = createSlice({
    name : "cart",
    initialState:cartInitialState,
    reducers : {
        increase(state:any,action:any){
            const isExistingCart = state.carts.find((cart:any)=>{
                return cart.id_product === action.payload.id_product
            })
            if(isExistingCart) {
                state.carts = state.carts.map((cart:any)=>{
                    if(cart.id_product === action.payload.id_product) {
                        return {
                            ...cart,
                            quantity : cart.quantity + 1,
                            total : (cart.quantity + 1) * cart.price
                        }
                    }
                    return cart
                })
            }else{
                const actPL = action.payload
                state.carts = [...state.carts,{...actPL, total : actPL.quantity * actPL.price}]
            }
        },
        decrease(state:any,action:any){
            if(action.payload.name === "DELETE_ONE"){
                state.carts = state.carts.filter((cart:any)=>{
                    return cart.id_product !== action.payload.id
                })
                return 
            }
            const isExistingCart = state.carts.find((cart:any)=>{
                return cart.id_product === action.payload.id_product
            })
            if(isExistingCart.quantity <= 1){
                state.carts = state.carts.filter((cart:any)=>{
                    return cart.id_product !== action.payload.id_product
                })
            }else{
                state.carts = state.carts.map((cart:any)=>{
                    if(cart.id_product === action.payload.id_product){
                        return {
                            ...cart,
                            quantity : cart.quantity - 1,
                            total : (cart.quantity - 1) * cart.price
                        }
                    }
                    return cart
                })
            }
        },
        resetCart(state:any){
            state.carts = []
        }
    }
})

export const cartAction = cart.actions

export default cart