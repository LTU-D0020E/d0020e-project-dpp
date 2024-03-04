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

const getPrivByPub = async (req, res) => {
  const { publicKey } = req.query
  console.log(publicKey)
  try {
    const doc = await KeyDocument.findOne({
      $or: [
        { 'remanufacturing_events.publickey': publicKey },
        { 'shipping.publickey': publicKey },
        { 'makes.publickey': publicKey },
        { 'made_from.publickey': publicKey },
      ],
    })
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: 'Matching public key not found.' })
    }

    // Extract the private key from the matching field
    let privateKey
    if (doc.remanufacturing_events.publickey === publicKey) {
      privateKey = doc.remanufacturing_events.privatekey
    } else if (doc.shipping.publickey === publicKey) {
      privateKey = doc.shipping.privatekey
    } else if (doc.makes.publickey === publicKey) {
      privateKey = doc.makes.privatekey
    } else if (doc.made_from.publickey === publicKey) {
      privateKey = doc.made_from.privatekey
    }

    res.status(200).json({ success: true, privateKey })
  } catch (error) {
    console.error('Error fetching private key:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      POST: createKeypair,
      GET: getPrivByPub,
    },
    {
      requiresAuth: true,
      requiresAdmin: false,
    }
  )

export default handler
