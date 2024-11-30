import { useEffect} from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setSocket} from "./redux/slice/socketSlice.js"
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'
import io from 'socket.io-client'
import { setOnlineUsers } from './redux/slice/userSlice.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Signup/>
  },
  {
    path: '/chat',
    element: <Chat/>
  }
])

const App = () => {
  const {authUser} = useSelector(store => store.user)
  const {socket} = useSelector(store => store.socket)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(authUser){
      const socket = io('http://localhost:8080',{
        query: {
          userId: authUser._id
        }
      })

      dispatch(setSocket(socket))

      socket?.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=> socket.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  },[authUser])

  return (
      <RouterProvider router={router} />
  )
}

export default App