import { CheckCircle2, MessageSquareMore, Star } from 'lucide-react'
import { useState } from 'react'
import feedbackArt from '../../assets/feedback-3d.png'
import { submitReview } from '../../services/doctorApi'
import './ReviewFeedback.css'

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
      <section id="feedback" className="home-review home-review-success">
        <div className="review-success-card">
          <span><CheckCircle2 size={28} aria-hidden="true" /></span>
          <h2>Thank you for sharing.</h2>
          <p>Your feedback has been saved and may appear in the patient feedback section.</p>
          <button type="button" onClick={() => setSubmitted(false)}>Share another response</button>
          </div>
      </section>
    )
  }

  return (
    <section id="feedback" className="home-review" aria-labelledby="review-heading">
      <div className="mx-auto grid max-w-7xl gap-11 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
        <div className="review-intro">
          <span className="review-icon"><MessageSquareMore size={23} aria-hidden="true" /></span>
          <p>Feedback</p>
          <h2 id="review-heading">A better directory<br />starts with <em>listening.</em></h2>
          <span className="review-rule" aria-hidden="true" />
          <img className="review-art" src={feedbackArt} alt="Illustration of patient feedback" width="720" height="720" loading="lazy" decoding="async" />
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <fieldset>
            <legend>What would you like to share?</legend>
            <div className="review-type-grid">
              <button type="button" onClick={() => update('type', 'platform')} className={form.type === 'platform' ? 'is-selected' : ''}>mediTrust feedback</button>
              <button type="button" onClick={() => update('type', 'doctor')} className={form.type === 'doctor' ? 'is-selected' : ''}>Doctor experience</button>
            </div>
          </fieldset>
          {form.type === 'doctor' && <label>Doctor profile or name<input value={form.doctorName} onChange={(event) => update('doctorName', event.target.value)} placeholder="Enter the doctor profile you visited" /></label>}
          <fieldset className="review-rating"><legend>Your rating</legend><div>{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" onClick={() => update('rating', value)} aria-label={`${value} star${value === 1 ? '' : 's'}`}><Star size={25} fill={value <= form.rating ? 'currentColor' : 'none'} /></button>)}</div></fieldset>
          <div className="review-name-row"><label>Name <span>(optional)</span><input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" /></label><p>Please do not include private medical details, phone numbers, or addresses.</p></div>
          <label>Your feedback<textarea value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us what worked well or what could be better." /></label>
          {error && <p className="review-error" role="alert">{error}</p>}
          <button type="submit" className="review-submit">Save feedback</button>
        </form>
      </div>
    </section>
  )
}

export default ReviewFeedback
