import { defaultHandler } from '@/utils/server/api-helpers'
import KeyDocument from '@/models/KeyDocument'

const createKeypair = async (req, res) => {
  const { cid, remanufacturing_events, shipping, makes, made_from } = req.body
  try {
    const newKeyDocument = new KeyDocument({
      cid,
      remanufacturing_events,
      shipping,
      makes,
      made_from,
    })

    await newKeyDocument.save()

    res
      .status(201)
      .json({ success: true, message: 'Keys stored successfully', cid })
  } catch (error) {
    console.error('Error storing keys:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      POST: createKeypair,
    },
    {
      requiresAuth: true,
      requiresAdmin: false,
    }
  )

export default handler
