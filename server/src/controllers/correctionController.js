import { z } from 'zod'
import CorrectionReport from '../models/CorrectionReport.js'
import Doctor from '../models/Doctor.js'
import AppError from '../utils/AppError.js'

const categories = ['PRACTICE_DETAILS', 'SCHEDULE', 'SPECIALITY', 'PROFILE_DETAILS', 'OTHER']
const reportInput = z.object({ category: z.enum(categories), message: z.string().trim().min(10).max(500) })
const adminUpdate = z.object({ status: z.enum(['PENDING', 'IN_REVIEW', 'RESOLVED', 'DISMISSED']), adminNote: z.string().trim().max(500).optional().or(z.literal('')) })

export async function createCorrectionReport(request, response) { const parsed = reportInput.safeParse(request.body); if (!parsed.success) throw new AppError('Provide a correction category and a message of at least 10 characters.', 400, parsed.error.flatten().fieldErrors); const doctor = await Doctor.findOne({ slug: request.params.slug, isActive: true }); if (!doctor) throw new AppError('Doctor profile not found.', 404); const report = await CorrectionReport.create({ doctor: doctor._id, ...parsed.data }); response.status(201).json({ data: { id: report.id, status: report.status } }) }
export async function listCorrectionReports(request, response) { const filter = request.query.status ? { status: request.query.status } : {}; const reports = await CorrectionReport.find(filter).sort({ createdAt: -1 }).populate('doctor', 'fullName slug primarySpeciality').lean(); response.json({ data: reports }) }
export async function updateCorrectionReport(request, response) { const parsed = adminUpdate.safeParse(request.body); if (!parsed.success) throw new AppError('Invalid report update.', 400, parsed.error.flatten().fieldErrors); const update = { ...parsed.data }; if (['RESOLVED', 'DISMISSED'].includes(parsed.data.status)) update.resolvedAt = new Date(); else update.resolvedAt = undefined; const report = await CorrectionReport.findByIdAndUpdate(request.params.id, update, { new: true, runValidators: true }).populate('doctor', 'fullName slug'); if (!report) throw new AppError('Correction report not found.', 404); response.json({ data: report }) }
