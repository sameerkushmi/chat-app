import {Button, Form, Input, message} from 'antd'
import { FaSearch } from "react-icons/fa";
import Otheruser from './Otheruser';
import interceptor from '../lib/interceptor';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/slice/userSlice';

const http = interceptor()

const Sidebar = () => {
    const navigate = useNavigate()
    const {otherUsers} = useSelector(store => store.user)
    const dispatch = useDispatch()

    const logout = async() => {
        try {
            const {data} = await http.get('/api/v1/user/logout')
            dispatch(setAuthUser(null))
            message.success(data.message)
            navigate('/login')
        } catch (error) {
            message.error(error.response.data.message)
        }
    }

    const searchSubmitHandler = ({search}) => {
        const conversationUsers = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()))
        if(conversationUsers){
            dispatch(setOtherUsers([conversationUsers]))
        }else{
            message.error('user not found')
            dispatch(setOtherUsers([otherUsers]))
        }
    }

  return (
    <div className='border-r border flex flex-col py-3 shadow'>
        <Form className='px-4' onFinish={searchSubmitHandler}>
            <Form.Item name="search">
                <Input placeholder='Search...' required className='w-[250px]' suffix={<Button htmlType='submit' type='text'><FaSearch/></Button>}/>
            </Form.Item>
            <hr />
        </Form>
        <div className='flex-1 overflow-auto px-2 mb-2'>
            <Otheruser/>
        </div>
        <div className='px-2'>
            <Button danger className='w-full' size='large' type='primary' onClick={logout}>Log Out</Button>
        </div>
    </div>
  )
}

export default Sidebar