import { defaultHandler } from '@/utils/server/api-helpers'
import { verifyPassword } from '@/utils/server/auth'
import { generateAuthToken } from '@/utils/server/auth' // Import the token generation function
import { hashPassword } from '@/utils/server/auth'
import User from '@/models/User'

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find the user by their email
    const user = await User.findOne({ email })

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Compare the provided password with the hashed password in the database
    const hashedPasswordInput = hashPassword(password)
    console.log("user", user)
    console.log("hash", hashedPasswordInput)
    const passwordMatch = await verifyPassword(hashedPasswordInput, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // If the password is correct, generate an authentication token
    const token = generateAuthToken(user)

    // Respond with the token or user data, depending on your authentication flow
    return res.status(200).json({ token })
  } catch (error) {
    console.error('Error signing in:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      POST: signInUser,
    },
    {
      requiresAuth: false, // Since this is the sign-in endpoint, authentication is not required
      requiresAdmin: false,
    }
  )

export default handler
