import { defaultHandler } from '@/utils/server/api-helpers'
import { ObjectId } from 'mongodb'
import KeyDocument from '@/models/KeyDocument'
import { fetchDataFromIPFS } from '@/utils/server/ipfs-api-helpers'

const getProductByCid = async (req, res) => {
  console.log('heres the req', req.query)
  const { cid } = req.query
  try {
    console.log('heres the productid', cid)
    const documents = await KeyDocument.find({ cid: cid })

    // Fetch data from IPFS for each document CID
    const fetchPromises = documents.map(doc => {
      return new Promise((resolve, reject) => {
        fetchDataFromIPFS(doc.cid, (error, data) => {
          if (error) {
            reject(error)
          } else {
            // Attach the CID to the data object
            const responseData = {
              ...data,
              cid: doc.cid, // Include the CID in the response
            }
            resolve(responseData)
          }
        })
      })
    })

    // Resolve all promises to get the IPFS data
    const ipfsResults = await Promise.all(fetchPromises)

    res.status(200).json(ipfsResults)
  } catch (error) {
    console.error('Error during search:', error)
    res.status(500).json({ error: 'An error occurred during the search.' })
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
      GET: getProductByCid,
      PUT: addEventToProduct,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
