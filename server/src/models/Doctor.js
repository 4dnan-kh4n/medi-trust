import mongoose from 'mongoose'

export const appointmentMethods = ['ONLINE_BOOKING', 'PHONE_BOOKING', 'WALK_IN', 'CLINIC_DESK_BOOKING', 'WHATSAPP_BOOKING', 'HOSPITAL_BOOKING', 'NO_APPOINTMENT_REQUIRED', 'CONTACT_CLINIC']

const slotSchema = new mongoose.Schema({ startTime: { type: String, required: true, match: /^\d{2}:\d{2}$/ }, endTime: { type: String, required: true, match: /^\d{2}:\d{2}$/ } }, { _id: false })
const scheduleSchema = new mongoose.Schema({ day: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }, isAvailable: { type: Boolean, default: false }, slots: { type: [slotSchema], default: [] }, notes: { type: String, trim: true, maxlength: 160 } }, { _id: false })
const practiceSchema = new mongoose.Schema({ clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }, hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }, department: { type: String, trim: true, maxlength: 120 }, consultationFee: { type: Number, min: 0 }, appointmentMethods: [{ type: String, enum: appointmentMethods }], schedule: { type: [scheduleSchema], default: [] }, notes: { type: String, trim: true, maxlength: 200 } }, { _id: false })

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 140 },
  slug: { type: String, required: true, trim: true, unique: true, lowercase: true, match: /^[a-z0-9-]+$/ },
  profileImageUrl: { type: String, trim: true, maxlength: 500 },
  primaryLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true, index: true },
  primarySpeciality: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality', required: true, index: true },
  additionalSpecialities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' }],
  qualifications: [{ type: String, trim: true, maxlength: 160 }],
  yearsOfExperience: { type: Number, min: 0, max: 80 },
  languages: [{ type: String, trim: true, maxlength: 50 }],
  bio: { type: String, trim: true, maxlength: 1500 },
  registration: { number: { type: String, trim: true, maxlength: 80 }, authority: { type: String, trim: true, maxlength: 160 } },
  clinicPractices: { type: [practiceSchema], default: [] },
  hospitalPractices: { type: [practiceSchema], default: [] },
  verification: { status: { type: String, enum: ['PENDING', 'VERIFIED', 'NEEDS_REVIEW'], default: 'PENDING', index: true }, lastVerifiedAt: Date, sources: [{ type: String, trim: true, maxlength: 200 }], profileCompleteness: { type: Number, min: 0, max: 100, default: 0 } },
  analytics: { profileViews: { type: Number, default: 0, min: 0 }, uniqueProfileViews: { type: Number, default: 0, min: 0 }, contactClicks: { type: Number, default: 0, min: 0 }, directionClicks: { type: Number, default: 0, min: 0 }, appointmentClicks: { type: Number, default: 0, min: 0 }, favoritesCount: { type: Number, default: 0, min: 0 }, popularityScore: { type: Number, default: 0, min: 0, index: true } },
  isActive: { type: Boolean, default: true, index: true },
  isFictional: { type: Boolean, default: false },
}, { timestamps: true })

doctorSchema.index({ primaryLocation: 1, primarySpeciality: 1, isActive: 1, 'analytics.popularityScore': -1 })
doctorSchema.index({ fullName: 'text', bio: 'text' })

export default mongoose.model('Doctor', doctorSchema)
