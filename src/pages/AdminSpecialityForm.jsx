import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })
const blank = { name: '', slug: '', aliases: '', description: '' }

export default function AdminSpecialityForm() {
  const { id } = useParams()
  const [form, setForm] = useState(blank)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => { if (!id) return; api.get(`/admin/directory/specialities/${id}`).then((response) => { const speciality = response.data.data; setForm({ name: speciality.name, slug: speciality.slug, aliases: (speciality.aliases || []).join(', '), description: speciality.description || '' }) }).catch(() => navigate('/admin/login')) }, [id, navigate])
  async function submit(event) { event.preventDefault(); setError(''); const payload = { ...form, aliases: form.aliases.split(',').map((alias) => alias.trim().toLowerCase()).filter(Boolean) }; try { await (id ? api.patch(`/admin/directory/specialities/${id}`, payload) : api.post('/admin/directory/specialities', payload)); navigate('/admin/specialities') } catch (requestError) { setError(requestError.response?.data?.error?.message || 'Could not save speciality.') } }
  return <main className="min-h-screen bg-canvas px-5 py-8"><form onSubmit={submit} className="mx-auto grid max-w-2xl gap-5"><Link to="/admin/specialities" className="text-sm font-bold text-forest">← Specialities</Link><h1 className="font-display text-5xl text-ink">{id ? 'Edit speciality' : 'Add speciality'}</h1><div className="grid gap-4 rounded-2xl border border-line bg-white p-5"><label className="grid gap-1 font-bold">Name<input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="rounded-xl border border-line p-3 font-normal" /></label><label className="grid gap-1 font-bold">Slug<input required pattern="[a-z0-9-]+" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} className="rounded-xl border border-line p-3 font-normal" /></label><label className="grid gap-1 font-bold">Search aliases <span className="font-normal text-muted">(comma separated)</span><input value={form.aliases} onChange={(event) => setForm((current) => ({ ...current, aliases: event.target.value }))} placeholder="e.g. skin doctor, heart doctor" className="rounded-xl border border-line p-3 font-normal" /><span className="text-xs font-normal text-muted">These make common search terms find this speciality.</span></label><label className="grid gap-1 font-bold">Description<textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="min-h-28 rounded-xl border border-line p-3 font-normal" /></label></div>{error && <p className="rounded-xl bg-coral/10 p-3 text-coral">{error}</p>}<button className="w-fit rounded-full bg-ink px-6 py-3 font-bold text-white">Save speciality</button></form></main>
}
