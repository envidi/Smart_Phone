import { CANCELLED } from "@/store/cartSlice";
import instance from "./instance";
const getCarts = async ()=>{
        const response = await instance.get('carts')
        return response.data
   
}
const getCartsByStatus = async ()=>{
    const response = await instance.get(`carts?cartStatus_ne=${CANCELLED}`)
    return response.data

}
const getProduct = async (id :any)=>{
    try {
        const response = await instance.get(`carts/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const addCart = async (cart :any)=>{
    
    const response = await instance.post(`carts`,cart)       
    return response.data              
}
const editCart = async (cart:any,id:any)=>{
    
    const response = await instance.patch(`carts/${id}`,cart)       
    return response.data              
}
const deleteCart = async (value:any,id :any)=>{
    
    const response = await instance.patch(`carts/${id}`,value)       
    return response.data              
}

export {
    getProduct,getCarts,addCart,deleteCart,getCartsByStatus,editCart
}