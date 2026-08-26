import Doctor from '../models/Doctor.js'
import AiGuidanceMetric from '../models/AiGuidanceMetric.js'

export async function dashboardSummary(request, response) {
  const [totalDoctors, verifiedDoctors, pendingDoctors, popularProfiles, aiGuidance] = await Promise.all([
    Doctor.countDocuments({ isActive: true }), Doctor.countDocuments({ isActive: true, 'verification.status': 'VERIFIED' }), Doctor.countDocuments({ isActive: true, 'verification.status': { $in: ['PENDING', 'NEEDS_REVIEW'] } }), Doctor.find({ isActive: true }).sort({ 'analytics.popularityScore': -1 }).limit(5).select('fullName slug analytics.popularityScore verification.status').lean(), AiGuidanceMetric.findOne({ date: new Date().toISOString().slice(0, 10) }).lean(),
  ])
  response.json({ data: { totalDoctors, verifiedDoctors, pendingDoctors, popularProfiles, aiGuidance: aiGuidance || { requests: 0, providerResponses: 0, fallbackResponses: 0, urgentRoutes: 0 } } })
}
