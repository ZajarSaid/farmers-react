import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV_ITEMS = [
  { section: 'Core', label: 'Dashboard', to: '/dashboard', icon: 'speedometer2', tone: 'cyan' },
  { section: 'Management', label: 'Farmers', to: '/farmers', icon: 'people-fill', tone: 'green' },
  { section: 'Management', label: 'Farms', to: '/farms', icon: 'tree-fill', tone: 'emerald' },
  { section: 'Management', label: 'Crops', to: '/crops', icon: 'basket-fill', tone: 'amber' },
  { section: 'Management', label: 'Regional Prices', to: '/regional-prices', icon: 'currency-exchange', tone: 'violet' },
  { section: 'Verification', label: 'Output Verification', to: '/output-verification', icon: 'patch-check-fill', tone: 'sky' },
  { section: 'Summary', label: 'Production Trends', to: '/production', icon: 'bar-chart-fill', tone: 'pink' },
  { section: 'Summary', label: 'Reports', to: '/reports', icon: 'file-earmark-spreadsheet-fill', tone: 'orange' },
  { section: 'Account', label: 'Profile', to: '/profile', icon: 'person-fill', tone: 'purple' },
  { section: 'Account', label: 'Change Password', to: '/password', icon: 'key-fill', tone: 'rose' },
]

function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const sections = [...new Set(NAV_ITEMS.map((item) => item.section))]

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'sidebar-overlay--open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">
            <img src="/tz_gov_logo.png" alt="Tanzania Government logo" />
          </span>
          <span className="sidebar-brand-text">Farmer&apos;s Registry</span>
        </div>

        <nav className="sidebar-nav">
          {sections.map((section) => (
            <div key={section}>
              <div className="sidebar-label">{section}</div>
              {NAV_ITEMS.filter((item) => item.section === section).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
                  onClick={onClose}
                >
                  <i className={`bi bi-${item.icon} sidebar-icon sidebar-icon--${item.tone}`}></i>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/" className="sidebar-link">
            <i className="bi bi-globe2 sidebar-icon sidebar-icon--teal"></i>
            <span>View Website</span>
          </NavLink>
          <button type="button" className="sidebar-link sidebar-logout" onClick={logout}>
            <i className="bi bi-box-arrow-right sidebar-icon sidebar-icon--red"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar