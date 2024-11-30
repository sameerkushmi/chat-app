import { useEffect } from "react"
import {message} from 'antd'
import interceptor from "../lib/interceptor"
import { useDispatch, useSelector } from "react-redux"
import {setMessages} from '../redux/slice/messageSlice'

const http = interceptor()

const getMessages = () => {
    const dispatch = useDispatch()
    const {selectorUser} = useSelector(store => store.user)
    const {messages} = useSelector(store => store.message)

  useEffect(()=>{
    const fetchMessages = async() => {
        try {
            const {data} = await http.get(`/api/v1/message/${selectorUser._id}`)
            dispatch(setMessages(data))
        } catch (error) {
            message.error(error.respone.data.message)
        }
    }
    fetchMessages()
  },[selectorUser,messages])
}

export default getMessages