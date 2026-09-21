import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useFarmers } from '../../context/FarmersContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { generateId } from '../../services/storage.js'

export default function FarmerRegisterFarm() {
  const { currentUser } = useAuth()
  const { crops, regions, districts, farmsCrud } = useFarmers()
  const { success } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    size: '',
    cropId: '',
    regionId: '',
    districtId: '',
  })
  const [formError, setFormError] = useState('')

  const regionDistricts = useMemo(
    () => districts.filter((district) => district.regionId === form.regionId),
    [districts, form.regionId],
  )

  const setField = (field) => (event) => {
    const value = event.target.value
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'regionId' ? { districtId: '' } : {}),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')

    if (!form.name.trim()) {
      setFormError('A farm must have a name.')
      return
    }
    const size = Number(form.size)
    if (!form.size.trim() || !(size > 0)) {
      setFormError('A farm must have a valid size in hectares.')
      return
    }
    if (!form.cropId) {
      setFormError('Please select the crop you grow on this farm.')
      return
    }
    if (!form.regionId) {
      setFormError('Please select a region.')
      return
    }
    if (!form.districtId) {
      setFormError('Please select a district.')
      return
    }

    farmsCrud.add({
      id: generateId('farm'),
      name: form.name.trim(),
      size,
      cropId: form.cropId,
      regionId: form.regionId,
      districtId: form.districtId,
      ownerId: currentUser.id,
      cultivationStartDate: new Date().toISOString().slice(0, 10),
      totalOutput: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    })
    success(`Farm "${form.name.trim()}" registered successfully!`)
    navigate('/me/history')
  }

  return (
    <div className="dashboard">
      <div className="card">
        <h2 className="card-title">
          <i className="bi bi-pencil-square me-2 text-brand"></i>Register a New Farm
        </h2>
        <p className="card-subtitle">
          Provide your farm details. The farm will be linked to your account so you can track its
          output and rankings.
        </p>

        {formError && (
          <p className="alert alert--danger">
            <i className="bi bi-exclamation-triangle-fill me-1"></i>
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="farmName">Farm Name</label>
              <input
                type="text"
                id="farmName"
                value={form.name}
                onChange={setField('name')}
                placeholder="e.g. Maziwa Estate"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="farmSize">Size (hectares)</label>
              <input
                type="number"
                id="farmSize"
                min="0.1"
                step="0.1"
                value={form.size}
                onChange={setField('size')}
                placeholder="e.g. 3.5"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="farmCrop">Crop Type</label>
              <select id="farmCrop" value={form.cropId} onChange={setField('cropId')}>
                <option value="">Select crop...</option>
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.id}>{crop.name}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="farmRegion">Region</label>
              <select id="farmRegion" value={form.regionId} onChange={setField('regionId')}>
                <option value="">Select region...</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="farmDistrict">District</label>
              <select id="farmDistrict" value={form.districtId} onChange={setField('districtId')} disabled={!form.regionId}>
                <option value="">{form.regionId ? 'Select district...' : 'Select a region first'}</option>
                {regionDistricts.map((district) => (
                  <option key={district.id} value={district.id}>{district.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex mt-3 gap-3">
            <button
              type="button"
              className="btn-outline-sm"
              onClick={() => navigate('/me/history')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-brand">
              <i className="bi bi-check-lg me-1"></i>Register Farm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}