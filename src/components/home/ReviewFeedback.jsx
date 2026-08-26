import { CheckCircle2, MessageSquareMore, Star } from 'lucide-react'
import { useState } from 'react'
import feedbackArt from '../../assets/feedback-3d.png'
import { submitReview } from '../../services/doctorApi'

const initialForm = { type: 'platform', rating: 0, doctorName: '', name: '', message: '' }

function ReviewFeedback() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.rating || form.message.trim().length < 10 || (form.type === 'doctor' && !form.doctorName.trim())) {
      setError('Choose a rating, add at least 10 characters, and name the doctor profile for a doctor review.')
      return
    }
    try {
      await submitReview({ ...form, message: form.message.trim(), doctorName: form.doctorName.trim(), name: form.name.trim() })
      window.dispatchEvent(new Event('meditrust:review-created'))
      setSubmitted(true)
      setError('')
      setForm(initialForm)
    } catch (submissionError) {
      setError(submissionError.response?.data?.message || 'Your feedback could not be saved. Please try again.')
    }
  }

  if (submitted) {
    return (
      <section id="feedback" className="bg-ink py-16 text-white lg:py-20">
        <div className="mx-auto max-w-xl px-5 lg:px-8">
          <div className="rounded-2xl bg-white p-8 text-center text-ink shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:p-10">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint text-forest"><CheckCircle2 size={28} aria-hidden="true" /></span>
            <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em]">Thank you for sharing.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">Your feedback has been saved and may appear in the patient feedback section.</p>
            <button type="button" onClick={() => setSubmitted(false)} className="mt-6 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-ink">Share another response</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="feedback" className="overflow-hidden bg-ink py-18 text-white lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-mint text-forest"><MessageSquareMore size={23} aria-hidden="true" /></span>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-mint">Feedback and patient experience</p>
          </div>
          <h2 className="mt-7 font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Your experience deserves a careful place to be heard.</h2>
          <figure className="visual-frame mt-8 w-full max-w-52 sm:max-w-60">
            <img src={feedbackArt} alt="3D illustration of constructive feedback" className="h-auto w-full" />
          </figure>
        </div>

        <form onSubmit={handleSubmit} className="self-center rounded-2xl bg-white p-6 text-ink shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:p-8">
          <>
              <fieldset>
                <legend className="text-sm font-bold">What would you like to share?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => update('type', 'platform')} className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${form.type === 'platform' ? 'border-forest bg-mint text-forest' : 'border-line text-muted hover:border-forest/50'}`}>mediTrust feedback</button>
                  <button type="button" onClick={() => update('type', 'doctor')} className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${form.type === 'doctor' ? 'border-forest bg-mint text-forest' : 'border-line text-muted hover:border-forest/50'}`}>Doctor experience</button>
                </div>
              </fieldset>
              {form.type === 'doctor' && <label className="mt-5 block text-sm font-bold">Doctor profile or name<input value={form.doctorName} onChange={(event) => update('doctorName', event.target.value)} className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm font-medium outline-none transition focus:border-forest focus:ring-2 focus:ring-mint" placeholder="Enter the doctor profile you visited" /></label>}
              <fieldset className="mt-5"><legend className="text-sm font-bold">Your rating</legend><div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" onClick={() => update('rating', value)} className="rounded p-1 text-coral transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest" aria-label={`${value} star${value === 1 ? '' : 's'}`}><Star size={27} fill={value <= form.rating ? 'currentColor' : 'none'} /></button>)}</div></fieldset>
              <div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold">Name <span className="font-normal text-muted">(optional)</span><input value={form.name} onChange={(event) => update('name', event.target.value)} className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm font-medium outline-none transition focus:border-forest focus:ring-2 focus:ring-mint" placeholder="Your name" /></label><p className="self-end pb-2 text-xs leading-5 text-muted">Please do not include private medical details, phone numbers, or addresses.</p></div>
              <label className="mt-5 block text-sm font-bold">Your feedback<textarea value={form.message} onChange={(event) => update('message', event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-xl border border-line px-4 py-3 text-sm font-medium outline-none transition focus:border-forest focus:ring-2 focus:ring-mint" placeholder="Tell us what worked well or what could be better." /></label>
              {error && <p className="mt-3 text-sm font-medium text-coral" role="alert">{error}</p>}
              <button type="submit" className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-ink focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2">Save feedback</button>
          </>
        </form>
      </div>
    </section>
  )
}

export default ReviewFeedback
