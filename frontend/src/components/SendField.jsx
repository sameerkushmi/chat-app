import { IoIosSend } from "react-icons/io";
import {Button, Form,Input, message} from 'antd'
import interceptor from "../lib/interceptor";
import { useDispatch, useSelector } from "react-redux";
import {setMessages} from '../redux/slice/messageSlice'

const http = interceptor()

const SendField = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const {selectorUser} = useSelector(store => store.user)
  const {messages} = useSelector(store => store.message)

  const sendMessage = async(value) => {
    try {
      const {data} = await http.post(`/api/v1/message/send/${selectorUser?._id}`,value)
      form.resetFields()
      dispatch(setMessages([...messages,data.newMessage]))
    } catch (error) {
      message.error(error.response.data.message)   
    }
  }

  return (
    <div className='px-6 bg-gray-200 pt-6'>
        <Form className='flex gap-2' onFinish={sendMessage} form={form}>
            <Form.Item className='flex-1' name="message" >
                <Input size='large' placeholder='Send message...' />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type='primary' size='large'>Send <IoIosSend/></Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default SendField