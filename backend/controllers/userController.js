import { UserSchema } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const register = async(req,res) => {
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body

        // check empty field
        if(!fullName || !username || !password || !confirmPassword || !gender)
            return res.status(400).json({
                message: 'All field are required',
            })

        // password matching
        if(password !== confirmPassword)
            return res.status(400).json({
                message: 'Password do not matched',
            })

        const user = await UserSchema.findOne({username})
        if(user)
            return res.status(400).json({
                message: 'username already exist please try different username',
            })

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        await UserSchema.create({
            fullName,
            username,
            password,
            gender,
            profilePhoto: gender === 'male' ? maleProfilePhoto : femaleProfilePhoto
        })

        res.json({
            message : "Account Created!",
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const login = async(req,res) => {
    try {
        const {username,password} = req.body

        // field required
        if(!username || !password)
            return res.status(400).json({
                message: 'All field are required',
            })
        
        const user = await UserSchema.findOne({username})
        if(!user)
            return res.status(404).json({
                message: 'username is not exist',
                success: false
            })

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch)
            return res.status(400).json({
                message: 'Password Incorrect',
                success: false
            })
        
        // create token
        const tokenData = {
            userId : user._id
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn: '7d'})

        res.cookie('token',token,{
            httpOnly: true,
            maxAge: 86400000,
            sameSite: 'strict',
            secure: process.env.PROD === 'true' ? true : false,
            domain: process.env.USER_AGENT  
        }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const logout = async(req,res) => {
    try {
        res.cookie('token','',{maxAge: 0}).json({
            message: 'logged out successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getOtherUsers = async(req,res) => {
    try {
        const loggedInUserId = req.id
        const otherUsers = await UserSchema.find({_id:{$ne: loggedInUserId}},{password: 0})
        res.json(otherUsers)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })   
    }
}

export const refreshToken = async(req,res) => {
    try {
        const id = req.id
        const user = await UserSchema.findById(id)
        
        if(!user) 
            return res.status(400).send("bad request")

        // create token
        const tokenData = {
            userId : user._id
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn: '7d'})

        res.cookie('token',token,{
            httpOnly: true,
            maxAge: 86400000,
            sameSite: 'strict',
            secure: process.env.PROD === 'true' ? true : false,
            domain: process.env.USER_AGENT  
        }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
} 