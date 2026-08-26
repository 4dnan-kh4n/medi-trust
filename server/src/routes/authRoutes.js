import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { login, logout, session } from '../controllers/authController.js'
import requireAdmin from '../middleware/requireAdmin.js'
const router = Router()
router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false }), login)
router.post('/logout', logout)
router.get('/session', requireAdmin, session)
export default router
