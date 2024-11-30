import jwt from 'jsonwebtoken'

const refreshMiddleware = (req,res,next) => {
    try {
        const {rt} = req.cookies
        if(!rt){
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
            return res.status(400).send('bad request')
        }

        const user = jwt.verify(rt,process.env.REFRESH_TOKEN)
        if(!user){
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
            return res.status(400).send('bad request')
        }

        req.id = user._id
        next()

    } catch (error) {
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
        res.status(500).json({
            success: false
        })
    }
}   
export default refreshMiddleware