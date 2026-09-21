import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFarmers } from '../context/FarmersContext.jsx'
import UserAvatar from '../components/UserAvatar.jsx'

export default function FarmerDetailsPage() {
  const { id } = useParams()
  const { getFarmer, farms, cropName, regionName } = useFarmers()

  const farmer = getFarmer(id)
  const farmerFarms = useMemo(
    () => farms.filter((farm) => farm.ownerId === id),
    [farms, id],
  )

  if (!farmer) {
    return (
      <div className="card">
        <p className="empty-text">Farmer not found.</p>
        <Link to="/farmers" className="btn btn-brand">Back to Farmers</Link>
      </div>
    )
  }

  const totalOutput = farmerFarms.reduce((sum, farm) => sum + (Number(farm.totalOutput) || 0), 0)

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Farmer Details</h2>
        </div>
        <Link to="/farmers" className="btn btn-outline-sm">
          <i className="bi bi-arrow-left me-1"></i>Back to Farmers
        </Link>
      </div>

      <div className="detail-grid">
        <div className="profile-card">
          <UserAvatar user={farmer} />
          <h3 className="profile-name">{farmer.firstName} {farmer.lastName}</h3>
          <p className="text-muted">{farmer.username}</p>
          <span className={`badge badge--${farmer.status.toLowerCase()}`}>{farmer.status}</span>
          <ul className="profile-meta">
            <li><span>Email</span><strong>{farmer.email}</strong></li>
            <li><span>Phone</span><strong>{farmer.phone}</strong></li>
            <li><span>Address</span><strong>{farmer.address}</strong></li>
            <li><span>Date Joined</span><strong>{farmer.dateJoined}</strong></li>
            <li><span>Farms</span><strong>{farmerFarms.length}</strong></li>
            <li><span>Total Output</span><strong>{totalOutput.toLocaleString()} kg</strong></li>
          </ul>
        </div>

        <div className="profile-farms">
          <h3 className="card-title mb-3">Farms owned by this farmer</h3>
          {farmerFarms.length === 0 ? (
            <p className="empty-text">This farmer has no farms registered so far.</p>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Farm</th>
                    <th>Crop</th>
                    <th>Region</th>
                    <th>District</th>
                    <th>Size (ha)</th>
                    <th>Output (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {farmerFarms.map((farm) => (
                    <tr key={farm.id}>
                      <td className="fw-semibold">{farm.name}</td>
                      <td>{cropName(farm.cropId)}</td>
                      <td>{regionName(farm.regionId)}</td>
                      <td>{farm.districtId ? <RegionDistrictLabel districtId={farm.districtId} /> : '—'}</td>
                      <td>{farm.size}</td>
                      <td>
                        <span className={`output-badge ${farm.totalOutput >= 1 ? 'output-badge--on' : ''}`}>
                          {Number(farm.totalOutput).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RegionDistrictLabel({ districtId }) {
  const { getDistrict } = useFarmers()
  return getDistrict(districtId)?.name || '—'
}