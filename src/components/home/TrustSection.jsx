import { BadgeCheck, Building2, CalendarCheck, ShieldCheck } from 'lucide-react'
import './TrustSection.css'

const points = [
  { icon: BadgeCheck, title: 'Verification status', copy: 'See whether key profile information has been verified or needs review.' },
  { icon: CalendarCheck, title: 'Last checked date', copy: 'Understand when important details were last confirmed instead of guessing.' },
  { icon: Building2, title: 'Practice details together', copy: 'Keep clinic and hospital information, schedules, and appointment methods clear.' },
]

function TrustSection() {
  return (
    <section id="about" className="home-trust" aria-labelledby="trust-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
        <div className="trust-intro">
          <span className="trust-shield"><ShieldCheck size={23} aria-hidden="true" /></span>
          <p>Designed for clear choices</p>
          <h2 id="trust-heading">Details you can<br />actually <em>evaluate.</em></h2>
          <span className="trust-rule" aria-hidden="true" />
        </div>
        <div className="trust-points">
          {points.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="trust-point">
              <span className="trust-index">0{index + 1}</span>
              <span className="trust-icon"><Icon size={20} aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
