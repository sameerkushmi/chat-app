import axios from 'axios'

const interceptor = () => {
    const fetcher = axios.create({
        baseURL: 'http://localhost:8080',
        headers : {'Content-Type': "application/json"},
        withCredentials: true
    })

    return fetcher
}
export default interceptor