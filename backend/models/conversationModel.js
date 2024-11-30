import mongoose, { mongo } from "mongoose";

const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    message: [{
        type: mongoose.Types.ObjectId,
        ref: 'Message',
    }]
},{timestamps: true})

export const ConversationSchema = mongoose.model('Conversation',conversationModel)