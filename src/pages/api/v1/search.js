import { defaultHandler } from '@/utils/server/api-helpers'
import Product from '@/models/Product'

const searchProducts = async (req, res) => {
  const { query } = req.query

  try {
    const products = await Product.find({
      $or: [
        {
          name: { $regex: query, $options: 'i' },
        },
        {
          'manufactured_by.owner_name': { $regex: query, $options: 'i' },
        },
      ],
    }).select('name dpp_class manufactured_by _id')

    res.status(200).json(products)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching search results' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: searchProducts,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
