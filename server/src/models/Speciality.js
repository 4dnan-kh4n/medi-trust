import mongoose from 'mongoose'

const specialitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true, maxlength: 100 },
  slug: { type: String, required: true, trim: true, unique: true, lowercase: true, match: /^[a-z0-9-]+$/ },
  aliases: [{ type: String, trim: true, lowercase: true, maxlength: 80 }],
  description: { type: String, trim: true, maxlength: 240 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Speciality', specialitySchema)
