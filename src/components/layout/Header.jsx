import UserMenu from '../UserMenu.jsx'

function Header({ title, subtitle, onMenuClick }) {
  return (
    <header className="topbar">
      <button type="button" className="topbar-menu" onClick={onMenuClick} aria-label="Toggle navigation">
        <i className="bi bi-list"></i>
      </button>
      <div className="topbar-titles">
        <h1 className="topbar-title">{title}</h1>
        {subtitle ? <p className="topbar-subtitle">{subtitle}</p> : null}
      </div>

      <UserMenu profileLink="/profile" passwordLink="/password" />
    </header>
  )
}

export default Header