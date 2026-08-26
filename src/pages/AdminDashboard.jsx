import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/common/Logo'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/admin/dashboard').then((response) => setData(response.data.data)).catch(() => navigate('/admin/login'))
  }, [navigate])

  async function logout() {
    await api.post('/auth/logout')
    navigate('/admin/login')
  }

  if (!data) return <main className="grid min-h-screen place-items-center bg-canvas">Loading…</main>

  const metrics = [['Active doctors', data.totalDoctors], ['Verified', data.verifiedDoctors], ['Needs review', data.pendingDoctors]]
  const operations = [
    ['/admin/doctors', 'Doctor management', 'Manage doctor profiles, schedules, appointment options, and photos.', true],
    ['/admin/facilities/clinics', 'Clinics & hospitals', 'Maintain practice locations and their contact details.'],
    ['/admin/specialities', 'Specialities', 'Keep the discovery categories clear and current.'],
    ['/admin/corrections', 'Correction reports', 'Review information corrections submitted by visitors.'],
    ['/admin/verifications', 'Verification queue', 'Check profile information and update verification status.'],
    ['/admin/reviews', 'Patient feedback', 'View or delete feedback displayed on the public site.'],
  ]

  return <main className="min-h-screen bg-canvas px-5 py-8"><div className="mx-auto max-w-6xl"><header className="flex flex-wrap items-center justify-between gap-3"><Logo /><div className="flex gap-3"><Link to="/admin/doctors" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Manage doctors →</Link><button type="button" onClick={logout} className="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink">Sign out</button></div></header><h1 className="mt-12 font-display text-5xl text-ink">Admin operations</h1><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{metrics.map(([label, value]) => <section key={label} className="rounded-2xl border border-line bg-white p-5"><p className="text-sm text-muted">{label}</p><p className="mt-3 font-display text-5xl text-ink">{value}</p></section>)}</div><section className="mt-10"><h2 className="font-display text-3xl text-ink">Operations</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{operations.map(([to, title, description, featured]) => <Link key={to} to={to} className={`rounded-2xl p-6 transition hover:-translate-y-0.5 ${featured ? 'bg-ink text-white' : 'border border-line bg-white text-ink'}`}><h3 className="text-xl font-bold">{title} →</h3><p className={`mt-2 text-sm ${featured ? 'text-white/75' : 'text-muted'}`}>{description}</p></Link>)}</div></section></div></main>
}
