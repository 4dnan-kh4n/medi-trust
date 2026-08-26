import mongoose from 'mongoose'

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true, index: true },
  address: { type: String, required: true, trim: true, maxlength: 300 },
  locality: { type: String, required: true, trim: true, maxlength: 120 },
  pinCode: { type: String, trim: true, match: /^\d{6}$/ },
  phoneNumbers: [{ type: String, trim: true, maxlength: 20 }],
  mapUrl: { type: String, trim: true, maxlength: 500 },
  isFictional: { type: Boolean, default: false },
}, { timestamps: true })

clinicSchema.index({ name: 1, location: 1 })

export default mongoose.model('Clinic', clinicSchema)
