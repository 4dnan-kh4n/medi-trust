import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import AppError from '../utils/AppError.js'

export default function requireAdmin(request, response, next) { try { request.admin = jwt.verify(request.cookies.admin_session, env.JWT_SECRET); next() } catch { next(new AppError('Admin authentication is required.', 401)) } }
