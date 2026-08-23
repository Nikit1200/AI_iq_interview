import jwt from "jsonwebtoken"

const isAuth = async (req, res, next)=>{
    try{
        let {token} = req.cookies

        if(!token){
            return res.status(401).json({message:"Authentication is required"})
        }

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        if(!verifyToken){
            return res.status(401).json({message:"Authentication is required"})
        }
        req.userId = verifyToken.userId
        next()
    } catch(error){
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({message:"Your session has expired. Please sign in again."})
        }
        return res.status(500).json({message:"Unable to verify authentication"})
    }
}

export default isAuth
