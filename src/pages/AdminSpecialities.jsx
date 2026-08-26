import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/common/Logo'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })

export default function AdminSpecialities() {
  const [specialities, setSpecialities] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const load = useCallback(() => api.get('/admin/directory/specialities', { params: { search } }).then((response) => setSpecialities(response.data.data)).catch(() => navigate('/admin/login')), [navigate, search])
  useEffect(() => { load() }, [load])
  async function toggle(speciality) { try { await api.patch(`/admin/directory/specialities/${speciality._id}/status`, { isActive: !speciality.isActive }); load() } catch { setError('The speciality status could not be updated.') } }
  return <main className="min-h-screen bg-canvas px-5 py-8"><div className="mx-auto max-w-6xl"><header className="flex items-center justify-between"><Logo /><Link to="/admin" className="text-sm font-bold text-forest">Dashboard</Link></header><div className="mt-12 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Admin directory</p><h1 className="mt-2 font-display text-5xl text-ink">Specialities</h1></div><Link to="/admin/specialities/new" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Add speciality</Link></div><nav className="mt-8 flex gap-4 border-b border-line text-sm font-bold"><Link to="/admin/facilities/clinics" className="py-3 text-muted">Clinics</Link><Link to="/admin/facilities/hospitals" className="py-3 text-muted">Hospitals</Link><Link to="/admin/specialities" className="border-b-2 border-forest py-3 text-forest">Specialities</Link></nav><form onSubmit={(event) => { event.preventDefault(); load() }} className="mt-7 flex gap-2"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search specialities" className="rounded-xl border border-line px-4 py-3" /><button className="rounded-xl bg-forest px-4 py-3 text-white">Search</button></form>{error && <p className="mt-4 text-coral">{error}</p>}<div className="mt-8 divide-y divide-line border-y border-line">{specialities.map((speciality) => <div key={speciality._id} className="flex flex-wrap items-center justify-between gap-4 py-5"><div><b>{speciality.name}</b><p className="text-sm text-muted">{speciality.slug} · {speciality.isActive ? 'Active' : 'Inactive'}</p></div><div className="flex gap-2"><Link to={`/admin/specialities/${speciality._id}`} className="rounded-full border border-ink px-4 py-2 text-sm">Edit</Link><button type="button" onClick={() => toggle(speciality)} className="rounded-full border border-line px-4 py-2 text-sm">{speciality.isActive ? 'Deactivate' : 'Activate'}</button></div></div>)}</div></div></main>
}
