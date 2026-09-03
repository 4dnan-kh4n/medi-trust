import { z } from 'zod'
import Clinic from '../models/Clinic.js'
import Hospital from '../models/Hospital.js'
import Location from '../models/Location.js'
import Speciality from '../models/Speciality.js'
import AppError from '../utils/AppError.js'

const objectId = z.string().regex(/^[a-f\d]{24}$/i)
const facilityType = z.enum(['clinics', 'hospitals'])
const facilityBase = { name: z.string().min(2).max(160), location: objectId, address: z.string().min(4).max(300), locality: z.string().min(2).max(120), pinCode: z.string().regex(/^\d{6}$/).optional().or(z.literal('')), phoneNumbers: z.array(z.string().min(4).max(20)).max(5).default([]), mapUrl: z.string().max(500).optional().or(z.literal('')) }
const clinicInput = z.object(facilityBase)
const hospitalInput = z.object({ ...facilityBase, websiteUrl: z.string().max(500).optional().or(z.literal('')) })
const specialityInput = z.object({ name: z.string().min(2).max(100), slug: z.string().regex(/^[a-z0-9-]+$/), aliases: z.array(z.string().trim().min(2).max(80)).max(12).default([]), description: z.string().max(240).optional().or(z.literal('')) })
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function facilityModel(type) { return type === 'clinics' ? Clinic : Hospital }
function facilitySchema(type) { return type === 'clinics' ? clinicInput : hospitalInput }
function parseFacilityType(value) { const parsed = facilityType.safeParse(value); if (!parsed.success) throw new AppError('Invalid facility type.', 400); return parsed.data }

export async function directoryOptions(_request, response) { response.json({ data: { locations: await Location.find().sort({ state: 1, city: 1 }).lean() } }) }
export async function listFacilities(request, response) { const type = parseFacilityType(request.params.type); const search = typeof request.query.search === 'string' ? request.query.search.trim().slice(0, 80) : ''; const filter = search ? { name: { $regex: escapeRegex(search), $options: 'i' } } : {}; const facilities = await facilityModel(type).find(filter).sort({ name: 1 }).populate('location').lean(); response.json({ data: facilities }) }
export async function getFacility(request, response) { const type = parseFacilityType(request.params.type); const facility = await facilityModel(type).findById(request.params.id).populate('location'); if (!facility) throw new AppError('Facility not found.', 404); response.json({ data: facility }) }
export async function createFacility(request, response) { const type = parseFacilityType(request.params.type); const parsed = facilitySchema(type).safeParse(request.body); if (!parsed.success) throw new AppError('Invalid facility details.', 400, parsed.error.flatten().fieldErrors); const facility = await facilityModel(type).create({ ...parsed.data, isFictional: false }); response.status(201).json({ data: facility }) }
export async function updateFacility(request, response) { const type = parseFacilityType(request.params.type); const parsed = facilitySchema(type).partial().safeParse(request.body); if (!parsed.success) throw new AppError('Invalid facility details.', 400, parsed.error.flatten().fieldErrors); const facility = await facilityModel(type).findByIdAndUpdate(request.params.id, parsed.data, { new: true, runValidators: true }); if (!facility) throw new AppError('Facility not found.', 404); response.json({ data: facility }) }
export async function listSpecialities(request, response) { const search = typeof request.query.search === 'string' ? request.query.search.trim().slice(0, 80) : ''; const filter = search ? { name: { $regex: escapeRegex(search), $options: 'i' } } : {}; response.json({ data: await Speciality.find(filter).sort({ name: 1 }).lean() }) }
export async function getSpeciality(request, response) { const speciality = await Speciality.findById(request.params.id); if (!speciality) throw new AppError('Speciality not found.', 404); response.json({ data: speciality }) }
export async function createSpeciality(request, response) { const parsed = specialityInput.safeParse(request.body); if (!parsed.success) throw new AppError('Invalid speciality details.', 400, parsed.error.flatten().fieldErrors); const speciality = await Speciality.create(parsed.data); response.status(201).json({ data: speciality }) }
export async function updateSpeciality(request, response) { const parsed = specialityInput.partial().safeParse(request.body); if (!parsed.success) throw new AppError('Invalid speciality details.', 400, parsed.error.flatten().fieldErrors); const speciality = await Speciality.findByIdAndUpdate(request.params.id, parsed.data, { new: true, runValidators: true }); if (!speciality) throw new AppError('Speciality not found.', 404); response.json({ data: speciality }) }
export async function toggleSpeciality(request, response) { const parsed = z.object({ isActive: z.boolean() }).safeParse(request.body); if (!parsed.success) throw new AppError('isActive must be true or false.', 400); const speciality = await Speciality.findByIdAndUpdate(request.params.id, parsed.data, { new: true }); if (!speciality) throw new AppError('Speciality not found.', 404); response.json({ data: speciality }) }
