import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getReviews } from '../../services/doctorApi'
import './FeaturedProfiles.css'

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
    <section className="home-feedback" aria-labelledby="feedback-heading">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="feedback-heading">
          <div>
            <p>Patient feedback</p>
            <h2 id="feedback-heading">Real experiences,<br /><em>in their own words.</em></h2>
          </div>
          <span className="feedback-count">{reviews.length ? `${reviews.length} shared` : 'Community voices'}</span>
        </div>
        <div className="feedback-stage">
          <span className="feedback-mark" aria-hidden="true">“</span>
          {error ? <p className="feedback-empty">Feedback is unavailable right now. Please try again later.</p> : !activeReview ? <p className="feedback-empty">No feedback has been shared yet.</p> : <article className="feedback-card" aria-live="polite">
            <div className="feedback-stars" aria-label={`${activeReview.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((rating) => <Star key={rating} size={18} fill={rating <= activeReview.rating ? 'currentColor' : 'none'} />)}
            </div>
            <blockquote>“{activeReview.message}”</blockquote>
            <footer>
              <strong>{activeReview.name}</strong>
              <span>{activeReview.type === 'DOCTOR' ? `Doctor experience${activeReview.doctorName ? ` · ${activeReview.doctorName}` : ''}` : 'mediTrust feedback'}</span>
            </footer>
          </article>}
        </div>
        {reviews.length > 1 && <div className="feedback-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous feedback"><ChevronLeft size={18} /></button><div className="feedback-dots" aria-label="Feedback slides">{reviews.map((review, index) => <button key={review.id} type="button" onClick={() => setActiveIndex(index)} className={index === activeIndex ? 'is-active' : ''} aria-label={`Show feedback ${index + 1}`} />)}</div><button type="button" onClick={() => move(1)} aria-label="Next feedback"><ChevronRight size={18} /></button></div>}
      </div>
    </section>
  )
}

export default FeaturedProfiles
