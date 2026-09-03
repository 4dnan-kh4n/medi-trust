import { ExternalLink, Flag, Phone, Share2 } from 'lucide-react'
import { useState } from 'react'
import { submitCorrection } from '../../services/doctorApi'

const categories = [['PRACTICE_DETAILS', 'Practice details'], ['SCHEDULE', 'Schedule'], ['SPECIALITY', 'Speciality'], ['PROFILE_DETAILS', 'Profile details'], ['OTHER', 'Other']]

export default function ProfileActions({ doctorName, doctorSlug, phoneNumber, directionsUrl }) {
  const slug = doctorSlug || window.location.pathname.split('/').filter(Boolean).pop()
  const [shared, setShared] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [report, setReport] = useState('')
  const [category, setCategory] = useState('PRACTICE_DETAILS')
  const [error, setError] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  async function shareProfile() { const shareData = { title: `${doctorName} — mediTrust`, text: 'Doctor profile on mediTrust.' }; try { if (navigator.share) await navigator.share(shareData); else await navigator.clipboard.writeText(window.location.href); setShared(true); window.setTimeout(() => setShared(false), 2000) } catch { setShared(false) } }
  function callPractice() { if (phoneNumber) window.location.href = `tel:${phoneNumber.replace(/[^+\d]/g, '')}`; else setContactMessage('A phone number is not listed for this practice yet.') }
  async function submitReport(event) { event.preventDefault(); setError(''); try { await submitCorrection(slug, { category, message: report }); setSubmitted(true) } catch (requestError) { setError(requestError.response?.data?.error?.message || 'Your report could not be sent. Please try again.') } }

  return <section className="border-y border-line py-7"><div className="flex flex-wrap gap-2"><button type="button" onClick={callPractice} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-forest"><Phone size={16} /> Call clinic</button><a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"><ExternalLink size={16} /> Directions</a><button type="button" onClick={shareProfile} className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"><Share2 size={16} /> {shared ? 'Link copied' : 'Share'}</button><button type="button" onClick={() => setReportOpen((open) => !open)} className="inline-flex items-center gap-2 rounded-full border border-coral bg-white px-4 py-2.5 text-sm font-bold text-coral transition hover:bg-coral hover:text-white"><Flag size={16} /> Report incorrect information</button></div>{contactMessage && <p role="status" className="mt-3 text-sm text-muted">{contactMessage}</p>}{reportOpen && <form onSubmit={submitReport} className="mt-4 max-w-2xl rounded-2xl border border-line bg-white p-5"><p className="text-sm leading-6 text-muted">Report an information issue only. Do not include private medical information.</p><label className="mt-4 grid gap-2 text-sm font-bold text-ink">Correction category<select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-line px-3 py-2.5 font-normal">{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="mt-4 grid gap-2 text-sm font-bold text-ink">What needs correction?<textarea required minLength="10" value={report} onChange={(event) => setReport(event.target.value)} rows={4} maxLength="500" placeholder="Describe the detail that looks incorrect." className="resize-y rounded-xl border border-line px-3 py-2.5 text-sm font-normal leading-6 outline-none focus:border-coral focus:ring-2 focus:ring-coral/15" /></label>{submitted ? <p className="mt-4 text-sm font-semibold text-forest">Thank you. Your correction report has been sent for review.</p> : <button className="mt-4 rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-white transition hover:bg-ink">Send correction report</button>}{error && <p className="mt-3 text-sm text-coral">{error}</p>}</form>}</section>
}
