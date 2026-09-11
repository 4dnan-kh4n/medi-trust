import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { specialities } from '../../data/landingData'
import './Specialities.css'

function Specialities() {
  return (
    <section id="specialities" className="home-specialities" aria-labelledby="specialities-heading"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="specialities-heading"><div><p>Browse by speciality</p><h2 id="specialities-heading">Start with the care<br className="hidden sm:block" /> you need.</h2></div><Link to="/explore" className="specialities-all">Explore all specialities <ArrowRight size={16} aria-hidden="true" /></Link></div>
      <div className="specialities-grid">{specialities.map(({ name, detail, icon: Icon }) => <Link key={name} to="/explore" className="speciality-tile"><span className="speciality-icon"><Icon size={24} aria-hidden="true" /></span><span className="speciality-copy"><strong>{name}</strong><span>{detail}</span></span><ArrowRight className="speciality-arrow" size={18} aria-hidden="true" /></Link>)}</div></div>
      </section>
  )
}

export default Specialities
