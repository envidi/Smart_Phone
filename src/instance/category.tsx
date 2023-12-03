import instance from "./instance";

const getCategories = async ()=>{
    try {
        const response = await instance.get('category')
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const getCategory = async (id :any)=>{
    try {
        const response = await instance.get(`category/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const addCategory = async (value :any)=>{
    const response = await instance.post(`category`,value)
    return response.data

}
const editCategory = async (id :any,value:any)=>{
            
            const response = await instance.patch(`category/${id}`,value)
            return response.data
}
const deleteCategory = async (id :any)=>{
    const response = await instance.delete(`category/${id}`,)
    return response.data

}

export {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
}