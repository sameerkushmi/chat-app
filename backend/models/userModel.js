import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profilePhoto: {
        type: String,
        default: '',
        trim: true
    },
    gender: {
        type: String,
        emum: ['male','female'],
        required: true
    }
},{timestamps: true})

userModel.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password.toString(),12)
    next()
})

export const UserSchema = mongoose.model('User',userModel)