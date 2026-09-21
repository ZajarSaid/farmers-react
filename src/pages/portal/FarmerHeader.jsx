import UserMenu from '../../components/UserMenu.jsx'

function FarmerHeader({ title, subtitle, onMenuClick }) {
  return (
    <header className="topbar topbar--farmer">
      <button type="button" className="topbar-menu" onClick={onMenuClick} aria-label="Toggle navigation">
        <i className="bi bi-list"></i>
      </button>

      <div className="topbar-titles">
        <h1 className="topbar-title">{title}</h1>
        {subtitle ? <p className="topbar-subtitle">{subtitle}</p> : null}
      </div>

      <UserMenu profileLink="/me/profile" passwordLink="/me/password" showName />
    </header>
  )
}

export default FarmerHeader