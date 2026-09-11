import { ArrowRight, MapPinned, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import guideRobot from '../../assets/guide-robot.png'
import './HowItWorks.css'

const paths = [
  { title: 'I know the speciality', icon: MapPinned, steps: ['Choose your city', 'Select your speciality', 'Compare doctor profiles'], action: 'Explore doctors', to: '/explore' },
  { title: 'I’m not sure where to start', icon: Stethoscope, steps: ['Describe your concern', 'Explore suggested specialities', 'Find doctors in your city'], action: 'Find a starting point', to: '/speciality-guide' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="home-how" aria-labelledby="how-heading"><div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="how-heading-row"><div className="how-intro"><p>How mediTrust works</p><h2 id="how-heading">Two ways in.<br /><span>One clearer next step.</span></h2></div><img className="how-robot" src={guideRobot} alt="Friendly healthcare guide robot holding a map" width="1024" height="1536" loading="lazy" decoding="async" /></div>
      <div className="how-paths">{paths.map(({ title, icon: Icon, steps, action, to }, pathIndex) => <article key={title} className="how-path"><div className="how-path-top"><span className="how-icon"><Icon size={24} aria-hidden="true" /></span><span className="how-path-label">PATH {String(pathIndex + 1).padStart(2, '0')}</span></div><h3>{title}</h3><ol>{steps.map((step, index) => <li key={step}><span className="how-step-number">{index + 1}</span><span>{step}</span></li>)}</ol><Link to={to}>{action} <ArrowRight size={18} aria-hidden="true" /></Link></article>)}</div>
      <p className="how-note">Speciality guidance helps you navigate care. It does not provide a diagnosis.</p>
    </div></section>
  )
}

export default HowItWorks
