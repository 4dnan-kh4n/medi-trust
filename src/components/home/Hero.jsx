import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroArt from '../../assets/hero-medical-wayfinder.png'

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_83%_25%,rgba(217,238,230,0.72),transparent_27rem)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-18 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(3rem,5.4vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-ink">Find the right doctor, even when <span className="inline-block border border-coral/75 px-[0.08em] text-ink">the city is new</span> to you.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">Compare structured doctor information—from qualifications and experience to clinic timings, appointment methods, and when details were last checked.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/explore" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white ring-1 ring-coral/70 transition hover:bg-coral focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2">Explore doctors <ArrowRight size={17} aria-hidden="true" /></Link><Link to="/speciality-guide" className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:border-coral hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"><Sparkles size={17} aria-hidden="true" /> Which doctor should I consult?</Link></div>
          <p className="mt-5 text-xs leading-5 text-muted">Speciality guidance helps with navigation only. It is not a diagnosis or treatment advice.</p>
        </div>
        <div className="relative self-center lg:pl-8"><div className="absolute inset-8 rounded-full bg-forest/10 blur-3xl" aria-hidden="true" /><img src={heroArt} alt="Abstract 3D medical location marker" className="hero-art relative mx-auto w-full max-w-[13rem] drop-shadow-[0_28px_30px_rgba(23,104,216,0.22)] sm:max-w-sm lg:max-w-md" /></div>
      </div>
    </section>
  )
}

export default Hero
