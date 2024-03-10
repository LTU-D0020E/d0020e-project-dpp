import { defaultHandler } from '@/utils/server/api-helpers'
import KeyDocument from '@/models/KeyDocument'
import { fetchDataFromIPFS } from '@/utils/server/ipfs-api-helpers'

const searchByCID = async (req, res) => {
  const { query } = req.query

  try {
    const regex = new RegExp('^' + query, 'i')
    const documents = await KeyDocument.find({ cid: { $regex: regex } })

    const fetchPromises = documents.map(doc => {
      return fetchDataFromIPFS(doc.cid)
        .then(data => ({ ...data, cid: doc.cid })) // Attach the CID here
        .catch(error => ({ error: error.message, cid: doc.cid }))
    })

    const ipfsResults = await Promise.all(fetchPromises)

    const successfulResults = ipfsResults.filter(result => !result.error)
    const errorResults = ipfsResults.filter(result => result.error)

    res.status(200).json({
      successful: successfulResults,
      errors: errorResults,
    })
  } catch (error) {
    console.error('Error during search:', error)
    res.status(500).json({ error: 'An error occurred during the search.' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: searchByCID,
    },
    {
      requiresAuth: false,
      requiresAdmin: false,
    }
  )

export default handler
