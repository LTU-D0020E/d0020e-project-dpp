import { defaultHandler } from '@/utils/server/api-helpers'
import { ObjectId } from 'mongodb'
import Product from '@/models/Product'

const getProductById = async (req, res) => {
  console.log('heres the req', req.query)
  try {
    const { productID } = req.query
    console.log('heres the productid', productID)
    if (!ObjectId.isValid(productID)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }

    const productData = await Product.findOne({ _id: new ObjectId(productID) })

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

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: getProductById,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
