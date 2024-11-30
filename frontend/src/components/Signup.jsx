import { Link } from "react-router-dom"
import { Button, Form,Input, Select, message } from 'antd'
import interceptor from '../lib/interceptor'
import { useNavigate } from "react-router-dom"

const http = interceptor()
 
const Signup = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const handleSubmit = async(values) => {
        try{
            const {data} = await http.post('/api/v1/user/register',values)
            navigate('/chat')
            form.resetFields()
            message.success(data.message)
        }catch(error){
            message.error(error.response.data.message)
        }
    }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-screen flex justify-center items-center">
        <div className="flex w-8/12 shadow"> 
            <div className="text-white px-10 space-y-4 flex flex-col justify-center items-center text-center bg-blue-700 w-6/12 rounded-tl-lg rounded-bl-lg">
                <h1 className="text-2xl font-bold">Come Join us</h1>
                <p>
                    We are so excited to have you here. if you haven't already. create an account to get access 
                    exclusive offers, rewards, and discounts. 
                </p>

                <Link to="/login" className="px-8 py-3 rounded-2xl bg-blue-800">Already have an account? Signin</Link>
            </div>
            <div className="py-6 px-14 bg-white rounded-tr-lg rounded-br-lg w-6/12">
                <h1 className="font-bold text-3xl text-center text-black mb-3">Register</h1>
                <Form 
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name='fullName'
                        rules={[{required: true}]}
                        label="Fullname"
                    >
                        <Input placeholder="Enter your name here" />
                    </Form.Item>
                    <Form.Item
                        name='username'
                        rules={[{required: true}]}
                        label="Username"
                    >
                        <Input placeholder="Username will be unique" />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{required: true}]}
                        label="Password"
                    >
                        <Input.Password placeholder="******" />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        rules={[{required: true}]}
                        label="Confirm Password"
                    >
                        <Input.Password placeholder="******" />
                    </Form.Item>
                    <Form.Item
                        name='gender'
                        rules={[{required: true}]}
                        label="Gender"
                    >
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" className="w-full" >Register</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default Signup