import mongoose from 'mongoose'
import { env } from './env.js'

let status = env.MONGODB_URI ? 'connecting' : 'not_configured'

mongoose.connection.on('connected', () => { status = 'connected' })
mongoose.connection.on('disconnected', () => { status = 'disconnected' })
mongoose.connection.on('error', () => { status = 'error' })

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    console.warn('MONGODB_URI is not configured. The API is running without a database connection.')
    return
  }

  try {
    await mongoose.connect(env.MONGODB_URI)
    console.info('MongoDB connected')
  } catch (error) {
    status = 'error'
    console.error('MongoDB connection failed:', error.message)
    if (env.NODE_ENV === 'production') throw error
  }
}

export function getDatabaseStatus() {
  return status
}
