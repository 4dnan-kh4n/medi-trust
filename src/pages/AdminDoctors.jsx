import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/common/Logo'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const load = useCallback(() => {
    return api.get('/admin/doctors', { params: { search } })
      .then((response) => setDoctors(response.data.data))
      .catch(() => navigate('/admin/login'))
  }, [navigate, search])

  useEffect(() => { load() }, [load])

  async function toggle(doctor) {
    try {
      await api.patch(`/admin/doctors/${doctor._id}/status`, { isActive: !doctor.isActive })
      load()
    } catch {
      setError('The doctor status could not be updated. Try again.')
    }
  }

  return <main className="min-h-screen bg-canvas px-5 py-8"><div className="mx-auto max-w-6xl"><header className="flex items-center justify-between"><Logo /><Link to="/admin" className="text-sm font-bold text-forest">Dashboard</Link></header><div className="mt-12 flex flex-wrap items-center justify-between gap-4"><h1 className="font-display text-5xl text-ink">Doctor management</h1><Link to="/admin/doctors/new" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Add doctor</Link></div><form onSubmit={(event) => { event.preventDefault(); load() }} className="mt-8 flex gap-2"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search doctor" className="rounded-xl border border-line px-4 py-3" /><button className="rounded-xl bg-forest px-4 py-3 text-white">Search</button></form>{error && <p className="mt-4 text-coral">{error}</p>}<div className="mt-8 divide-y divide-line border-y border-line">{doctors.map((doctor) => <div key={doctor._id} className="flex flex-wrap items-center justify-between gap-4 py-5"><div><b>{doctor.fullName}</b><p className="text-sm text-muted">{doctor.primarySpeciality?.name} · {doctor.primaryLocation?.city} · {doctor.verification.status}</p></div><div className="flex gap-2"><Link to={`/admin/doctors/${doctor._id}`} className="rounded-full border border-ink px-4 py-2 text-sm">Edit</Link><button type="button" onClick={() => toggle(doctor)} className="rounded-full border border-line px-4 py-2 text-sm">{doctor.isActive ? 'Deactivate' : 'Activate'}</button></div></div>)}</div></div></main>
}
