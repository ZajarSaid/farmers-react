import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'

export default function FarmerPassword() {
  const { currentUser, changePassword, logout } = useAuth()
  const { error: toastError } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const setField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')

    if (!form.currentPassword) {
      setFormError('Please enter your current password.')
      return
    }
    if (form.newPassword.length < 6) {
      setFormError('Your new password is too short, it must be at least 6 characters.')
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setFormError("The two passwords didn't match.")
      return
    }

    const result = changePassword(currentUser.id, form.currentPassword, form.newPassword)
    if (!result.ok) {
      setFormError(result.error)
      return
    }

    toastError('Your password has been changed successfully. Please login with your new password.', 5500)
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="card">
        <h2 className="card-title">
          <i className="bi bi-key-fill me-2 text-brand"></i>Change Password
        </h2>
        <p className="card-subtitle">
          For security, you will be logged out and asked to login again with your new password.
        </p>

        {formError && (
          <p className="alert alert--danger">
            <i className="bi bi-exclamation-triangle-fill me-1"></i>
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-icon-group">
                <i className="bi bi-lock-fill"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="currentPassword"
                  value={form.currentPassword}
                  onChange={setField('currentPassword')}
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-icon-group">
                <i className="bi bi-key-fill"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={form.newPassword}
                  onChange={setField('newPassword')}
                  placeholder="At least 6 characters"
                  required
                />
              </div>
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-icon-group">
                <i className="bi bi-key-fill"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={setField('confirmPassword')}
                  placeholder="Re-enter new password"
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
          </div>

          <div className="d-flex mt-3">
            <button type="submit" className="btn btn-brand">
              <i className="bi bi-check-lg me-1"></i>Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}