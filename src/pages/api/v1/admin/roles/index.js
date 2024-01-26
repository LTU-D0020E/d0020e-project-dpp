import { defaultHandler } from '@/utils/server/api-helpers'
import Role from '@/models/Role'

const getAllRoles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 25
    const skip = (page - 1) * pageSize

    const roles = await Role.find({}).skip(skip).limit(pageSize)
    const totalRoles = await Role.countDocuments()

    res.status(200).json({ roles, totalRoles })
  } catch (error) {
    console.error('Error fetching roles:', error)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const createRole = async (req, res) => {
  try {
    // Basic validation (can be more complex depending on requirements)
    if (!req.body.name || !req.body.decryption_key) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const role = await Role.create(req.body)
    res.status(201).json({ role })
  } catch (error) {
    console.error('Error creating role:', error)

    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation error', error: error.message })
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: 'Role already exists' })
    }

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
      GET: getAllRoles,
      POST: createRole,
    },
    {
      requiresAuth: false,
      requiresAdmin: true,
    }
  )

export default handler
