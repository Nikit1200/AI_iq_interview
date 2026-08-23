import jwt from "jsonwebtoken"

export const optionalAuth = (req, res, next) => {
    const cookieToken = req.cookies.token;
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null;
    const token = cookieToken || bearerToken;
    if (!token) return next();

    try {
        req.userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch {
        // A missing or expired session is anonymous for session-status checks.
    }
    next();
};

const isAuth = async (req, res, next)=>{
    try{
        const cookieToken = req.cookies.token;
        const bearerToken = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.slice(7)
            : null;
        const token = cookieToken || bearerToken;

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
