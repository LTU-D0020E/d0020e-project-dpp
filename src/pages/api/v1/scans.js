import { defaultHandler, unauthorized } from '@/utils/server/api-helpers'
import User from '@/models/User'
import Product from '@/models/Product'
import Scan from '@/models/Scans'

const postScans = async (req, res, session) => {
  console.log('Här är vår session: ', session)
  console.log('Här är vår request: ', req.query)

  if (!session) {
    return unauthorized(res)
  }

  const productId = await Product.findOne({})
  const fetchedUser = await User.findOne({ email: session.user.email })
  const fetchedUserId = fetchedUser._id.toString()

  console.log(productId)

  try {
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' })
    }

    // Create a new scan object
    const newScan = new Scan({
      user: fetchedUser._id,
      product: productId,
      // Add more fields if needed
    })

    // Save the scan object to the database
    await newScan.save()

    res.json({
      user: fetchedUser._id,
      product: newScan.product,
    })
  } catch (error) {
    console.error('Error creating scan:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const getScans = async (req, res, session) => {
  console.log('Här är vår session: ', session)
  console.log('Här är vår request: ', req.query)

  if (!session) {
    return unauthorized(res)
  }

  try {
    // Fetch the user based on the session
    const fetchedUser = await User.findOne({ email: session.user.email })
    if (!fetchedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Fetch scans related to the user
    const userScans = await Scan.find({ user: fetchedUser._id }).populate(
      'product'
    )

    res.json({
      user: fetchedUser._id,
      scans: userScans,
    })
  } catch (error) {
    console.error('Error fetching user scans:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      POST: postScans,
      GET: getScans,
    },
    {
      requiresAuth: true,
      requiresAdmin: false,
    }
  )

export default handler
