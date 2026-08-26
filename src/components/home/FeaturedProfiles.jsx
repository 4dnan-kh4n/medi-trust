import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getReviews } from '../../services/doctorApi'

function FeaturedProfiles() {
  const [reviews, setReviews] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    const loadReviews = () => getReviews().then((data) => {
      if (mounted) setReviews(data)
    }).catch(() => {
      if (mounted) setError(true)
    })
    loadReviews()
    window.addEventListener('meditrust:review-created', loadReviews)
    return () => {
      mounted = false
      window.removeEventListener('meditrust:review-created', loadReviews)
    }
  }, [])

  useEffect(() => {
    if (reviews.length < 2) return undefined
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % reviews.length), 5000)
    return () => window.clearInterval(timer)
  }, [reviews.length])

  const move = (direction) => setActiveIndex((index) => (index + direction + reviews.length) % reviews.length)
  const activeReview = reviews[activeIndex]

  return (
    <section className="border-y border-line bg-sand/55 py-18 lg:py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Patient feedback</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-5xl">Experiences, shared honestly.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted">Feedback submitted by visitors to mediTrust.</p>
        </div>
        <div className="mt-10 min-h-72 rounded-2xl border border-line bg-canvas p-7 shadow-sm sm:p-10">
          {error ? <p className="text-center text-sm text-muted">Feedback is unavailable right now. Please try again later.</p> : !activeReview ? <p className="text-center text-sm text-muted">No feedback has been shared yet.</p> : <article className="mx-auto max-w-2xl text-center" aria-live="polite">
            <div className="flex justify-center gap-1 text-coral" aria-label={`${activeReview.rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((rating) => <Star key={rating} size={20} fill={rating <= activeReview.rating ? 'currentColor' : 'none'} />)}</div>
            <blockquote className="mt-6 text-xl font-medium leading-8 tracking-[-0.025em] text-ink sm:text-2xl">“{activeReview.message}”</blockquote>
            <p className="mt-6 text-sm font-bold text-ink">{activeReview.name}</p>
            <p className="mt-1 text-sm text-muted">{activeReview.type === 'DOCTOR' ? `Doctor experience${activeReview.doctorName ? ` · ${activeReview.doctorName}` : ''}` : 'mediTrust feedback'}</p>
          </article>}
        </div>
        {reviews.length > 1 && <div className="mt-5 flex items-center justify-center gap-4"><button type="button" onClick={() => move(-1)} className="grid size-10 place-items-center rounded-full border border-line bg-canvas text-ink transition hover:border-forest hover:text-forest" aria-label="Previous feedback"><ChevronLeft size={18} /></button><div className="flex gap-2" aria-label="Feedback slides">{reviews.map((review, index) => <button key={review.id} type="button" onClick={() => setActiveIndex(index)} className={`size-2.5 rounded-full ${index === activeIndex ? 'bg-forest' : 'bg-line'}`} aria-label={`Show feedback ${index + 1}`} />)}</div><button type="button" onClick={() => move(1)} className="grid size-10 place-items-center rounded-full border border-line bg-canvas text-ink transition hover:border-forest hover:text-forest" aria-label="Next feedback"><ChevronRight size={18} /></button></div>}
      </div>
    </section>
  )
}

export default FeaturedProfiles
