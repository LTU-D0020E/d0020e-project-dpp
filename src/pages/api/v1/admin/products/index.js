import { defaultHandler } from '@/utils/server/api-helpers'
import Product from '@/models/Product' // Ensure you have a Product model similar to Role

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 25
    const skip = (page - 1) * pageSize

    const products = await Product.find({}).skip(skip).limit(pageSize)
    const totalProducts = await Product.countDocuments()

    res.status(200).json({ products, totalProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const createProduct = async (req, res) => {
  try {
    // Add product-specific validation here
    // Example: if (!req.body.name) { return res.status(400).json({ message: 'Missing product name' }) }

    const product = await Product.create(req.body)
    res.status(201).json({ product })
  } catch (error) {
    console.error('Error creating product:', error)

    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation error', error: error.message })
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: 'Product already exists' })
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
      GET: getAllProducts,
      POST: createProduct,
    },
    {
      requiresAuth: false,
      requiresAdmin: true,
    }
  )

export default handler
