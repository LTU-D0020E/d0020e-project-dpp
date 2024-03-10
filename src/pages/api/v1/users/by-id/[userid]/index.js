import User from '@/models/User'
import { defaultHandler } from '@/utils/server/api-helpers'

const getById = async (req, res) => {
  try {
    const user = await User.findById(req.query.userid)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: getById,
    },
    {
      requiresAuth: true,
      requiresAdmin: false,
    }
  )

export default handler
