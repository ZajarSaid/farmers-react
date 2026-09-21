import { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { isValidPhone } from '../../utils/auth.js'
import { readImageFile } from '../../utils/image.js'
import UserAvatar from '../../components/UserAvatar.jsx'

export default function FarmerProfile() {
  const { currentUser, updateUser } = useAuth()
  const { success } = useToast()
  const [values, setValues] = useState({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
  })
  const [imagePreview, setImagePreview] = useState(currentUser.image || null)
  const [newImage, setNewImage] = useState(undefined)
  const [formError, setFormError] = useState('')
  const fileInputRef = useRef(null)

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleImageChange = async (event) => {
    const file = event.target.files && event.target.files[0]
    setFormError('')
    if (!file) {
      return
    }
    try {
      const dataUrl = await readImageFile(file)
      setNewImage(dataUrl)
      setImagePreview(dataUrl)
    } catch (error) {
      setNewImage(undefined)
      setImagePreview(currentUser.image || null)
      setFormError(error.message)
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = () => {
    setNewImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')

    if (!values.firstName.trim() || !values.lastName.trim()) {
      setFormError('First and last name are required.')
      return
    }
    if (values.phone.trim() && !isValidPhone(values.phone.trim())) {
      setFormError('The phone number must contain only digits, spaces or a leading + sign.')
      return
    }

    updateUser(currentUser.id, {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: values.phone.trim() || '+255',
      address: values.address.trim(),
      image: newImage === undefined ? currentUser.image : newImage,
    })
    setNewImage(undefined)
    success('Your profile has been updated successfully.')
  }

  return (
    <div className="dashboard">
      <div className="card">
        <h2 className="card-title">
          <i className="bi bi-person-fill me-2 text-brand"></i>My Profile
        </h2>
        <p className="card-subtitle">
          Update your personal information. Email and username are your login credentials and cannot
          be changed here.
        </p>

        {formError && (
          <p className="alert alert--danger">
            <i className="bi bi-exclamation-triangle-fill me-1"></i>
            {formError}
          </p>
        )}

        <div className="detail-grid">
          <div className="profile-card">
            <UserAvatar user={{ ...currentUser, image: imagePreview }} />
            <h3 className="profile-name">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <p className="text-muted">{currentUser.username}</p>
            <span className={`badge badge--${currentUser.status.toLowerCase()}`}>{currentUser.status}</span>
            <div className="avatar-upload">
              <input
                ref={fileInputRef}
                type="file"
                id="profileImage"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="avatar-upload-input"
              />
              <label htmlFor="profileImage" className="btn btn-outline-sm">
                <i className="bi bi-camera-fill me-1"></i>
                {imagePreview ? 'Change Photo' : 'Upload Photo'}
              </label>
              {imagePreview ? (
                <button type="button" className="btn btn-outline-sm btn-danger-outline" onClick={handleRemoveImage}>
                  <i className="bi bi-trash3 me-1"></i>Remove
                </button>
              ) : null}
            </div>
            <ul className="profile-meta">
              <li><span>Email</span><strong>{currentUser.email}</strong></li>
              <li><span>Joined</span><strong>{currentUser.dateJoined}</strong></li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="profile-farms">
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="profileFirstName">First Name</label>
                <input
                  type="text"
                  id="profileFirstName"
                  value={values.firstName}
                  onChange={setField('firstName')}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="profileLastName">Last Name</label>
                <input
                  type="text"
                  id="profileLastName"
                  value={values.lastName}
                  onChange={setField('lastName')}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="profilePhone">Phone Number</label>
                <input
                  type="text"
                  id="profilePhone"
                  value={values.phone}
                  onChange={setField('phone')}
                  placeholder="e.g. +255..."
                />
              </div>
              <div className="form-field">
                <label htmlFor="profileAddress">Address</label>
                <input
                  type="text"
                  id="profileAddress"
                  value={values.address}
                  onChange={setField('address')}
                  placeholder="Enter address"
                />
              </div>
            </div>

            <div className="d-flex mt-3">
              <button type="submit" className="btn btn-brand">
                <i className="bi bi-check-lg me-1"></i>Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}