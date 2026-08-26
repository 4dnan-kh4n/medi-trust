import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import { env } from '../config/env.js'
import Admin from '../models/Admin.js'
if (!env.JWT_SECRET || !env.INITIAL_ADMIN_EMAIL || !env.INITIAL_ADMIN_PASSWORD) throw new Error('JWT_SECRET, INITIAL_ADMIN_EMAIL, and INITIAL_ADMIN_PASSWORD are required.')
await connectDatabase()
const passwordHash = await bcrypt.hash(env.INITIAL_ADMIN_PASSWORD, 12)
await Admin.findOneAndUpdate({ email: env.INITIAL_ADMIN_EMAIL.toLowerCase() }, { email: env.INITIAL_ADMIN_EMAIL.toLowerCase(), passwordHash, isActive: true }, { upsert: true, new: true, setDefaultsOnInsert: true })
console.info('Initial admin upserted successfully.')
await mongoose.disconnect()
