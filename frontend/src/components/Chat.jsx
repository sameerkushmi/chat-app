import { useEffect } from "react"
import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar"
import { useNavigate } from "react-router-dom"
import interceptor from "../lib/interceptor"
import { useDispatch } from "react-redux"
import { setAuthUser } from "../redux/slice/userSlice"

const http = interceptor()

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    const checkAuth = async() => {
        try {
          const {data} = await http.get('/api/v1/user/refresh')
          dispatch(setAuthUser(data))
        } catch (error) {
          navigate('/login')
        }
    }
    checkAuth()
  },[])

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-screen flex justify-center items-center">
      <div className="flex rounded-lg overflow-hidden bg-white h-[90vh] w-9/12">
        <Sidebar/>
        <MessageContainer/>
      </div>
    </div>
  )
}

export default Chat