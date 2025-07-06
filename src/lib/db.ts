import mongoose, { Mongoose } from 'mongoose'

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function dbConnect(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  // Check cached connection
  if (cached.conn) {
    return cached.conn
  }

  // Create new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB connected successfully')
      return mongooseInstance
    }).catch((error) => {
      console.error('MongoDB connection error:', error)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect