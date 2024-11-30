import { Link, useNavigate } from "react-router-dom"
import { Button, Form,Input, message } from 'antd'
import interceptor from "../lib/interceptor"
import { useDispatch } from "react-redux"
import { setAuthUser } from "../redux/slice/userSlice"

const http = interceptor()

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async(value) => {
    try {
      const {data} = await http.post('/api/v1/user/login',value)
      dispatch(setAuthUser(data))
      navigate('/chat')
      message.success('Login successfully')
    } catch (error) {
      message.error(error.response.data.message)
    }
}

return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-screen flex justify-center items-center">
        <div className="flex w-8/12 shadow h-[80vh]"> 
            <div className="text-white py-10 px-10 flex flex-col justify-center items-center text-center bg-blue-700 w-6/12 rounded-tl-lg rounded-bl-lg">
                <p>Nice to see you again</p>
                <h1 className="text-5xl font-bold mb-6">Welcom Back</h1>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, veniam corrupti nobis, sunt sint in et reiciendis quo inventore, omnis quidem at qui cupiditate aut necessitatibus accusamus totam. Veritatis, magni.</p>
                <Link to="/register" className="px-8 py-3 rounded-2xl bg-blue-800">Don't have an account? Signup</Link>
            </div>
            <div className="px-16 flex flex-col items-center justify-center bg-white rounded-tr-lg rounded-br-lg w-6/12">
                <h1 className="font-bold text-3xl text-center text-black mb-3">Register</h1>
                <Form 
                    className="w-full"
                    layout="vertical"
                    onFinish={handleSubmit}
                >
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
                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" className="w-full" >Login</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
)
}


export default Login