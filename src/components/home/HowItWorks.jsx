import { ArrowUpRight, MapPinned, SearchCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import guideRobot from '../../assets/guide-robot.png'

const paths = [
  { title: 'I know the speciality', icon: MapPinned, steps: ['Choose your location', 'Select a speciality', 'Compare doctor information', 'View verified details'], action: 'Explore doctors', to: '/explore' },
  { title: 'I am not sure who to consult', icon: Sparkles, steps: ['Describe your concern', 'Receive speciality guidance', 'Choose a location', 'Compare matching doctors'], action: 'Get speciality guidance', to: '/speciality-guide' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden bg-ink py-18 text-white lg:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.62fr]"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.14em] text-mint">Two simple starting points</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">The path should fit what you already know.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/65">Explore directly when you know the speciality. Or use the guidance path when you only know what is worrying you.</p></div><figure className="visual-frame relative mx-auto max-w-[12rem] sm:max-w-xs"><div className="absolute inset-6 rounded-full bg-forest/30 blur-3xl" aria-hidden="true" /><img src={guideRobot} alt="3D guide robot holding a healthcare location map" className="relative w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.32)]" /></figure></div>
      <div className="mt-12 grid gap-5 lg:grid-cols-2">{paths.map(({ title, icon: Icon, steps, action, to }) => <article key={title} className="interactive-card rounded-2xl border border-white/12 bg-white/5 p-6 sm:p-8"><span className="grid size-12 place-items-center rounded-xl bg-mint text-forest transition-transform duration-300 hover:rotate-6"><Icon size={22} aria-hidden="true" /></span><h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h3><ol className="mt-7 space-y-4">{steps.map((step, index) => <li key={step} className="flex items-center gap-3 text-sm text-white/75"><span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/25 text-xs font-bold text-mint">{index + 1}</span>{step}</li>)}</ol><Link to={to} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-mint transition hover:translate-x-1 hover:text-white">{action} <SearchCheck size={16} aria-hidden="true" /></Link></article>)}</div>
      <a href="#specialities" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-mint transition hover:translate-x-1 hover:text-white">Browse a care category <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div></section>
  )
}

export default HowItWorks
