import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { specialities } from '../../data/landingData'

function Specialities() {
  return (
    <section id="specialities" className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Browse by speciality</p><h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-5xl">Start with the care category you need.</h2></div><Link to="/explore" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-forest transition hover:text-ink">Explore all specialities <ArrowRight size={16} aria-hidden="true" /></Link></div>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">{specialities.map(({ name, detail, icon: Icon }) => <Link key={name} to="/explore" className="interactive-card group flex items-center gap-4 bg-canvas p-6 hover:bg-white"><span className="grid size-11 place-items-center rounded-xl bg-mint text-forest transition group-hover:rotate-6 group-hover:bg-forest group-hover:text-white"><Icon size={21} aria-hidden="true" /></span><span><span className="block text-base font-bold text-ink">{name}</span><span className="mt-1 block text-sm text-muted">{detail}</span></span><ArrowRight className="ml-auto text-muted/50 transition group-hover:translate-x-1 group-hover:text-forest" size={17} aria-hidden="true" /></Link>)}</div>
      </section>
  )
}

export default Specialities
