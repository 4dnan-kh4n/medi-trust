import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/common/Logo'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })
const labels = { clinics: 'Clinics', hospitals: 'Hospitals' }

export default function AdminFacilities() {
  const { type = 'clinics' } = useParams()
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const load = useCallback(() => api.get(`/admin/directory/facilities/${type}`, { params: { search } }).then((response) => setItems(response.data.data)).catch(() => navigate('/admin/login')), [navigate, search, type])
  useEffect(() => { load() }, [load])

  if (!labels[type]) return null
  return <main className="min-h-screen bg-canvas px-5 py-8"><div className="mx-auto max-w-6xl"><header className="flex items-center justify-between"><Logo /><Link to="/admin" className="text-sm font-bold text-forest">Dashboard</Link></header><div className="mt-12 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Admin directory</p><h1 className="mt-2 font-display text-5xl text-ink">{labels[type]}</h1></div><Link to={`/admin/facilities/${type}/new`} className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Add {type === 'clinics' ? 'clinic' : 'hospital'}</Link></div><nav className="mt-8 flex gap-4 border-b border-line text-sm font-bold"><Link to="/admin/facilities/clinics" className={type === 'clinics' ? 'border-b-2 border-forest py-3 text-forest' : 'py-3 text-muted'}>Clinics</Link><Link to="/admin/facilities/hospitals" className={type === 'hospitals' ? 'border-b-2 border-forest py-3 text-forest' : 'py-3 text-muted'}>Hospitals</Link><Link to="/admin/specialities" className="py-3 text-muted">Specialities</Link></nav><form onSubmit={(event) => { event.preventDefault(); load() }} className="mt-7 flex gap-2"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${labels[type].toLowerCase()}`} className="rounded-xl border border-line px-4 py-3" /><button className="rounded-xl bg-forest px-4 py-3 text-white">Search</button></form><div className="mt-8 divide-y divide-line border-y border-line">{items.map((item) => <div key={item._id} className="flex flex-wrap items-center justify-between gap-4 py-5"><div><b>{item.name}</b><p className="text-sm text-muted">{item.locality} · {item.location?.city}, {item.location?.state}</p></div><Link to={`/admin/facilities/${type}/${item._id}`} className="rounded-full border border-ink px-4 py-2 text-sm">Edit</Link></div>)}{!items.length && <p className="py-8 text-sm text-muted">No {labels[type].toLowerCase()} found.</p>}</div></div></main>
}
