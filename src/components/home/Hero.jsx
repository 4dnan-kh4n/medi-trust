import { ArrowRight, MapPin, Stethoscope, UserRound, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const [paused, setPaused] = useState(false)
  return (
    <section className="main-hero" aria-labelledby="home-hero-title">
      <div className="main-hero-layout mx-auto max-w-7xl px-5 lg:px-8">
        <div className="main-hero-copy">
          <h1 id="home-hero-title">Know <span>where to start</span> when care matters.</h1>
          <p className="main-hero-description">Find local doctors, explore specialities, and compare the details that help you decide.</p>
          <div className="main-hero-actions"><Link to="/explore" className="main-hero-button main-hero-primary">Find a doctor <ArrowRight size={17} aria-hidden="true" /></Link><Link to="/speciality-guide" className="main-hero-button main-hero-secondary">Which doctor should I see?</Link></div>
        </div>
        <figure className={`care-journey${paused ? ' is-paused' : ''}`} aria-label="Search journey illustration: choose a city, choose a speciality, then explore doctor profiles.">
          <div className="journey-toolbar"><span>FROM SEARCH TO CARE</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play care journey animation' : 'Pause care journey animation'} aria-pressed={paused}>{paused ? <Play size={15} /> : <Pause size={15} />}</button></div>
          <div className="journey-scene" aria-hidden="true">
            <div className="journey-card journey-city"><span className="journey-icon"><MapPin size={24} /></span><div><small>LOCATION</small><strong>Choose your city</strong></div><span className="journey-selected">✓</span></div>
            <div className="journey-connector connector-one"><i /></div>
            <div className="journey-card journey-speciality"><span className="journey-icon"><Stethoscope size={24} /></span><div><small>SPECIALITY</small><strong>Choose a speciality</strong></div><span className="journey-selected">✓</span></div>
            <div className="journey-connector connector-two"><i /></div>
            <div className="journey-card journey-profiles"><div className="journey-profile-heading"><span className="journey-icon"><UserRound size={24} /></span><div><small>YOUR NEXT STEP</small><strong>Explore profiles</strong></div><ArrowRight size={20} /></div><div className="journey-detail-chips"><span>Experience</span><span>Timings</span><span>Location</span></div></div>
          </div>
          <figcaption><span>One step closer to the right care.</span><Link to="/explore" aria-label="Start finding a doctor"><ArrowRight size={20} /></Link></figcaption>
        </figure>
      </div>
    </section>
  )
}

export default Hero
