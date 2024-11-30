import { useEffect } from "react"
import interceptor from "../lib/interceptor"
import {useDispatch, useSelector} from 'react-redux'
import { setOtherUsers } from "../redux/slice/userSlice"
import { message } from "antd"

const http = interceptor()

const getOtherUsers = () => {
  const dispatch = useDispatch()
  const {otherUsers} = useSelector(store => store.user)

  useEffect(()=>{
    const fetchOtherUsers = async()=>{
        try {
            const {data} = await http.get('/api/v1/user')
            dispatch(setOtherUsers(data))
        } catch (error) {
            message.error(error.response.data.message)
        }
    }   
    fetchOtherUsers()
  },[otherUsers])

}

export default getOtherUsers