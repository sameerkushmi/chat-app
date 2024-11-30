import { UserSchema } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const getToken = (user) => {
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn: 900})
    const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN,{expiresIn: '7d'})
    return {accessToken,refreshToken}
}

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
        
        const newUser = new UserSchema({
            fullName,
            username,
            password,
            gender,
            profilePhoto: gender === 'male' ? maleProfilePhoto : femaleProfilePhoto
        })
        await newUser.save()

        const {accessToken,refreshToken} = getToken(newUser.toObject())

        res.cookie('at',accessToken,{
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.PROD === 'true' ? true: false,
            domain: process.env.USER_AGENT
        })
        res.cookie('rt',refreshToken,{
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.PROD === 'true' ? true: false,
            domain: process.env.USER_AGENT
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
                message: 'User not found',
                success: false
            })

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch)
            return res.status(400).json({
                message: 'Password Incorrect',
                success: false
            })

        res.clearCookie('at',)
        res.clearCookie('rt',)
        
        // create token
        const {accessToken,refreshToken} = getToken(user.toObject())

        res.cookie('at',accessToken,{
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.PROD === 'true' ? true: false,
            domain: process.env.USER_AGENT
        })
        res.cookie('rt',refreshToken,{
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.PROD === 'true' ? true: false,
            domain: process.env.USER_AGENT
        })

        res.json({
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
        res.clearCookie("at",{
            httpOnly:true,
            maxAge: 0,
            secure: process.env.PROD === 'true' ? true : false,
            domain : process.env.USER_AGENT
        })
        res.clearCookie("rt",{
            httpOnly:true,
            maxAge: 0,
            secure: process.env.PROD === 'true' ? true : false,
            domain : process.env.USER_AGENT
        })
        res.json({success : true})
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

       const {accessToken,refreshToken} = getToken(user.toObject())

        res.cookie('at',accessToken,{
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.PROD === 'true' ? true: false,
            domain: process.env.USER_AGENT
        })
        res.cookie('rt',refreshToken,{
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.PROD === 'true' ? true: false,
            domain: process.env.USER_AGENT
        })
        
        res.json({
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