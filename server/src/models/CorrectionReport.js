import mongoose from 'mongoose'

const correctionReportSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
  category: { type: String, enum: ['PRACTICE_DETAILS', 'SCHEDULE', 'SPECIALITY', 'PROFILE_DETAILS', 'OTHER'], required: true },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
  status: { type: String, enum: ['PENDING', 'IN_REVIEW', 'RESOLVED', 'DISMISSED'], default: 'PENDING', index: true },
  adminNote: { type: String, trim: true, maxlength: 500 },
  resolvedAt: Date,
}, { timestamps: true })

correctionReportSchema.index({ status: 1, createdAt: -1 })

export default mongoose.model('CorrectionReport', correctionReportSchema)
