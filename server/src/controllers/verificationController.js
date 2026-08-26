import { z } from 'zod'
import Doctor from '../models/Doctor.js'
import '../models/Location.js'
import '../models/Speciality.js'
import AppError from '../utils/AppError.js'

const updateInput = z.object({ status: z.enum(['PENDING', 'VERIFIED', 'NEEDS_REVIEW']), sources: z.array(z.string().trim().min(2).max(200)).max(8).default([]) })

export async function listVerificationQueue(request, response) { const status = request.query.status; const filter = status ? { 'verification.status': status } : { 'verification.status': { $in: ['PENDING', 'NEEDS_REVIEW'] } }; const doctors = await Doctor.find(filter).sort({ 'verification.lastVerifiedAt': 1, updatedAt: -1 }).populate('primaryLocation primarySpeciality').lean(); response.json({ data: doctors.map((doctor) => ({ ...doctor, verification: { ...doctor.verification, sources: doctor.verification?.sources || [] } })) }) }
export async function updateVerification(request, response) { const parsed = updateInput.safeParse(request.body); if (!parsed.success) throw new AppError('Invalid verification update.', 400, parsed.error.flatten().fieldErrors); const doctor = await Doctor.findById(request.params.id); if (!doctor) throw new AppError('Doctor not found.', 404); doctor.verification.status = parsed.data.status; doctor.verification.sources = parsed.data.sources; doctor.verification.lastVerifiedAt = parsed.data.status === 'VERIFIED' ? new Date() : undefined; await doctor.save(); await doctor.populate('primaryLocation primarySpeciality'); response.json({ data: doctor }) }
