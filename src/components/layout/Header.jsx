import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const navigation = [
  { label: 'Find Doctors', href: '/explore' }, { label: 'Which Doctor?', href: '/speciality-guide' },
  { label: 'Specialities', href: '/#specialities' }, { label: 'How it works', href: '/#how-it-works' }, { label: 'About', href: '/#about' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const navLink = (item, mobile = false) => {
    const className = mobile ? 'header-mobile-link' : 'nav-link header-link'
    return item.href.startsWith('/') ? <Link key={item.label} to={item.href} onClick={mobile ? closeMenu : undefined} className={className}>{item.label}</Link> : <a key={item.label} href={item.href} onClick={mobile ? closeMenu : undefined} className={className}>{item.label}</a>
  }
  return (
    <header className="main-header sticky top-0 z-50" onKeyDown={(event) => { if (event.key === 'Escape') closeMenu() }}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
        <Link to="/" onClick={closeMenu} className="header-brand" aria-label="mediTrust home"><span className="header-brand-mark" aria-hidden="true" />mediTrust</Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{navigation.map((item) => navLink(item))}</nav>
        <Link to="/explore" className="header-cta hidden lg:inline-flex">Explore doctors <span aria-hidden="true">↗</span></Link>
        <button type="button" className="header-toggle grid size-11 place-items-center rounded-full lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="header-mobile px-5 py-5 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-7xl gap-1">{navigation.map((item) => navLink(item, true))}<Link to="/explore" onClick={closeMenu} className="header-cta mt-3">Explore doctors <span aria-hidden="true">↗</span></Link></div></nav>}
    </header>
  )
}

export default Header
