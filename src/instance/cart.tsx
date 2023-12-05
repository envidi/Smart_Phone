import instance from "./instance";
const getCarts = async ()=>{
        const response = await instance.get('carts')
        return response.data.docs
   
}
const getCartsByStatus = async ()=>{
    const response = await instance.get(`carts/status`)
    return response.data.docs

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
    console.log(id)
    
    const response = await instance.patch(`carts/delete/${id}`,value)       
    return response.data              
}

export {
    getProduct,getCarts,addCart,deleteCart,getCartsByStatus,editCart
}