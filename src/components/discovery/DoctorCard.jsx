import { BadgeCheck, Building2, CalendarDays, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const appointmentLabels = { PHONE_BOOKING: 'Phone booking', WALK_IN: 'Walk-ins accepted', ONLINE_BOOKING: 'Online booking', CLINIC_DESK_BOOKING: 'Clinic desk booking', HOSPITAL_BOOKING: 'Hospital booking' }
const mediaBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')

function DoctorAvatar({ doctor }) {
  const [failed, setFailed] = useState(false)
  const initials = doctor.fullName.split(' ').filter(Boolean).slice(1, 3).map((word) => word[0]).join('')
  const image = doctor.profileImageUrl?.startsWith('/uploads/') ? `${mediaBase}${doctor.profileImageUrl}` : ''
  if (!image || failed) return <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint text-sm font-extrabold text-forest">{initials}</div>
  return <img src={image} alt={`Portrait of ${doctor.fullName}`} onError={() => setFailed(true)} className="size-14 shrink-0 rounded-2xl object-cover" />
}

function DoctorCard({ doctor }) {
  const location = useLocation()
  const discoveryUrl = `${location.pathname}${location.search}`
  return <article className="relative border-b border-line py-6 first:border-t"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 gap-4"><DoctorAvatar doctor={doctor} /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-extrabold tracking-[-0.025em] text-ink">{doctor.fullName}</h3>{doctor.verification.status === 'VERIFIED' && <span className="inline-flex items-center gap-1 text-xs font-bold text-forest"><BadgeCheck size={15} aria-hidden="true" /> Verified details</span>}</div><p className="mt-1 font-semibold text-forest">{doctor.primarySpeciality.name}</p><p className="mt-1 text-sm text-muted">{doctor.qualifications.join(', ')} · {doctor.yearsOfExperience} years experience</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted"><span className="inline-flex items-center gap-1.5"><Building2 size={15} aria-hidden="true" /> {doctor.practiceName || 'Practice not listed'}</span><span className="inline-flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" /> {doctor.locality || doctor.location.city}, {doctor.location.city}</span><span className="inline-flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" /> {appointmentLabels[doctor.appointmentMethods[0]] || 'Contact practice'}</span></div></div></div><Link to={`/doctors/${doctor.slug}`} state={{ discoveryUrl }} className="w-fit shrink-0 rounded-full border border-ink px-4 py-2 text-sm font-bold text-ink transition hover:bg-ink hover:text-white focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2">View profile</Link></div></article>
}

export default DoctorCard
