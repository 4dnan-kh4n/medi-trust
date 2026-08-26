import logoImage from '../../assets/meditrust-logo.png'

function Logo() {
  return (
    <a href="/" className="inline-flex items-center" aria-label="mediTrust home">
      <img src={logoImage} alt="mediTrust" className="h-14 w-auto object-contain drop-shadow-[0_4px_8px_rgba(9,35,74,0.12)]" />
    </a>
  )
}

export default Logo
