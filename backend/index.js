import dotenv from 'dotenv/config'
import connectDB from './config/db.config.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {app,server} from './socket/socket.js'

// import routes
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'

const PORT = process.env.PORT || 8000

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))
app.use(cookieParser())

// routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1/message',messageRoute)

server.listen(PORT,()=>{
    connectDB()
    console.log(`Server listen at Port ${PORT}`)
})
