import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import messageSlice from './slice/messageSlice'
import socketSlice from './slice/socketSlice'

const store = configureStore({
    reducer:{
        user: userSlice,
        message: messageSlice,
        socket: socketSlice
    }
})

export default store