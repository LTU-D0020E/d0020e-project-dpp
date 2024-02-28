import { defaultHandler } from '@/utils/server/api-helpers'

const postScans = async (req, res, session) => {}

const getScans = async (req, res, session) => {}

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
