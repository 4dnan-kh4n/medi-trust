import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import { branding } from '../../constants/branding'

const supportEmail = 'support.meditrust@gmail.com'
const phoneNumber = '7225922802'
const address = 'Government Forest Hostel, Near 74 Bungalows, Bhopal, M.P., 462003'

const footerLinks = [
  { title: 'Platform', links: [['Find doctors', '/explore'], ['Specialities', '/#specialities'], ['How it works', '/#how-it-works']] },
  { title: 'Company', links: [['About us', '/#about'], ['Contact us', '/#support'], ['Support', `mailto:${supportEmail}`]] },
  { title: 'Legal', links: [['Privacy policy', '/privacy'], ['Terms & conditions', '/terms'], ['Medical disclaimer', '/disclaimer']] },
]

function Footer() {
  return (
    <footer id="support" className="border-t border-ink/10 bg-ink text-white"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-18">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr]"><div id="about"><Logo /><p className="mt-5 max-w-sm text-sm leading-6 text-white/65">{branding.description}</p><a href={`mailto:${supportEmail}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mint transition hover:text-white">Contact support <ArrowUpRight size={15} aria-hidden="true" /></a><address className="mt-7 grid max-w-md gap-3 not-italic text-sm leading-6 text-white/65"><a href={`tel:+91${phoneNumber}`} className="flex items-start gap-3 transition hover:text-white"><Phone className="mt-1 shrink-0 text-mint" size={16} aria-hidden="true" /><span>+91 {phoneNumber}</span></a><a href={`mailto:${supportEmail}`} className="flex items-start gap-3 transition hover:text-white"><Mail className="mt-1 shrink-0 text-mint" size={16} aria-hidden="true" /><span>{supportEmail}</span></a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition hover:text-white"><MapPin className="mt-1 shrink-0 text-mint" size={16} aria-hidden="true" /><span>{address}</span></a></address></div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{footerLinks.map((group) => <div key={group.title}><h2 className="text-sm font-semibold text-white">{group.title}</h2><ul className="mt-4 space-y-3">{group.links.map(([label, href]) => <li key={label}>{href.startsWith('/') ? <Link to={href} className="text-sm text-white/60 transition hover:text-white">{label}</Link> : <a href={href} className="text-sm text-white/60 transition hover:text-white">{label}</a>}</li>)}</ul></div>)}</div>
      </div>
      <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} mediTrust. Built for clearer care discovery.</p><Link to="/admin/login" className="w-fit transition hover:text-white">Admin login</Link></div>
    </div></footer>
  )
}

export default Footer
