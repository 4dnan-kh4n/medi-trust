import { createHash } from 'node:crypto'
import { z } from 'zod'
import '../models/Clinic.js'
import Doctor from '../models/Doctor.js'
import '../models/Hospital.js'
import Location from '../models/Location.js'
import Speciality from '../models/Speciality.js'
import AppError from '../utils/AppError.js'

const interactionSchema = z.object({ action: z.enum(['profileView', 'contactClick', 'directionClick', 'appointmentClick']) })
const interactionWindow = new Map()
const increments = { profileView: { profileViews: 1, uniqueProfileViews: 1, popularityScore: 1 }, contactClick: { contactClicks: 1, popularityScore: 3 }, directionClick: { directionClicks: 1, popularityScore: 2 }, appointmentClick: { appointmentClicks: 1, popularityScore: 3 } }
const builtInAliases = {
  cardiologist: ['heart doctor', 'heart specialist', 'cardiac doctor'],
  dermatologist: ['skin doctor', 'skin specialist'],
  pediatrician: ['child doctor', 'kids doctor', 'children doctor'],
  orthopedic: ['bone doctor', 'bone specialist', 'ortho doctor'],
  'general-physician': ['family doctor', 'general doctor', 'physician'],
}

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

async function matchingSpecialities(term) {
  const normalized = term.trim().toLowerCase()
  const aliases = Object.entries(builtInAliases).filter(([, values]) => values.some((alias) => normalized.includes(alias) || alias.includes(normalized))).map(([slug]) => slug)
  const expression = new RegExp(escapeRegex(normalized), 'i')
  return Speciality.find({ isActive: true, $or: [{ slug: { $in: [slugify(normalized), ...aliases] } }, { name: expression }, { aliases: expression }] }).select('_id').lean()
}

function doctorListItem(doctor) {
  const practice = doctor.clinicPractices[0]?.clinic || doctor.hospitalPractices[0]?.hospital
  const methods = doctor.clinicPractices[0]?.appointmentMethods || doctor.hospitalPractices[0]?.appointmentMethods || []
  return { id: doctor.id, slug: doctor.slug, fullName: doctor.fullName, profileImageUrl: doctor.profileImageUrl, primarySpeciality: doctor.primarySpeciality, qualifications: doctor.qualifications, yearsOfExperience: doctor.yearsOfExperience, languages: doctor.languages, location: doctor.primaryLocation, locality: practice?.locality, practiceName: practice?.name, appointmentMethods: methods, verification: doctor.verification, analytics: { popularityScore: doctor.analytics.popularityScore }, isFictional: doctor.isFictional }
}

export async function listLocations(request, response) {
  const locations = await Location.find(request.query.state ? { state: request.query.state } : {}).sort({ state: 1, city: 1 }).lean()
  response.json({ data: locations })
}

export async function listSpecialities(request, response) {
  response.json({ data: await Speciality.find({ isActive: true }).sort({ name: 1 }).lean() })
}

export async function listDoctors(request, response) {
  const { state, city, speciality, verified, appointment, sort = 'popular', page = '1', limit = '12' } = request.query
  const query = typeof request.query.q === 'string' ? request.query.q.trim().slice(0, 80) : ''
  const conditions = [{ isActive: true }]
  if (state || city) {
    const location = await Location.findOne({ ...(state ? { state } : {}), ...(city ? { city } : {}) })
    if (!location) return response.json({ data: [], pagination: { page: Number(page), limit: Number(limit), total: 0 } })
    conditions.push({ primaryLocation: location._id })
  }
  if (speciality) {
    const matches = await matchingSpecialities(speciality)
    if (!matches.length) return response.json({ data: [], pagination: { page: Number(page), limit: Number(limit), total: 0 } })
    conditions.push({ primarySpeciality: { $in: matches.map((match) => match._id) } })
  }
  if (query) {
    const matches = await matchingSpecialities(query)
    const expression = new RegExp(escapeRegex(query), 'i')
    conditions.push({ $or: [{ fullName: expression }, ...(matches.length ? [{ primarySpeciality: { $in: matches.map((match) => match._id) } }] : [])] })
  }
  if (verified === 'true') conditions.push({ 'verification.status': 'VERIFIED' })
  if (appointment) conditions.push({ $or: [{ 'clinicPractices.appointmentMethods': appointment }, { 'hospitalPractices.appointmentMethods': appointment }] })
  const filter = conditions.length === 1 ? conditions[0] : { $and: conditions }
  const sortBy = { popular: { 'analytics.popularityScore': -1 }, experience: { yearsOfExperience: -1 }, verified: { 'verification.lastVerifiedAt': -1 }, name: { fullName: 1 } }[sort] || { 'analytics.popularityScore': -1 }
  const pageNumber = Math.max(Number(page) || 1, 1); const pageSize = Math.min(Math.max(Number(limit) || 12, 1), 50)
  const [total, doctors] = await Promise.all([Doctor.countDocuments(filter), Doctor.find(filter).sort(sortBy).skip((pageNumber - 1) * pageSize).limit(pageSize).populate('primaryLocation primarySpeciality clinicPractices.clinic hospitalPractices.hospital')])
  response.json({ data: doctors.map(doctorListItem), pagination: { page: pageNumber, limit: pageSize, total } })
}

export async function getDoctor(request, response) {
  const doctor = await Doctor.findOne({ slug: request.params.slug, isActive: true }).populate('primaryLocation primarySpeciality additionalSpecialities clinicPractices.clinic hospitalPractices.hospital')
  if (!doctor) throw new AppError('Doctor profile not found.', 404)
  response.json({ data: doctor })
}

export async function recordInteraction(request, response) {
  const parsed = interactionSchema.safeParse(request.body)
  if (!parsed.success) throw new AppError('Invalid interaction action.', 400, parsed.error.flatten().fieldErrors)
  const key = createHash('sha256').update(`${request.ip}:${request.params.slug}:${parsed.data.action}`).digest('hex')
  const now = Date.now(); const prior = interactionWindow.get(key)
  if (prior && now - prior < 30 * 60 * 1000) return response.status(204).end()
  interactionWindow.set(key, now) // ponytail: process-local cooldown; use Redis when multiple API instances are deployed.
  const doctor = await Doctor.findOneAndUpdate({ slug: request.params.slug, isActive: true }, { $inc: Object.fromEntries(Object.entries(increments[parsed.data.action]).map(([key, value]) => [`analytics.${key}`, value])) }, { new: true })
  if (!doctor) throw new AppError('Doctor profile not found.', 404)
  response.status(204).end()
}
