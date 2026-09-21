import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useFarmers } from '../../context/FarmersContext.jsx'
import StatCard from '../../components/StatCard.jsx'

export default function FarmerHome() {
  const { currentUser } = useAuth()
  const { farms, cropName, regionName, districtName, outputVerifications } = useFarmers()

  const myFarms = useMemo(
    () => farms.filter((farm) => farm.ownerId === currentUser.id),
    [farms, currentUser.id],
  )
  const totalOutput = myFarms.reduce((sum, farm) => sum + (Number(farm.totalOutput) || 0), 0)
  const myCrops = useMemo(() => [...new Set(myFarms.map((farm) => farm.cropId))], [myFarms])
  const myVerifications = useMemo(
    () => outputVerifications.filter((verification) => verification.ownerId === currentUser.id),
    [outputVerifications, currentUser.id],
  )
  const pendingVerifications = myVerifications.filter((verification) => verification.status === 'pending')

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="dashboard">
      <div className="card">
        <h2 className="card-title">
          Welcome back, {currentUser.firstName} {currentUser.lastName}
        </h2>
        <p className="card-subtitle">
          {today}. This is your farmer account. Register farms, review your history, check market
          prices for your crops and keep your profile up to date.
        </p>
      </div>

      <div className="stat-grid">
        <StatCard icon="tree-fill" label="My Farms" value={myFarms.length} accent="green" />
        <StatCard icon="graph-up-arrow" label="Total Output (kg)" value={totalOutput.toLocaleString()} accent="red" />
        <StatCard icon="basket-fill" label="Crops Grown" value={myCrops.length} accent="orange" />
        <StatCard icon="patch-check-fill" label="Pending Verifications" value={pendingVerifications.length} accent="blue" />
      </div>

      <div className="chart-grid">
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">My Farms</h2>
            <Link to="/me/register-farm" className="btn btn-outline-sm">
              <i className="bi bi-plus-lg me-1"></i>Register Farm
            </Link>
          </div>
          {myFarms.length === 0 ? (
            <p className="empty-text">
              You haven&apos;t registered a farm yet.{' '}
              <Link to="/me/register-farm" className="text-brand">
                Register your first farm
              </Link>
              .
            </p>
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
                  {myFarms.map((farm) => (
                    <tr key={farm.id}>
                      <td className="fw-semibold">{farm.name}</td>
                      <td>{cropName(farm.cropId)}</td>
                      <td>{regionName(farm.regionId)}</td>
                      <td>{districtName(farm.districtId)}</td>
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

        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Verification Notices</h2>
            <span className="text-muted">{myVerifications.length} total</span>
          </div>
          {myVerifications.length === 0 ? (
            <p className="empty-text">No verification notices for your farms.</p>
          ) : (
            <ul className="list-pending">
              {myVerifications.map((verification) => (
                <li key={verification.id} className="pending-item">
                  <div>
                    <strong>{verification.farmName}</strong>
                    <span className="pending-owner">{Number(verification.farmOutput).toLocaleString()} kg</span>
                  </div>
                  <span className={`badge badge--${verification.status.toLowerCase()}`}>{verification.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}