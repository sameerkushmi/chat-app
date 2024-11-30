import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser : null,
        otherUsers: null,
        selectorUser: null,
        onlineUsers: null
    },
    reducers: {
        setAuthUser : (state,action)=> {
            state.authUser = action.payload
        },
        setOtherUsers: (state,action) => {
            state.otherUsers = action.payload
        },
        setSelectorUser: (state,action) => {
            state.selectorUser = action.payload
        },
        setOnlineUsers: (state,action) => {
            state.onlineUsers = action.payload
        }
    }
})

export const { setAuthUser, setOtherUsers,setSelectorUser, setOnlineUsers} = userSlice.actions
export default userSlice.reducer