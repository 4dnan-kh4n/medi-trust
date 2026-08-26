import { Router } from 'express'
import { getDoctor, listDoctors, listLocations, listSpecialities, recordInteraction } from '../controllers/doctorController.js'
import { createCorrectionReport } from '../controllers/correctionController.js'
import { createReview, listPublicReviews } from '../controllers/reviewController.js'
import rateLimit from 'express-rate-limit'

const doctorRouter = Router()
doctorRouter.get('/locations', listLocations)
doctorRouter.get('/specialities', listSpecialities)
doctorRouter.get('/reviews', listPublicReviews)
doctorRouter.post('/reviews', rateLimit({ windowMs: 60 * 60 * 1000, limit: 8, standardHeaders: 'draft-8', legacyHeaders: false }), createReview)
doctorRouter.get('/doctors', listDoctors)
doctorRouter.get('/doctors/:slug', getDoctor)
doctorRouter.post('/doctors/:slug/interactions', recordInteraction)
doctorRouter.post('/doctors/:slug/corrections', rateLimit({ windowMs: 60 * 60 * 1000, limit: 6, standardHeaders: 'draft-8', legacyHeaders: false }), createCorrectionReport)
export default doctorRouter
