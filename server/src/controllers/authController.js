import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../config/env.js'
import Admin from '../models/Admin.js'
import AppError from '../utils/AppError.js'

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8).max(128) })
// The frontend and API use different Render subdomains in production.  The
// session cookie must therefore be explicitly permitted on credentialed API
// requests from the frontend; HTTPS is required whenever `SameSite=None` is
// used.
const cookieOptions = {
  httpOnly: true,
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: env.NODE_ENV === 'production',
  maxAge: 1000 * 60 * 60 * 8,
}
export async function login(request, response) { const parsed = loginSchema.safeParse(request.body); if (!parsed.success) throw new AppError('Enter a valid email and password.', 400); const admin = await Admin.findOne({ email: parsed.data.email.toLowerCase(), isActive: true }); if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) throw new AppError('Invalid email or password.', 401); const token = jwt.sign({ sub: admin.id, email: admin.email, role: 'admin' }, env.JWT_SECRET, { expiresIn: '8h' }); response.cookie('admin_session', token, cookieOptions).json({ data: { email: admin.email } }) }
export function logout(request, response) { response.clearCookie('admin_session', cookieOptions).status(204).end() }
export function session(request, response) { response.json({ data: { email: request.admin.email || null } }) }
