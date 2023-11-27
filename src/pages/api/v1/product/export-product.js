import { connectToDatabase } from '@/utils/server/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('Testdata')
    const data = await collection.find({}).toArray()

    res.status(200).json(data)
  } catch (error) {
    console.error('Error connecting to database:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
