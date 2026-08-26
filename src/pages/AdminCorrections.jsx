import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/common/Logo'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })
const labels = { PRACTICE_DETAILS: 'Practice details', SCHEDULE: 'Schedule', SPECIALITY: 'Speciality', PROFILE_DETAILS: 'Profile details', OTHER: 'Other' }

export default function AdminCorrections() {
  const [reports, setReports] = useState([])
  const [status, setStatus] = useState('PENDING')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const load = useCallback(() => api.get('/admin/corrections', { params: status ? { status } : {} }).then((response) => setReports(response.data.data)).catch(() => navigate('/admin/login')), [navigate, status])
  useEffect(() => { load() }, [load])
  async function update(report, nextStatus) { try { await api.patch(`/admin/corrections/${report._id}`, { status: nextStatus, adminNote: report.adminNote || '' }); load() } catch { setError('The report could not be updated.') } }
  return <main className="min-h-screen bg-canvas px-5 py-8"><div className="mx-auto max-w-6xl"><header className="flex items-center justify-between"><Logo /><Link to="/admin" className="text-sm font-bold text-forest">Dashboard</Link></header><div className="mt-12"><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Moderation</p><h1 className="mt-2 font-display text-5xl text-ink">Correction reports</h1><p className="mt-3 text-muted">Reports flag profile information for review; they do not assess medical quality.</p></div><label className="mt-8 inline-grid gap-1 text-sm font-bold">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-line p-3 font-normal"><option value="">All reports</option><option value="PENDING">Pending</option><option value="IN_REVIEW">In review</option><option value="RESOLVED">Resolved</option><option value="DISMISSED">Dismissed</option></select></label>{error && <p className="mt-4 text-coral">{error}</p>}<div className="mt-8 grid gap-4">{reports.map((report) => <article key={report._id} className="rounded-2xl border border-line bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-forest">{labels[report.category]}</p><h2 className="mt-2 text-lg font-extrabold text-ink">{report.doctor?.fullName || 'Deleted doctor profile'}</h2><p className="mt-1 text-sm text-muted">Submitted {new Date(report.createdAt).toLocaleDateString()} · {report.status.replace('_', ' ')}</p></div><select value={report.status} onChange={(event) => update(report, event.target.value)} className="rounded-xl border border-line p-3 text-sm"><option value="PENDING">Pending</option><option value="IN_REVIEW">In review</option><option value="RESOLVED">Resolved</option><option value="DISMISSED">Dismissed</option></select></div><p className="mt-4 rounded-xl bg-sand/50 p-4 text-sm leading-6 text-ink">{report.message}</p></article>)}{!reports.length && <p className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">No reports in this status.</p>}</div></div></main>
}
