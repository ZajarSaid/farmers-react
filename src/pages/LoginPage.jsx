import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { AuthShell } from './landing/AuthShell.jsx'

export default function LoginPage() {
  const { login, isAuthenticated, isAdmin } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const justRegistered = location.state?.justRegistered

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/dashboard' : '/me'} replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }
    const result = login(email, password)
    if (result.ok) {
      success(`Welcome back, ${result.farmer.firstName}!`)
      navigate(result.farmer.isAdmin ? '/dashboard' : '/me', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <AuthShell>
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-side">
            <h2>Welcome Back, Farmer!</h2>
            <p>Login to access your farm records, outputs and market prices.</p>
            <ul>
              <li><i className="bi bi-check-circle-fill"></i><span>Manage your registered farms</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Track crop outputs and rankings</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>View regional market crop prices</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Keep your profile up to date</span></li>
            </ul>
          </div>

          <div className="auth-main">
            <div className="auth-heading">
              <div className="auth-logo">
                <img src="/tz_gov_logo.png" alt="Tanzania Government logo" />
              </div>
              <h3 className="auth-title">Account Login</h3>
              <p className="auth-sub">Sign in with your registered email</p>
            </div>

            {justRegistered && (
              <p className="alert alert--success">
                <i className="bi bi-check-circle-fill me-1"></i>
                Your account has been created successfully, please login to continue.
              </p>
            )}

            {error && (
              <p className="alert alert--danger">
                <i className="bi bi-exclamation-triangle-fill me-1"></i>
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-field">
                <label htmlFor="loginEmail">Email Address</label>
                <div className="input-icon-group">
                  <i className="bi bi-envelope-fill"></i>
                  <input
                    type="email"
                    id="loginEmail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="loginPassword">Password</label>
                <div className="input-icon-group">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="loginPassword"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="link-button small"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-auth">
                <i className="bi bi-box-arrow-in-right me-1"></i>Login
              </button>

              <p className="auth-alt">
                Don&apos;t have an account? <Link to="/register">Register here</Link>
              </p>
            </form>

            <p className="auth-hint">
              Demo credentials — seed farmer accounts use password <code>farmer123</code>. Admin
              login: <code>admin@gmail.com</code> / <code>admin123</code>.
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  )
}