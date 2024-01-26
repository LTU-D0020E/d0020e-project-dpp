import { defaultHandler } from '@/utils/server/api-helpers'
import User from '@/models/User'

const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body

    if (!userId || !role || userId.trim() === '' || role.trim() === '') {
      return res
        .status(400)
        .json({ message: 'Missing or empty required parameters' })
    }

    // Find the user by ID and update their role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User role updated successfully', user: updatedUser })
  } catch (error) {
    console.error('Error updating user role:', error)
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
      requiresAuth: true,
      requiresAdmin: true,
    }
  )

export default handler
