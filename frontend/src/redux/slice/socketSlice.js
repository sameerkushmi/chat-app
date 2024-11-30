import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null
    },
    reducers: {
        setSocket : (state,actions)=>{
            state.socket = actions.payload
        }
    }
})

export const {setSocket} = socketSlice.actions
export default socketSlice.reducer