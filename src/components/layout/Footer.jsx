import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

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
    <footer id="support" className="site-footer">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="footer-main">
          <div id="about">
            <Link to="/" className="footer-brand" aria-label="mediTrust home"><span aria-hidden="true" />mediTrust</Link>
            <p className="footer-statement">Care details, made easier to understand.</p>
            <a href={`mailto:${supportEmail}`} className="footer-support">Contact support <ArrowUpRight size={15} aria-hidden="true" /></a>
            <address className="footer-contact">
              <a href={`tel:+91${phoneNumber}`}><Phone size={16} aria-hidden="true" /><span>+91 {phoneNumber}</span></a>
              <a href={`mailto:${supportEmail}`}><Mail size={16} aria-hidden="true" /><span>{supportEmail}</span></a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" /><span>{address}</span></a>
            </address>
          </div>
          <div className="footer-links">
            {footerLinks.map((group) => <div key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([label, href]) => <li key={label}>{href.startsWith('/') ? <Link to={href}>{label}</Link> : <a href={href}>{label}</a>}</li>)}</ul></div>)}
          </div>
        </div>
      </div>
      <div className="footer-bottom mx-auto max-w-7xl px-5 lg:px-8"><p>© {new Date().getFullYear()} mediTrust</p><Link to="/admin/login">Admin login</Link></div>
    </footer>
  )
}

export default Footer
