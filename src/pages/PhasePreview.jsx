import { ArrowLeft, Construction } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/common/Logo'

function PhasePreview({ title, phase = 'a future phase' }) {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-5 py-12"><section className="w-full max-w-lg rounded-2xl border border-line bg-white p-8 shadow-[0_18px_50px_rgba(20,44,49,0.08)]"><Logo /><span className="mt-10 grid size-12 place-items-center rounded-xl bg-mint text-forest"><Construction size={22} aria-hidden="true" /></span><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-forest">{phase}</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em] text-ink">{title}</h1><p className="mt-4 leading-7 text-muted">This navigation destination is intentionally reserved for its approved build phase. The Phase 1 homepage is available to review now.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:text-ink"><ArrowLeft size={16} aria-hidden="true" /> Return home</Link></section></main>
  )
}

export default PhasePreview
