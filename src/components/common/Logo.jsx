import { Link } from 'react-router-dom'
import './Logo.css'

function Logo() {
  return (
    <Link to="/" className="shared-brand" aria-label="mediTrust home"><span aria-hidden="true" />mediTrust</Link>
  )
}

export default Logo
