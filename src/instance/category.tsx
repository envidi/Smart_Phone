import instance from "./instance";

const getCategories = async ()=>{
    try {
        const response = await instance.get('categories')
        return response.data.docs
    } catch (error) {
        console.log(error)
    }
}
const getCategory = async (id :any)=>{
    try {
        const response = await instance.get(`categories/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const addCategory = async (value :any)=>{
    const response = await instance.post(`categories`,value)
    return response.data

}
const editCategory = async (id :any,value:any)=>{
            
            const response = await instance.patch(`categories/${id}`,value)
            return response.data
}
const deleteCategory = async (id :any)=>{
    const response = await instance.delete(`categories/${id}`,)
    return response.data

}

export {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
}