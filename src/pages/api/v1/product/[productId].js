import { defaultHandler } from '@/utils/server/api-helpers'
import { ObjectId } from 'mongodb'
import Product from '@/models/Product'

const getProductById = async (req, res) => {
  console.log('heres the req', req.query)
  try {
    const { productId } = req.query
    console.log('heres the productid', productId)
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }

    const productData = await Product.findOne({ _id: new ObjectId(productId) })

    if (!productData) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(productData)
  } catch (error) {
    console.error('Error fetching product:', error)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const addEventToProduct = async (req, res) => {
  const { productId } = req.query
  const event = req.body // The incoming event data
  console.log('api prodid', productId)

  // Validate productId
  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  // Ensure the event has a creation_time as Date object
  if (event.creation_time) {
    event.creation_time = new Date(event.creation_time)
  } else {
    // Optionally set creation_time to now if not provided
    event.creation_time = new Date()
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $push: { 'event_trail.events': event } },
      { new: true } // Option to return the document after update
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(updatedProduct)
  } catch (error) {
    console.error('Error adding event to product:', error)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: getProductById,
      PUT: addEventToProduct,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
