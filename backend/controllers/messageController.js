import { ConversationSchema } from "../models/conversationModel.js"
import { MessageSchema } from '../models/messageModel.js'
import {getReceiverSocketId, io} from '../socket/socket.js'

export const sendMessage = async(req,res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const {message} = req.body

        let gotConversation = await ConversationSchema.findOne({
            participants: {$all : [senderId, receiverId]}
        })

        if(!gotConversation){
            gotConversation = await ConversationSchema.create({
                participants : [senderId,receiverId]
            })
        }

        const newMessage = await MessageSchema.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            gotConversation.message.push(newMessage._id)
        } 

        await Promise.all([
            await gotConversation.save(),
            await newMessage.save()
        ])

        // socket io
        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }

        res.json({
           newMessage
        })
             
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getMessage = async(req,res) => {
    try {
        const receiverId = req.params.id
        const senderId = req.id
        const conversation = await ConversationSchema.findOne({
            participants: {$all: [senderId,receiverId]}
        }).populate('message')

        res.json(conversation)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}