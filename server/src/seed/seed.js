import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import Clinic from '../models/Clinic.js'
import Doctor from '../models/Doctor.js'
import Hospital from '../models/Hospital.js'
import Location from '../models/Location.js'
import Speciality from '../models/Speciality.js'

const schedule = (days) => days.map(([day, slots]) => ({ day, isAvailable: slots.length > 0, slots: slots.map(([startTime, endTime]) => ({ startTime, endTime })) }))

async function upsert(model, filter, values) {
  return model.findOneAndUpdate(filter, values, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true })
}

async function seed() {
  await connectDatabase()

  const [bhopal, indore, pune] = await Promise.all([
    upsert(Location, { state: 'Madhya Pradesh', city: 'Bhopal' }, { state: 'Madhya Pradesh', city: 'Bhopal' }),
    upsert(Location, { state: 'Madhya Pradesh', city: 'Indore' }, { state: 'Madhya Pradesh', city: 'Indore' }),
    upsert(Location, { state: 'Maharashtra', city: 'Pune' }, { state: 'Maharashtra', city: 'Pune' }),
  ])

  const specialities = Object.fromEntries(await Promise.all([
    ['general-physician', 'General Physician'], ['dermatologist', 'Dermatologist'], ['cardiologist', 'Cardiologist'], ['pediatrician', 'Pediatrician'], ['orthopedic', 'Orthopedic'],
  ].map(async ([slug, name]) => [slug, await upsert(Speciality, { slug }, { slug, name, description: `Fictional seed speciality: ${name}.` })])))

  const [areraClinic, indoreClinic, puneClinic, bhopalHospital, puneHospital] = await Promise.all([
    upsert(Clinic, { name: 'Arera Demo Clinic', location: bhopal._id }, { name: 'Arera Demo Clinic', location: bhopal._id, address: '12 Sample Avenue, Arera Colony, Bhopal', locality: 'Arera Colony', pinCode: '462016', isFictional: true }),
    upsert(Clinic, { name: 'Indore Demo Clinic', location: indore._id }, { name: 'Indore Demo Clinic', location: indore._id, address: '8 Preview Road, Vijay Nagar, Indore', locality: 'Vijay Nagar', pinCode: '452010', isFictional: true }),
    upsert(Clinic, { name: 'Pune Demo Clinic', location: pune._id }, { name: 'Pune Demo Clinic', location: pune._id, address: '24 Example Street, Kothrud, Pune', locality: 'Kothrud', pinCode: '411038', isFictional: true }),
    upsert(Hospital, { name: 'Bhopal Sample Hospital', location: bhopal._id }, { name: 'Bhopal Sample Hospital', location: bhopal._id, address: '45 Mock Road, Shahpura, Bhopal', locality: 'Shahpura', pinCode: '462016', isFictional: true }),
    upsert(Hospital, { name: 'Pune Sample Hospital', location: pune._id }, { name: 'Pune Sample Hospital', location: pune._id, address: '6 Demo Lane, Aundh, Pune', locality: 'Aundh', pinCode: '411007', isFictional: true }),
  ])

  await Promise.all([
    upsert(Doctor, { slug: 'anika-mehra-sample' }, { fullName: 'Dr. Anika Mehra — Sample', slug: 'anika-mehra-sample', primaryLocation: bhopal._id, primarySpeciality: specialities.dermatologist._id, qualifications: ['Sample qualification — fictional'], yearsOfExperience: 12, languages: ['Hindi', 'English'], bio: 'Fictional seed profile for development and API testing only.', clinicPractices: [{ clinic: areraClinic._id, appointmentMethods: ['PHONE_BOOKING'], schedule: schedule([['Monday', [['10:00', '13:00'], ['17:00', '19:00']]], ['Wednesday', [['10:00', '13:00']]], ['Friday', [['10:00', '13:00']]]]) }], hospitalPractices: [{ hospital: bhopalHospital._id, department: 'Dermatology', appointmentMethods: ['HOSPITAL_BOOKING'], schedule: schedule([['Tuesday', [['15:00', '17:00']]], ['Thursday', [['15:00', '17:00']]]]) }], verification: { status: 'VERIFIED', lastVerifiedAt: new Date(), sources: ['Fictional seed record'], profileCompleteness: 85 }, analytics: { profileViews: 80, uniqueProfileViews: 35, popularityScore: 35 }, isFictional: true }),
    upsert(Doctor, { slug: 'rohan-iyer-sample' }, { fullName: 'Dr. Rohan Iyer — Sample', slug: 'rohan-iyer-sample', primaryLocation: bhopal._id, primarySpeciality: specialities.cardiologist._id, qualifications: ['Sample qualification — fictional'], yearsOfExperience: 15, languages: ['Hindi', 'English'], bio: 'Fictional seed profile for development and API testing only.', clinicPractices: [{ clinic: areraClinic._id, appointmentMethods: ['CLINIC_DESK_BOOKING'], schedule: schedule([['Tuesday', [['11:00', '14:00']]], ['Thursday', [['11:00', '14:00']]]]) }], hospitalPractices: [{ hospital: bhopalHospital._id, department: 'Cardiology', appointmentMethods: ['HOSPITAL_BOOKING'], schedule: schedule([['Monday', [['09:00', '11:00']]], ['Friday', [['09:00', '11:00']]]]) }], verification: { status: 'PENDING', profileCompleteness: 70 }, analytics: { profileViews: 42, uniqueProfileViews: 22, popularityScore: 22 }, isFictional: true }),
    upsert(Doctor, { slug: 'zoya-khan-sample' }, { fullName: 'Dr. Zoya Khan — Sample', slug: 'zoya-khan-sample', primaryLocation: indore._id, primarySpeciality: specialities.pediatrician._id, qualifications: ['Sample qualification — fictional'], yearsOfExperience: 11, languages: ['Hindi', 'English'], bio: 'Fictional seed profile for development and API testing only.', clinicPractices: [{ clinic: indoreClinic._id, appointmentMethods: ['WALK_IN'], schedule: schedule([['Monday', [['10:00', '12:00']]], ['Saturday', [['10:00', '12:00']]]]) }], verification: { status: 'VERIFIED', lastVerifiedAt: new Date(), sources: ['Fictional seed record'], profileCompleteness: 75 }, analytics: { profileViews: 18, uniqueProfileViews: 9, popularityScore: 9 }, isFictional: true }),
    upsert(Doctor, { slug: 'minal-desai-sample' }, { fullName: 'Dr. Minal Desai — Sample', slug: 'minal-desai-sample', primaryLocation: pune._id, primarySpeciality: specialities['general-physician']._id, qualifications: ['Sample qualification — fictional'], yearsOfExperience: 10, languages: ['Hindi', 'English', 'Marathi'], bio: 'Fictional seed profile for development and API testing only.', clinicPractices: [{ clinic: puneClinic._id, appointmentMethods: ['ONLINE_BOOKING'], schedule: schedule([['Monday', [['09:00', '12:00']]], ['Wednesday', [['09:00', '12:00']]], ['Friday', [['09:00', '12:00']]]]) }], hospitalPractices: [{ hospital: puneHospital._id, department: 'General Medicine', appointmentMethods: ['HOSPITAL_BOOKING'], schedule: schedule([['Tuesday', [['14:00', '16:00']]]]) }], verification: { status: 'NEEDS_REVIEW', profileCompleteness: 60 }, analytics: { profileViews: 8, uniqueProfileViews: 4, popularityScore: 4 }, isFictional: true }),
  ])

  await Doctor.deleteMany({ isFictional: true })

  console.info('Directory seed data upserted; fictional doctor profiles were removed.')
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exitCode = 1
}).finally(() => mongoose.disconnect())
