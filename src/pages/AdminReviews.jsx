import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/common/Logo'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true })

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const load = useCallback(async () => {
    try {
      const response = await api.get('/admin/reviews')
      setReviews(response.data.data)
      setError('')
    } catch (loadError) {
      if (loadError.response?.status === 401) navigate('/admin/login')
      else setError('Reviews could not be loaded. Please try again.')
    }
  }, [navigate])

  useEffect(() => { load() }, [load])

  async function removeReview(review) {
    if (!window.confirm(`Delete feedback from ${review.name}? This cannot be undone.`)) return
    try {
      await api.delete(`/admin/reviews/${review.id}`)
      setReviews((current) => current.filter((entry) => entry.id !== review.id))
    } catch (deleteError) {
      if (deleteError.response?.status === 401) navigate('/admin/login')
      else setError('The review could not be deleted. Please try again.')
    }
  }

  return <main className="min-h-screen bg-canvas px-5 py-8"><div className="mx-auto max-w-6xl"><header className="flex items-center justify-between"><Logo /><Link to="/admin" className="text-sm font-bold text-forest">Dashboard</Link></header><div className="mt-12"><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Moderation</p><h1 className="mt-2 font-display text-5xl text-ink">Patient feedback</h1><p className="mt-3 text-muted">Review, retain, or remove feedback that appears on the public site.</p></div>{error && <p className="mt-6 rounded-xl border border-coral/30 bg-coral/10 p-4 text-sm text-coral" role="alert">{error}</p>}<div className="mt-8 grid gap-4">{reviews.map((review) => <article key={review.id} className="rounded-2xl border border-line bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-forest">{review.type === 'DOCTOR' ? `Doctor experience${review.doctorName ? ` · ${review.doctorName}` : ''}` : 'mediTrust feedback'}</p><h2 className="mt-2 text-lg font-extrabold text-ink">{review.name}</h2><p className="mt-1 text-sm text-muted">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)} · Submitted {new Date(review.createdAt).toLocaleDateString()}</p></div><button type="button" onClick={() => removeReview(review)} className="rounded-full border border-coral px-4 py-2 text-sm font-bold text-coral transition hover:bg-coral hover:text-white">Delete review</button></div><p className="mt-4 rounded-xl bg-sand/50 p-4 text-sm leading-6 text-ink">{review.message}</p></article>)}{!reviews.length && <p className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">No feedback has been submitted yet.</p>}</div></div></main>
}
