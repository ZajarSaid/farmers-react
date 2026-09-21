import { Link } from 'react-router-dom'

function StatCard({ icon, label, value, to, accent = 'default' }) {
  const content = (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-icon">
        <i className={`bi bi-${icon}`}></i>
      </div>
      <div className="stat-body">
        <div className="stat-count">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="stat-link">
        {content}
      </Link>
    )
  }
  return content
}

export default StatCard