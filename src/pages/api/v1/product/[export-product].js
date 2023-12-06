import { defaultHandler } from '@/utils/server/api-helpers'
import { connectToDatabase } from '@/utils/server/db'
import { ObjectId } from 'mongodb'
import { Product, productSchema } from '@/models/Product'
import { data } from 'autoprefixer'

// Define handleSignup before using it in the handler
/*const getProduct = async (req, res) => {
  try {
    

     Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)
    

    // new instance of product
    const product = new Product({
      _id,
      id,
      name,
      dpp_class,
      creation_time,
      privacy,
      admin: false, // Set admin to false by default
    })
    

    // Save the user
    // await user.save()

    // Respond with success
    const { _id } = req.query

    const productData =[id,data] 
    
    return res.status(200).json({ message: 'product displayed successfully' })
  } catch (error) {
    console.error('Error fetching product data:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: getProduct,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
*/

/*export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const db = await connectToDatabase()

  switch (method) {
    case 'GET':
      try {
        const data = await productSchema.findOne({ _id: ObjectId(id) })

        if (!data) {
          return res.status(404).json({ message: 'Data not found' })
        }

        res.status(200).json(data)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}*/

const getProduct = async (req, res) => {
  try {
    const {
      query: { id },
    } = req

    const productData = await Product.findOne({ _id: ObjectId(id) })
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
      GET: getProduct,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
