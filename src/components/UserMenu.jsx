import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import UserAvatar from './UserAvatar.jsx'

function UserMenu({ profileLink, passwordLink, showName = false }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleLogout = () => {
    setOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const fullName = `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim()

  return (
    <div className="topbar-user topbar-user--menu" ref={menuRef}>
      <button
        type="button"
        className={`topbar-user-trigger ${open ? 'topbar-user-trigger--open' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <UserAvatar user={currentUser} className="topbar-user-avatar" />
        {showName ? (
          <span className="topbar-user-meta">
            <span className="topbar-user-name">{fullName || 'User'}</span>
            <span className="topbar-user-sub">{currentUser?.email}</span>
          </span>
        ) : (
          <span className="topbar-user-email">{currentUser?.email}</span>
        )}
        <i className={`bi bi-chevron-down topbar-user-caret ${open ? 'topbar-user-caret--open' : ''}`}></i>
      </button>

      {open ? (
        <div className="user-dropdown" role="menu">
          <div className="user-dropdown-head">
            <strong>{fullName || 'User'}</strong>
            <span>{currentUser?.email}</span>
          </div>
          <Link to={profileLink} className="user-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
            <i className="bi bi-person-fill"></i>Profile
          </Link>
          <Link to={passwordLink} className="user-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
            <i className="bi bi-key-fill"></i>Change Password
          </Link>
          <Link to="/" className="user-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
            <i className="bi bi-globe2"></i>View Website
          </Link>
          <button
            type="button"
            className="user-dropdown-item user-dropdown-item--danger"
            role="menuitem"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default UserMenu