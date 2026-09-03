import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  type: { type: String, enum: ['PLATFORM', 'DOCTOR'], required: true },
  doctorName: { type: String, trim: true, maxlength: 140 },
  name: { type: String, trim: true, maxlength: 80, default: 'Anonymous' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 700 },
}, { timestamps: true })

reviewSchema.index({ createdAt: -1 })

export default mongoose.model('Review', reviewSchema)
