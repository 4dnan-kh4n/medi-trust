import { BadgeCheck, Building2, CalendarCheck, ShieldCheck } from 'lucide-react'

const points = [
  { icon: BadgeCheck, title: 'Verification status', copy: 'See whether key profile information has been verified or needs review.' },
  { icon: CalendarCheck, title: 'Last checked date', copy: 'Understand when important details were last confirmed instead of guessing.' },
  { icon: Building2, title: 'Practice details together', copy: 'Keep clinic and hospital information, schedules, and appointment methods clear.' },
]

function TrustSection() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-18 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24"><div><span className="grid size-12 place-items-center rounded-xl bg-forest text-white"><ShieldCheck size={24} aria-hidden="true" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-forest">Built around information clarity</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-5xl">Details you can evaluate, not claims you have to trust.</h2><p className="mt-5 max-w-md text-base leading-7 text-muted">mediTrust is designed to make doctor information easier to inspect and easier to keep current. It does not label a doctor as “best.”</p></div>
      <div className="self-start divide-y divide-line border-y border-line">{points.map(({ icon: Icon, title, copy }) => <div key={title} className="group flex gap-5 py-6 first:pt-6 last:pb-6"><span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-sand text-forest transition-transform duration-300 group-hover:rotate-6"><Icon size={19} aria-hidden="true" /></span><div><h3 className="text-lg font-bold tracking-[-0.025em] text-ink">{title}</h3><p className="mt-1.5 max-w-lg text-sm leading-6 text-muted">{copy}</p></div></div>)}</div>
    </section>
  )
}

export default TrustSection
