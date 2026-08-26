import assert from 'node:assert/strict'
import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import Doctor from '../models/Doctor.js'

try {
  await connectDatabase()
  assert.equal(await Doctor.countDocuments({ isFictional: true }), 0, 'Fictional doctor profiles must not be present')
  console.info('No fictional doctor profiles are present.')
} finally {
  await mongoose.disconnect()
}
