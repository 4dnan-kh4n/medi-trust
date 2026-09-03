import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import path from 'node:path'
import { env } from './config/env.js'
import errorHandler from './middleware/errorHandler.js'
import notFound from './middleware/notFound.js'
import healthRouter from './routes/healthRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import authRouter from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import adminDoctorRouter from './routes/adminDoctorRoutes.js'
import adminDirectoryRouter from './routes/adminDirectoryRoutes.js'
import { robots, sitemap } from './controllers/sitemapController.js'
import aiRouter from './routes/aiRoutes.js'
import { doctorImageDirectory } from './middleware/doctorImageUpload.js'

const app = express()
const developmentOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174']

if (env.NODE_ENV === 'production') app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: env.NODE_ENV === 'development' ? developmentOrigins : env.CLIENT_URL, credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], optionsSuccessStatus: 204 }))
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false, limit: '100kb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-8', legacyHeaders: false, skip: (request) => request.path === '/health' }))
app.use('/uploads', helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }), express.static(path.dirname(doctorImageDirectory), { fallthrough: false, maxAge: '7d' }))
app.get('/sitemap.xml', sitemap)
app.get('/robots.txt', robots)

app.use('/api/health', healthRouter)
app.use('/api/ai', aiRouter)
app.use('/api', doctorRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/admin/doctors', adminDoctorRouter)
app.use('/api/admin/directory', adminDirectoryRouter)

app.use(notFound)
app.use(errorHandler)

export default app
