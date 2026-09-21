import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

function scrollToId(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  const toggle = document.getElementById('siteNavToggle')
  if (toggle) {
    toggle.checked = false
  }
}

const ABOUT_LINKS = [
  { label: 'Who We Are', icon: 'bi-people-fill', target: 'about' },
  { label: 'How It Works', icon: 'bi-signpost-2-fill', target: 'how-it-works' },
  { label: 'Our Services', icon: 'bi-grid-1x2-fill', target: 'services' },
  { label: 'Contact Us', icon: 'bi-telephone-fill', target: 'contact' },
]

const SERVICE_LINKS = [
  { label: 'Farmer Registration', icon: 'bi-person-plus-fill', to: '/register' },
  { label: 'Farm Registration', icon: 'bi-house-gear-fill', to: '/farms' },
  { label: 'Market Prices', icon: 'bi-cash-coin', to: '/regional-prices' },
  { label: 'Output Verification', icon: 'bi-patch-check-fill', to: '/output-verification' },
  { label: 'Officer Login', icon: 'bi-box-arrow-in-right', to: '/login' },
]

export default function LandingNavbar() {
  const { isAuthenticated, currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="site-navbar">
      <div className="container">
        <Link className="site-brand" to="/">
          <span className="site-brand-badge">
            <img src="/tz_gov_logo.png" alt="Tanzania Government logo" />
          </span>
          <span>Farmers Registry</span>
        </Link>

        <input type="checkbox" id="siteNavToggle" className="site-nav-toggle" />
        <label htmlFor="siteNavToggle" className="site-nav-hamburger" aria-label="Toggle navigation">
          <i className="bi bi-list"></i>
        </label>

        <div className="site-nav-links">
          <a className="site-nav-link" href="#home" onClick={(event) => { event.preventDefault(); scrollToId('home') }}>Home</a>

          <div className="site-nav-dropdown">
            <a className="site-nav-link" href="#about" onClick={(event) => { event.preventDefault(); scrollToId('about') }}>
              About <i className="bi bi-chevron-down site-nav-dropdown-caret"></i>
            </a>
            <div className="site-nav-dropdown-menu">
              {ABOUT_LINKS.map((link) => (
                <a
                  key={link.target}
                  className="site-nav-dropdown-item"
                  href={`#${link.target}`}
                  onClick={(event) => { event.preventDefault(); scrollToId(link.target) }}
                >
                  <i className={`bi ${link.icon}`}></i>{link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="site-nav-dropdown">
            <a className="site-nav-link" href="#services" onClick={(event) => { event.preventDefault(); scrollToId('services') }}>
              Services <i className="bi bi-chevron-down site-nav-dropdown-caret"></i>
            </a>
            <div className="site-nav-dropdown-menu">
              {SERVICE_LINKS.map((link) => (
                <Link key={link.to} className="site-nav-dropdown-item" to={link.to}>
                  <i className={`bi ${link.icon}`}></i>{link.label}
                </Link>
              ))}
            </div>
          </div>

          <a className="site-nav-link" href="#contact" onClick={(event) => { event.preventDefault(); scrollToId('contact') }}>Contact</a>

          {isAuthenticated ? (
            <>
              <span className="site-nav-user">
                <i className="bi bi-person-circle me-1"></i>{currentUser?.username}
              </span>
              <Link className="btn btn-solid" to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i>My Account
              </Link>
              <button type="button" className="btn btn-soft" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-soft" to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i>Login
              </Link>
              <Link className="btn btn-solid" to="/register">
                <i className="bi bi-person-plus me-1"></i>Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}