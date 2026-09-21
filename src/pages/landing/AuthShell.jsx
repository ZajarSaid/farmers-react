import { Link } from 'react-router-dom'

export function AuthTopbar() {
  return (
    <nav className="auth-topbar">
      <div className="container">
        <Link className="site-brand" to="/">
          <span className="site-brand-badge">
            <img src="/tz_gov_logo.png" alt="Tanzania Government logo" />
          </span>
          <span>Farmers Registry</span>
        </Link>
        <div className="auth-topbar-links">
          <Link className="site-nav-link" to="/">
            <i className="bi bi-house-door me-1"></i>Go to Website
          </Link>
          <Link className="btn btn-solid" to="/register">
            <i className="bi bi-person-plus me-1"></i>Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export function AuthFooter() {
  return (
    <footer className="auth-footer">
      &copy; 2026 Ministry of Agriculture. All rights reserved.
    </footer>
  )
}

export function AuthShell({ children }) {
  return (
    <div className="site site--auth">
      <AuthTopbar />
      <main>{children}</main>
      <AuthFooter />
    </div>
  )
}