import { useMemo } from 'react'
import { useFarmers } from '../context/FarmersContext.jsx'
import StatCard from '../components/StatCard.jsx'

export default function Dashboard() {
  const {
    farmers,
    farms,
    crops,
    regions,
    districts,
    regionalPrices,
    outputVerifications,
    totals,
    cropName,
    regionName,
    farmerName,
  } = useFarmers()

  const recentFarms = useMemo(() => [...farms].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5), [farms])
  const pendingVerifications = useMemo(
    () => outputVerifications.filter((v) => v.status === 'pending').slice(0, 5),
    [outputVerifications],
  )

  return (
    <div className="dashboard">
      <div className="stat-grid">
        <StatCard icon="people-fill" label="Farmers" value={totals.farmers} to="/farmers" accent="green" />
        <StatCard icon="tree-fill" label="Farms" value={totals.farms} to="/farms" accent="blue" />
        <StatCard icon="basket-fill" label="Crops" value={totals.crops} to="/crops" accent="orange" />
        <StatCard icon="graph-up-arrow" label="Total Output (kg)" value={totals.output.toLocaleString()} accent="red" />
      </div>

      <div className="card">
        <h2 className="card-title">
          Welcome back, Officer
        </h2>
        <p className="card-subtitle">
          Manage farmers, farms, crops and regional market prices from the menu on the left.
          The dashboard gives you a quick overview of the data currently stored in the registry.
        </p>
      </div>

      <div className="chart-grid">
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Recent Farms</h2>
            <span className="text-muted">Latest {recentFarms.length} registrations</span>
          </div>
          {recentFarms.length === 0 ? (
            <p className="empty-text">No farms registered yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Farm</th>
                    <th>Crop</th>
                    <th>Region</th>
                    <th>Owner</th>
                    <th>Output (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {recentFarms.map((farm) => (
                    <tr key={farm.id}>
                      <td className="fw-semibold">{farm.name}</td>
                      <td>{cropName(farm.cropId)}</td>
                      <td>{regionName(farm.regionId)}</td>
                      <td>{farmerName(farm.ownerId)}</td>
                      <td>{Number(farm.totalOutput).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Pending Verifications</h2>
            <span className="text-muted">Awaiting farmer response</span>
          </div>
          {pendingVerifications.length === 0 ? (
            <p className="empty-text">No pending verifications.</p>
          ) : (
            <ul className="list-pending">
              {pendingVerifications.map((verification) => (
                <li key={verification.id} className="pending-item">
                  <div>
                    <strong>{verification.farmName}</strong>
                    <span className="pending-owner">{farmerName(verification.ownerId)}</span>
                  </div>
                  <span className="badge badge--pending">pending</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h2 className="card-title">Registry Snapshot</h2>
        </div>
        <div className="snapshot-grid">
          <div><strong>{crops.length}</strong><span>Crops</span></div>
          <div><strong>{regions.length}</strong><span>Regions</span></div>
          <div><strong>{districts.length}</strong><span>Districts</span></div>
          <div><strong>{farmers.length}</strong><span>Farmers</span></div>
          <div><strong>{farms.length}</strong><span>Farms</span></div>
          <div><strong>{regionalPrices.length}</strong><span>Price records</span></div>
        </div>
      </div>
    </div>
  )
}