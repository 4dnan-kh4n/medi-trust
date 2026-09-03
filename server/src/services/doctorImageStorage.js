import { createHash } from 'node:crypto'
import { unlink } from 'node:fs/promises'
import path from 'node:path'
import { env } from '../config/env.js'
import { doctorImageDirectory, saveDoctorImageLocally } from '../middleware/doctorImageUpload.js'
import AppError from '../utils/AppError.js'

const cloudinaryFolder = 'meditrust/doctor-images'
const cloudinaryEnabled = Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET)

function cloudinarySignature(parameters) {
  const payload = Object.entries(parameters).sort(([left], [right]) => left.localeCompare(right)).map(([key, value]) => `${key}=${value}`).join('&')
  return createHash('sha256').update(`${payload}${env.CLOUDINARY_API_SECRET}`).digest('hex')
}

export async function saveDoctorImage(file) {
  if (!cloudinaryEnabled) return saveDoctorImageLocally(file)
  const timestamp = Math.floor(Date.now() / 1000)
  const signedParameters = { folder: cloudinaryFolder, timestamp }
  const form = new FormData()
  form.set('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname)
  form.set('api_key', env.CLOUDINARY_API_KEY)
  form.set('folder', cloudinaryFolder)
  form.set('timestamp', String(timestamp))
  form.set('signature', cloudinarySignature(signedParameters))
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(env.CLOUDINARY_CLOUD_NAME)}/image/upload`, { method: 'POST', body: form })
  const payload = await response.json().catch(() => null)
  if (!response.ok || !payload?.secure_url || !payload?.public_id) throw new AppError('Image storage could not process this upload. Please try again.', 502)
  return { profileImageUrl: payload.secure_url, profileImagePublicId: payload.public_id }
}

export async function removeDoctorImage(profileImageUrl, profileImagePublicId) {
  if (profileImagePublicId && cloudinaryEnabled) {
    const timestamp = Math.floor(Date.now() / 1000)
    const form = new FormData()
    form.set('public_id', profileImagePublicId)
    form.set('timestamp', String(timestamp))
    form.set('api_key', env.CLOUDINARY_API_KEY)
    form.set('signature', cloudinarySignature({ public_id: profileImagePublicId, timestamp }))
    await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(env.CLOUDINARY_CLOUD_NAME)}/image/destroy`, { method: 'POST', body: form })
    return
  }
  if (profileImageUrl?.startsWith('/uploads/doctor-images/')) await unlink(path.join(doctorImageDirectory, path.basename(profileImageUrl))).catch(() => {})
}
