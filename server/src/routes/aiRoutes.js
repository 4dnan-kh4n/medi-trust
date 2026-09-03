import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { specialityGuidance } from '../controllers/aiController.js'

const aiRouter = Router()
aiRouter.post('/speciality-guidance', rateLimit({ windowMs: 60 * 60 * 1000, limit: 8, standardHeaders: 'draft-8', legacyHeaders: false }), specialityGuidance)
export default aiRouter
