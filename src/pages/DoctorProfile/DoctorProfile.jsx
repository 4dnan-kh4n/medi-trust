import { ArrowLeft, BadgeCheck, Globe2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import PracticeSchedule from '../../components/profile/PracticeSchedule'
import ProfileActions from '../../components/profile/ProfileActions'
import Seo from '../../components/common/Seo'
import { getDoctor, trackInteraction } from '../../services/doctorApi'

const appointmentLabels = { PHONE_BOOKING: 'Phone booking', WALK_IN: 'Walk-ins accepted', ONLINE_BOOKING: 'Online booking', CLINIC_DESK_BOOKING: 'Clinic desk booking', HOSPITAL_BOOKING: 'Hospital booking' }
const mediaBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')

function practiceView(item, type) {
  const place = item[type]
  return { name: place.name, address: place.address, department: item.department, appointment: item.appointmentMethods.map((method) => appointmentLabels[method] || method).join(' · '), fee: item.consultationFee ? `₹${item.consultationFee}` : undefined, schedule: item.schedule.map(({ day, slots }) => ({ day, slots: slots.map((slot) => `${slot.startTime}–${slot.endTime}`) })) }
}

function ProfilePortrait({ doctor, initials }) {
  const [failed, setFailed] = useState(false)
  const image = doctor.profileImageUrl ? (doctor.profileImageUrl.startsWith('/uploads/') ? `${mediaBase}${doctor.profileImageUrl}` : doctor.profileImageUrl) : ''
  if (!image || failed) return <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-mint text-xl font-extrabold text-forest">{initials}</div>
  return <img src={image} alt={`Portrait of ${doctor.fullName}`} onError={() => setFailed(true)} className="size-20 shrink-0 rounded-3xl object-cover" />
}

export default function DoctorProfile() {
  const { doctorSlug } = useParams()
  const location = useLocation()
  const [doctor, setDoctor] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { getDoctor(doctorSlug).then((data) => { setDoctor(data); trackInteraction(doctorSlug, 'profileView').catch(() => {}) }).catch(() => setError('This doctor profile could not be loaded.')) }, [doctorSlug])

  if (error) return <><Header /><main className="grid min-h-[68vh] place-items-center bg-canvas px-5"><div className="text-center"><h1 className="font-display text-4xl text-ink">{error}</h1><Link to="/explore" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Return to discovery</Link></div></main><Footer /></>
  if (!doctor) return <><Header /><main className="min-h-[68vh] bg-canvas px-5 py-14"><div className="mx-auto h-64 max-w-7xl animate-pulse rounded-3xl bg-sand" /></main></>

  const initials = doctor.fullName.split(' ').filter(Boolean).slice(1, 3).map((word) => word[0]).join('')
  const discoveryUrl = location.state?.discoveryUrl?.startsWith('/explore') ? location.state.discoveryUrl : '/explore'
  const primaryPractice = doctor.clinicPractices[0]?.clinic || doctor.hospitalPractices[0]?.hospital
  const directionsUrl = primaryPractice?.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryPractice?.address || `${doctor.primaryLocation.city}, ${doctor.primaryLocation.state}`)}`
  const structuredData = doctor.isFictional ? undefined : { '@context': 'https://schema.org', '@type': 'Physician', name: doctor.fullName, url: window.location.href, medicalSpecialty: doctor.primarySpeciality.name, address: { '@type': 'PostalAddress', addressLocality: doctor.primaryLocation.city, addressRegion: doctor.primaryLocation.state } }
  return <><Seo title={`${doctor.fullName} | mediTrust`} description={`${doctor.primarySpeciality.name} profile in ${doctor.primaryLocation.city}. Review listed practice and verification information.`} structuredData={structuredData} /><Header /><main className="bg-canvas"><section className="border-b border-line"><div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><Link to={discoveryUrl} className="inline-flex items-center gap-1 text-sm font-bold text-muted"><ArrowLeft size={16} /> Back to discovery</Link><div className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end"><div className="flex gap-5"><ProfilePortrait doctor={doctor} initials={initials} /><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Doctor profile</p><h1 className="mt-2 font-display text-5xl text-ink">{doctor.fullName}</h1><p className="mt-3 text-lg font-bold text-forest">{doctor.primarySpeciality.name}</p><p className="mt-1 text-sm text-muted">{doctor.qualifications.join(', ')} · {doctor.yearsOfExperience} years experience</p></div></div><div className="rounded-2xl bg-ink p-5 text-white"><p className="flex gap-2 font-bold"><BadgeCheck size={18} className="text-mint" /> {doctor.verification.status === 'VERIFIED' ? 'Details shown as verified' : 'Verification review needed'}</p><p className="mt-3 text-sm text-white/70">Last checked: {doctor.verification.lastVerifiedAt ? new Date(doctor.verification.lastVerifiedAt).toLocaleDateString() : 'Not yet verified'}.</p></div></div></div></section><section className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]"><aside><p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Professional overview</p><h2 className="mt-3 font-display text-4xl text-ink">Information with context.</h2><div className="mt-7 border-y border-line py-5 text-sm"><p><strong>Languages</strong><br /><span className="text-muted">{doctor.languages.join(' · ')}</span></p><p className="mt-4"><strong>Registration information</strong><br /><span className="text-muted">Shown only once a source is verified.</span></p></div></aside><div><p className="text-base leading-8 text-muted">{doctor.bio}</p></div></div><ProfileActions doctorName={doctor.fullName} doctorSlug={doctor.slug} phoneNumber={primaryPractice?.phoneNumbers?.[0]} directionsUrl={directionsUrl} /><section className="pt-2"><div className="flex items-baseline justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Practice locations</p><h2 className="mt-2 font-display text-4xl text-ink">Clinics and hospitals</h2></div><span className="hidden gap-2 text-sm text-muted sm:inline-flex"><Globe2 size={16} /> {doctor.primaryLocation.city}, {doctor.primaryLocation.state}</span></div><div className="mt-8 grid gap-10 lg:grid-cols-2"><div><h3 className="mb-5 text-lg font-extrabold text-ink">Clinic schedule</h3>{doctor.clinicPractices.map((practice) => <PracticeSchedule key={practice.clinic._id} practice={practiceView(practice, 'clinic')} type="clinic" />)}</div><div><h3 className="mb-5 text-lg font-extrabold text-ink">Hospital schedule</h3>{doctor.hospitalPractices.length ? doctor.hospitalPractices.map((practice) => <PracticeSchedule key={practice.hospital._id} practice={practiceView(practice, 'hospital')} type="hospital" />) : <p className="text-sm text-muted">No hospital affiliation listed.</p>}</div></div></section></section></main><Footer /></>
}
