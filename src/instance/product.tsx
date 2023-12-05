import { uploadFile } from "@/lib/utils";
import instance from "./instance";

const getProducts = async ()=>{
    
        const response = await instance.get('products')
        return response.data.docs
    
}
const getProduct = async (id :any)=>{
        const response = await instance.get(`products/${id}`)
        return response.data
   
}
const addProduct = async (value :any)=>{
        const uploadedImage = await uploadFile(value.image)
        const newProduct = {...value, image : uploadedImage}
        const response = await instance.post(`products`,newProduct)
        return response.data
   
}
const editProduct = async (id :any,value:any)=>{
        if( typeof value.image !== 'string'){

                const uploadedImage = await uploadFile(value.image)
                const newProduct = {...value, image : uploadedImage}
                const response = await instance.patch(`products/${id}`,newProduct)
                return response.data
        }
       
        const response = await instance.patch(`products/${id}`,value)
        return response.data

   
}
const deleteProduct = async (id :any)=>{
        const response = await instance.delete(`products/${id}`,)
        return response.data
   
}

export {
    getProduct,getProducts,addProduct,deleteProduct,editProduct
}