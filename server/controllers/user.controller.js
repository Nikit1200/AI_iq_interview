import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(200).json(null)
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(200).json(null)
        }

        return res.status(200).json(user)
    } catch (error) {
        console.error('getCurrentUser error:', error)
        return res.status(500).json({ message: `failed to get currentUser` })
    }
}
