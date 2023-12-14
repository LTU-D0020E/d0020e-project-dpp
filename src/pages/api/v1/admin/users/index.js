import { defaultHandler } from '@/utils/server/api-helpers'
import User from '@/models/User'

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 25
    const skip = (page - 1) * pageSize

    const users = await User.find({}).skip(skip).limit(pageSize)
    const totalUsers = await User.countDocuments()

    res.status(200).json({ users, totalUsers })
  } catch (error) {
    console.error('Error fetching users:', error)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: getAllUsers,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
