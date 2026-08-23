import User from "../models/user.model.js"
import genToken from "../config/token.js"

export const googleAuth = async (req, res)=>{
    try{
        const { name, email } = req.body

        // Validate request body
        if (!name || !email) {
            console.error('googleAuth: missing name or email in request body', req.body)
            return res.status(400).json({ message: 'Missing name or email' })
        }

        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name,
                email
            })
        }

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json(user)

    } catch (error) {
        console.error('googleAuth error:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }

}

export const logOut  = async (req, res)=>{
    try{
        await res.clearCookie("token")
        return res.status(200).json({ message: "LogOut Successfully" })
    } catch(error){
        console.error('logOut error:', error)
        return res.status(500).json({ message: 'Internal server error' })

    }
}