import { defaultHandler, unauthorized } from '@/utils/server/api-helpers'
import User from '@/models/User'

const getCurrentUser = async (req, res, session) => {
  console.log('Här är vår session: ', session)
  console.log('Här är vår request: ', req.query)

  if (!session) {
    return unauthorized(res)
  }

  const fetchedUser = await User.findOne({ email: session.user.email })
  const fetchedUserId = fetchedUser._id.toString()

  try {
    if (fetchedUserId !== req.query.userid) {
      return res.status(401).json({ message: 'Session matchar inte ID' })
    }

    const user = await User.findById(req.query.userid)

    console.log('vår user ', user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      //password: user.password,
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
      GET: getCurrentUser,
    },
    {
      requiresAuth: true,
      requiresAdmin: false,
    }
  )

export default handler
