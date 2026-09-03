import mongoose from 'mongoose'

const aiGuidanceMetricSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  requests: { type: Number, default: 0, min: 0 },
  providerResponses: { type: Number, default: 0, min: 0 },
  fallbackResponses: { type: Number, default: 0, min: 0 },
  urgentRoutes: { type: Number, default: 0, min: 0 },
}, { timestamps: true })

export default mongoose.model('AiGuidanceMetric', aiGuidanceMetricSchema)
