import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/slice/messageSlice"

const useGetRealtimeMessage = () => {
    const dispatch = useDispatch()
    const {socket} = useSelector(store => store.socket)
    const {messages} = useSelector(store => store.message)
    useEffect(()=>{
        socket?.on('newMessage', (newMessage) => {
            dispatch(setMessages([...messages,newMessage]))
        })
    },[socket,setMessages,messages])
}
export default useGetRealtimeMessage