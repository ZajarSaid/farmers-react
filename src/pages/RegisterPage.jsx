import { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { AuthShell } from './landing/AuthShell.jsx'
import { isValidEmail, isValidPhone } from '../utils/auth.js'

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/me" replace />
  }

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!values.username.trim() || !values.firstName.trim() || !values.lastName.trim()) {
      setError('Username, first name and last name are required.')
      return
    }
    if (!isValidEmail(values.email)) {
      setError('The email address you entered is invalid.')
      return
    }
    if (values.phone.trim() && !isValidPhone(values.phone.trim())) {
      setError('The phone number must contain only digits, spaces or a leading + sign.')
      return
    }
    if (values.password.length < 6) {
      setError('Your password is too short, it must be at least 6 characters.')
      return
    }

    const result = register(values)
    if (result.ok) {
      navigate('/login', { state: { justRegistered: true } })
    } else {
      setError(result.error)
    }
  }

  return (
    <AuthShell>
      <div className="auth-wrap">
        <div className="auth-card auth-card--wide">
          <div className="auth-side">
            <h2>Create Your Farmer Account</h2>
            <p>Join the national Farmers Registry System and grow with the government.</p>
            <ul>
              <li><i className="bi bi-check-circle-fill"></i><span>Free and mandatory registration</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Register your farms and crops</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Track outputs and national rankings</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Access regional market prices</span></li>
            </ul>
          </div>

          <div className="auth-main">
            <div className="auth-heading">
              <div className="auth-logo">
                <img src="/tz_gov_logo.png" alt="Tanzania Government logo" />
              </div>
              <h3 className="auth-title">Farmer Registration Form</h3>
              <p className="auth-sub">Fill in your details to create an account</p>
            </div>

            {error && (
              <p className="alert alert--danger">
                <i className="bi bi-exclamation-triangle-fill me-1"></i>
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="regUsername">Username</label>
                  <input type="text" id="regUsername" value={values.username} onChange={setField('username')} placeholder="Enter username" required />
                </div>

                <div className="form-field">
                  <label htmlFor="regFirstName">First Name</label>
                  <input type="text" id="regFirstName" value={values.firstName} onChange={setField('firstName')} placeholder="Enter first name" required />
                </div>

                <div className="form-field">
                  <label htmlFor="regLastName">Last Name</label>
                  <input type="text" id="regLastName" value={values.lastName} onChange={setField('lastName')} placeholder="Enter last name" required />
                </div>

                <div className="form-field">
                  <label htmlFor="regEmail">Email Address</label>
                  <input type="email" id="regEmail" value={values.email} onChange={setField('email')} placeholder="Enter email" required />
                </div>

                <div className="form-field">
                  <label htmlFor="regPhone">Phone Number</label>
                  <input type="text" id="regPhone" value={values.phone} onChange={setField('phone')} placeholder="e.g. +255..." />
                </div>

                <div className="form-field">
                  <label htmlFor="regAddress">Address</label>
                  <input type="text" id="regAddress" value={values.address} onChange={setField('address')} placeholder="Enter address" />
                </div>

                <div className="form-field form-field--full">
                  <label htmlFor="regPassword">Password</label>
                  <div className="input-icon-group">
                    <i className="bi bi-lock-fill"></i>
                    <input type="password" id="regPassword" value={values.password} onChange={setField('password')} placeholder="At least 6 characters" required />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-auth">
                <i className="bi bi-person-plus me-1"></i>Create Account
              </button>

              <p className="auth-alt">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AuthShell>
  )
}