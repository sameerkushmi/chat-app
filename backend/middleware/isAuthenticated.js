import jwt from "jsonwebtoken"

const isAuthenticated = async(req,res,next) => {
    try {
        const {token} = req.cookies
        if(!token)
            return res.status(401).json({message: 'Unauthorized'})

        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode)
            return res.status(401).json({message: 'Invalid token'})

        req.id = decode.userId
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} 

export default isAuthenticated