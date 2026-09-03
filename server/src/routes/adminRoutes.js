import { Router } from 'express'
import { dashboardSummary } from '../controllers/adminController.js'
import { listCorrectionReports, updateCorrectionReport } from '../controllers/correctionController.js'
import { listVerificationQueue, updateVerification } from '../controllers/verificationController.js'
import { deleteReview, listAdminReviews } from '../controllers/reviewController.js'
import requireAdmin from '../middleware/requireAdmin.js'
const router = Router()
router.use(requireAdmin)
router.get('/dashboard', dashboardSummary)
router.get('/corrections', listCorrectionReports)
router.patch('/corrections/:id', updateCorrectionReport)
router.get('/verifications', listVerificationQueue)
router.patch('/verifications/:id', updateVerification)
router.get('/reviews', listAdminReviews)
router.delete('/reviews/:id', deleteReview)
export default router
