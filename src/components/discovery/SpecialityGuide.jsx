import { AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { getSpecialityGuidance } from '../../services/doctorApi'

function SpecialityGuide({ onChoose }) {
  const [concern, setConcern] = useState('')
  const [guidance, setGuidance] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (concern.trim().length < 10) return
    setLoading(true); setError('')
    try { setGuidance(await getSpecialityGuidance(concern.trim())) } catch (requestError) { setGuidance(null); setError(requestError.response?.data?.error?.message || 'The speciality guide could not respond. Please try again.') } finally { setLoading(false) }
  }

  return (
    <div className="border-y border-line py-6">
      <form onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="health-concern">Describe your concern in your own words</label>
        <textarea id="health-concern" value={concern} onChange={(event) => setConcern(event.target.value)} placeholder="For example: I have had a skin rash and itching for the last few days." maxLength={600} rows={5} className="mt-2 w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/70 focus:border-forest focus:ring-2 focus:ring-forest/15" />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-xs leading-5 text-muted"><ShieldCheck className="mr-1 inline text-forest" size={14} aria-hidden="true" /> Your text is sent only to create this response and is not saved by mediTrust. This guide does not diagnose conditions, recommend treatment, or replace professional care.</p><button type="submit" disabled={loading || concern.trim().length < 10} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-forest disabled:cursor-not-allowed disabled:bg-line"><Sparkles size={16} aria-hidden="true" /> {loading ? 'Finding categories…' : 'See suggested categories'}</button></div>
      </form>
      {error && <div role="alert" className="mt-6 rounded-2xl border border-coral/35 bg-[#fff4f0] p-5 text-sm text-coral"><p>{error}</p><button type="button" onClick={() => handleSubmit({ preventDefault() {} })} className="mt-3 font-bold underline underline-offset-4">Try again</button></div>}
      {guidance && <div className={`mt-6 rounded-2xl border p-5 ${guidance.status === 'URGENT' ? 'border-coral/40 bg-[#fff4f0]' : 'border-forest/20 bg-mint/45'}`} role={guidance.status === 'URGENT' ? 'alert' : 'status'}>
        <div className="flex gap-3"><span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl ${guidance.status === 'URGENT' ? 'bg-coral/15 text-coral' : 'bg-white text-forest'}`}>{guidance.status === 'URGENT' ? <AlertTriangle size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}</span><div><h3 className="font-bold text-ink">{guidance.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{guidance.message}</p>{guidance.uncertainty && <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-muted">Uncertainty: {guidance.uncertainty.toLowerCase()}</p>}{guidance.specialities?.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{guidance.specialities.map((speciality) => <button key={speciality.slug} type="button" onClick={() => onChoose(speciality.name)} className="inline-flex items-center gap-1 rounded-full border border-forest/25 bg-white px-3 py-2 text-sm font-bold text-forest transition hover:border-forest hover:bg-forest hover:text-white">{speciality.name} <ArrowRight size={14} aria-hidden="true" /></button>)}</div>}{guidance.canRetry && <button type="button" onClick={() => handleSubmit({ preventDefault() {} })} disabled={loading} className="mt-4 text-sm font-bold text-forest underline underline-offset-4 disabled:opacity-60">Try the guide again</button>}</div></div>
      </div>}
    </div>
  )
}

export default SpecialityGuide
