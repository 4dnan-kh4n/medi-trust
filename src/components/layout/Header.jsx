import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo'

const navigation = [
  { label: 'Find Doctors', href: '/explore' }, { label: 'Which Doctor?', href: '/speciality-guide' },
  { label: 'Specialities', href: '/#specialities' }, { label: 'How it works', href: '/#how-it-works' }, { label: 'About', href: '/#about' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const navLink = (item, mobile = false) => {
    const className = mobile ? 'rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-sand' : 'nav-link text-sm font-medium text-muted transition-colors hover:text-forest'
    return item.href.startsWith('/') ? <Link key={item.label} to={item.href} onClick={mobile ? closeMenu : undefined} className={className}>{item.label}</Link> : <a key={item.label} href={item.href} onClick={mobile ? closeMenu : undefined} className={className}>{item.label}</a>
  }
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/92 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{navigation.map((item) => navLink(item))}</nav>
        <Link to="/explore" className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 lg:inline-flex">Explore doctors</Link>
        <button type="button" className="grid size-10 place-items-center rounded-lg text-ink hover:bg-sand lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="border-t border-line bg-canvas px-5 py-5 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-7xl gap-1">{navigation.map((item) => navLink(item, true))}<Link to="/explore" onClick={closeMenu} className="mt-3 rounded-lg bg-ink px-4 py-3 text-center text-sm font-semibold text-white">Explore doctors</Link></div></nav>}
    </header>
  )
}

export default Header
