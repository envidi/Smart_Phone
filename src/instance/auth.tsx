import instance from "./instance";

const getOneUser = async (id:any)=>{
    
        const response = await instance.get(`users/${id}`)
        return response.data
    
}
const getAllUser = async ()=>{
    
    const response = await instance.get(`users`)
    return response.data.docs

}

const addUser = async (user:any)=>{

        const response = await instance.post(`users/signup`,user)    
        return response.data   
}
const signIn = async (user:any)=>{

    const response = await instance.post(`users/signin`,user) 
    return response.data   
}
const deleteUser = async (id:any)=>{
    
    const response = await instance.delete(`users/${id}`)
    return response.data

}
const editUser = async (id:any,value:any)=>{
    
    const response = await instance.patch(`users/${id}`,value)
    return response.data

}

export {
    addUser,getOneUser,signIn,getAllUser,deleteUser,editUser
}