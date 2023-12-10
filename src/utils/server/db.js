import mongoose from 'mongoose'
 import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 5,
    }
    mongoose.set('strictQuery', true)
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export const objectToFieldUpdates = (
  obj,
  result = { set: {}, unset: {} },
  prefix = null
) => {
  Object.entries(obj).forEach(([k, v]) => {
    const fieldName = prefix ? `${prefix}.${k}` : k
    if (v === null) {
      result.unset[fieldName] = v
    } else if (typeof v === 'object' && !Array.isArray(v)) {
      objectToFieldUpdates(v, result, fieldName)
    } else {
      result.set[fieldName] = v
    }
  })
  return result
}
