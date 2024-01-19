import { defaultHandler } from '@/utils/server/api-helpers'
import User from '@/models/User'

// Define handleSignup before using it in the handler
const updateAdmin = async (req, res) => {
  try {
    const user = req.body

    const { _id: userId, admin: isAdmin } = user

    if (!userId || isAdmin === undefined) {
      return res.status(400).json({ message: 'Missing required params' })
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { admin: isAdmin },
      { new: true }
    )

    if (!updateUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating admin status:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      PUT: updateRole,
    },
    {
      requiresAuth: false,
      requiresAdmin: true,
    }
  )

export default handler
