import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import multer from 'multer'
import AppError from '../utils/AppError.js'
import { env } from '../config/env.js'

const directory = env.UPLOAD_DIR ? path.resolve(env.UPLOAD_DIR, 'doctor-images') : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../uploads/doctor-images')
mkdirSync(directory, { recursive: true })

const extensions = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }
const storage = multer.diskStorage({
  destination: (_request, _file, done) => done(null, directory),
  filename: (_request, file, done) => done(null, `${randomUUID()}${extensions[file.mimetype]}`),
})

export const doctorImageDirectory = directory
export const doctorImageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_request, file, done) => {
    if (!extensions[file.mimetype]) return done(new AppError('Upload a JPG, PNG, or WebP image.', 400))
    done(null, true)
  },
})
