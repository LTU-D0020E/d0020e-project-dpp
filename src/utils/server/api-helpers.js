import { connectToDatabase, objectToFieldUpdates } from '@/utils/server/db'
import { getServerSession } from 'next-auth'

export const DEFAULT_AUTHORIZER = async (options, req, session) => {
  if (options.requiresAuth || options.requiresAdmin) {
    if (!session || !session.user) return false

    if (options.requiresAdmin && !session.user.admin) return false
  }

  return true
}

const DEFAULT_GLOBAL_OPTIONS = {
  requiresAuth: true,
  requiresAdmin: false,
  authorizer: DEFAULT_AUTHORIZER,
}

const DEFAULT_METHOD_OPTIONS = {
  requiresAuth: true,
  requiresAdmin: false,
  authorizer: DEFAULT_AUTHORIZER,
}

export const defaultHandler = async (
  req,
  res,
  handlers = {
    GET: null,
    POST: null,
    DELETE: null,
    OPTIONS: null,
  },
  options = DEFAULT_GLOBAL_OPTIONS
) => {
  const allowedMethods = Object.entries(handlers).filter((k, v) => v != null)
  const method = req.method
  if ((!method) in allowedMethods)
    return methodNotAllowed(req, res, allowedMethods)

  try {
    await connectToDatabase()
    const handler = handlers[method]
    const session = await getServerSession(req, res, authOptions)
    // default handlers might override options, including authorizer
    if (handler.name === '__defaultFn') {
      return handler(req, res, session)
    }

    // Custom methods can benefit from handler options
    if (
      options.authorizer &&
      !(await options.authorizer(options, req, session))
    ) {
      return unauthorized(res)
    }
    return handler(req, res, session)
  } catch (err) {
    console.error(err)
    return internalError(res)
  }
}

export const defaultGet = (entity, idSlug = 'id', options = {}) => {
  options = {
    ...DEFAULT_GLOBAL_OPTIONS,
    ...DEFAULT_METHOD_OPTIONS,
    renderer: (obj, session) => {
      delete obj['__v']
      return obj
    },
    ...options,
  }
  return async (req, res, session) => {
    if (
      options.authorizer &&
      !(await options.authorizer(options, req, session))
    ) {
      return unauthorized(res)
    }
    const id = req.query[idSlug]
    await connectToDatabase()
    let object = await entity.findById(id).lean()
    if (object) {
      if (options.renderer) object = await options.renderer(object, session)
      return successWithJson(res, object)
    }
    return notFound(res)
  }
}

export const defaultUpdate = (
  entity,
  idSlug = 'id',
  options = {},
  callback = null
) => {
  options = {
    ...DEFAULT_GLOBAL_OPTIONS,
    ...DEFAULT_METHOD_OPTIONS,
    filter: (obj, req, session) => {
      delete obj['_id']
      return obj
    },
    ...options,
  }

  const __defaultFn = async (req, res, session) => {
    if (
      options.authorizer &&
      !(await options.authorizer(options, req, session))
    ) {
      return unauthorized(res)
    }

    const id = req.query[idSlug]
    let body = req.body

    delete body._id // id changes are not allowed

    if (body && options.filter) {
      body = await options.filter(body, req, session)
    }

    const updates = objectToFieldUpdates(body)
    console.log('Applying updates', updates)
    const result = await entity.updateOne(
      { _id: id },
      {
        $set: updates.set,
        $unset: updates.unset,
      }
    )
    if (result.matchedCount === 0) return notFound()

    if (callback) {
      try {
        const updated = await entity.findById(id)
        callback(updated)
      } catch (e) {
        console.error('Delete entity callback failed', e)
      }
    }

    return successWithMessage(res, 'Updated')
  }
  return __defaultFn
}

export const defaultDelete = (
  entity,
  idSlug = 'id',
  options = {},
  callback = null
) => {
  options = {
    ...DEFAULT_GLOBAL_OPTIONS,
    ...DEFAULT_METHOD_OPTIONS,
    ...options,
  }

  const __defaultFn = async (req, res, session) => {
    if (
      options.authorizer &&
      !(await options.authorizer(options, req, session))
    ) {
      return unauthorized(res)
    }
    const id = req.query[idSlug]
    const deleted = await entity.findByIdAndDelete(id)
    if (callback) {
      try {
        callback(deleted)
      } catch (e) {
        console.error('Delete entity callback failed', e)
      }
    }
    return successWithMessage(res, 'Deleted')
  }
  return __defaultFn
}

export const defaultCreate = (entity, options = {}, callback = null) => {
  options = {
    ...DEFAULT_GLOBAL_OPTIONS,
    ...DEFAULT_METHOD_OPTIONS,
    ...options,
  }
  const __defaultFn = async (req, res, session) => {
    if (
      options.authorizer &&
      !(await options.authorizer(options, req, session))
    ) {
      return unauthorized(res)
    }
    let newObj = req.body
    if (newObj && options.filter) {
      newObj = options.filter(newObj, req, session)
    }
    let obj = await entity.create(newObj)
    if (obj && options.renderer) {
      obj = options.renderer(obj, session)
    }
    if (callback) {
      try {
        callback(obj)
      } catch (e) {
        console.error('Create entity callback failed', e)
      }
    }
    return successWithJson(res, obj)
  }
  return __defaultFn
}

export const successWithMessage = (res, message = '') => {
  return res.status(200).json({
    success: true,
    message: message,
  })
}

export const successWithJson = (res, jsonResponse) => {
  return res.status(200).json(jsonResponse)
}

export const failure = (res, code, errorMessage, errors = []) => {
  return res.status(code).json({
    success: false,
    message: errorMessage,
    errors: errors,
  })
}

export const invalidRequest = (res, message = 'Invalid request') => {
  return failure(res, 400, message)
}

export const invalidRequestWithDetails = (
  res,
  message = 'Invalid request',
  errors = []
) => {
  return failure(res, 400, message, errors)
}

export const unauthorized = (res, message = 'Unauthorized') => {
  return failure(res, 401, message)
}

export const forbidden = (res, message = 'Forbidden') => {
  return failure(res, 403, message)
}

export const notFound = (res, message = 'Not Found') => {
  return failure(res, 404, message)
}

export const internalError = (res, message = 'Internal Server Error') => {
  return failure(res, 500, message)
}

const options = async (req, res, session) => {
  res.status(200)
  return res.end()
}

export const methodNotAllowed = async (
  req,
  res,
  allowedMethods = ['GET', 'POST', 'DELETE', 'OPTIONS']
) => {
  res.setHeader('Allow', allowedMethods)
  return failure(res, 405, `Method ${req.method} Not Allowed`)
}
