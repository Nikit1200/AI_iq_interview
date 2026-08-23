import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            console.error('getCurrentUser: missing req.userId')
            return res.status(400).json({ message: 'Missing user id' })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json(user)
    } catch (error) {
        console.error('getCurrentUser error:', error)
        return res.status(500).json({ message: `failed to get currentUser` })
    }
}