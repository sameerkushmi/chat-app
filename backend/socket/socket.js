import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:[process.env.CLIENT],
        methods:['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}; // {userId->socketId}

io.on('connection', (socket)=>{
    const {userId} = socket.handshake.query
    if(userId !== undefined) {
        userSocketMap[userId] = socket.id
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        delete userSocketMap[userId]
        io.emit('getOnlineUser',Object.keys(userSocketMap))
    })
})

export {app, io, server};