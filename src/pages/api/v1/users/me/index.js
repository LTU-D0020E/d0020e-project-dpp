import { defaultHandler } from '@/utils/server/api-helpers'
import User from '@/models/User'

// Define handleSignup before using it in the handler
const getCurrentUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('user already exists')
      return res.status(409).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role, // or set a default role if not provided
      admin: false, // Set admin to false by default
    })

    // Save the user
    await user.save()

    // // Generate a JWT token
    // const authToken = generateAuthToken(user); // Implement this function to generate a token

    // Respond with success and include the token in the response
    return res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ message: 'Internal server error' })
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
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
