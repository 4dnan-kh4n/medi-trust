import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  state: { type: String, required: true, trim: true, maxlength: 80 },
  city: { type: String, required: true, trim: true, maxlength: 80 },
}, { timestamps: true })

locationSchema.index({ state: 1, city: 1 }, { unique: true })

export default mongoose.model('Location', locationSchema)
