import { createSlice } from "@reduxjs/toolkit";
const userInitialState = {
    user : {},
    roles : [
        {
            id : 1, 
            name : 'Admin'
        },
        {
            id : 2,
            name : 'Member'
        }
    ],
    users : []
}

const user = createSlice({
    name : "user",
    initialState:userInitialState,
    reducers : {
        fetchAllUser(state:any,action:any){
            state.users = [...action.payload]
        },
        fetchUser(state:any,action:any){
            state.user = {...action.payload}
        },
        logout(state:any){
            state.user = null
        }
    }
})
export const userActions = user.actions


export default user