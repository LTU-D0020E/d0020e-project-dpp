import { defaultHandler } from '@/utils/server/api-helpers'
import Role from '@/models/Role'

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({}).select('name')

    // Extract just the names from the roles
    const roleNames = roles.map(role => role.name)

    res.status(200).json({ roles: roleNames })
  } catch (error) {
    console.error('Error fetching roles:', error)
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
    },
    {
      requiresAuth: false,
      requiresAdmin: true,
    }
  )

export default handler
