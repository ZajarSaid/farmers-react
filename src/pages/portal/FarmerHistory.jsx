import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useFarmers } from '../../context/FarmersContext.jsx'
import UserAvatar from '../../components/UserAvatar.jsx'

function buildRanks(farmers, farms) {
  const farmerOutput = (ownerId) =>
    farms
      .filter((farm) => farm.ownerId === ownerId)
      .reduce((sum, farm) => sum + (Number(farm.totalOutput) || 0), 0)

  const rankedFarmers = [...farmers].sort((a, b) => farmerOutput(b.id) - farmerOutput(a.id))
  const national = new Map()
  rankedFarmers.forEach((farmer, index) => {
    const output = farmerOutput(farmer.id)
    const previous = rankedFarmers[index - 1]
    const rank = previous && farmerOutput(previous.id) === output ? national.get(previous.id) : index + 1
    national.set(farmer.id, { rank, output })
  })

  const regional = new Map()
  farmers.forEach((farmer) => {
    const ownedFarms = farms.filter((farm) => farm.ownerId === farmer.id)
    if (ownedFarms.length === 0) {
      return
    }
    const mainFarm = ownedFarms.reduce((best, farm) =>
      (Number(farm.totalOutput) || 0) > (Number(best.totalOutput) || 0) ? farm : best,
    )
    const regionId = mainFarm.regionId
    const peers = farmers
      .map((candidate) => {
        const candidateFarms = farms.filter((farm) => farm.ownerId === candidate.id && farm.regionId === regionId)
        const output = candidateFarms.reduce((sum, farm) => sum + (Number(farm.totalOutput) || 0), 0)
        return { candidate, regionId, output }
      })
      .filter((entry) => entry.output > 0)
      .sort((a, b) => b.output - a.output)
    const position = peers.findIndex((entry) => entry.candidate.id === farmer.id) + 1
    regional.set(farmer.id, { rank: position > 0 ? position : null, regionId })
  })

  return { national, regional, farmerOutput }
}

export default function FarmerHistory() {
  const { currentUser } = useAuth()
  const { farmers, farms, regions, cropName, regionName, districtName } = useFarmers()

  const ranks = useMemo(() => buildRanks(farmers, farms), [farmers, farms])
  const myFarms = useMemo(
    () => farms.filter((farm) => farm.ownerId === currentUser.id),
    [farms, currentUser.id],
  )
  const national = ranks.national.get(currentUser.id)
  const regional = ranks.regional.get(currentUser.id)
  const myRegion = regional?.regionId ? regions.find((region) => region.id === regional.regionId) : null

  return (
    <div className="dashboard">
      <div className="detail-grid">
        <div className="profile-card">
          <UserAvatar user={currentUser} />
          <h3 className="profile-name">
            {currentUser.firstName} {currentUser.lastName}
          </h3>
          <p className="text-muted">{currentUser.username}</p>
          <span className={`badge badge--${currentUser.status.toLowerCase()}`}>{currentUser.status}</span>
          <ul className="profile-meta">
            <li><span>Email</span><strong>{currentUser.email}</strong></li>
            <li><span>Phone</span><strong>{currentUser.phone}</strong></li>
            <li><span>Address</span><strong>{currentUser.address}</strong></li>
            <li><span>Date Joined</span><strong>{currentUser.dateJoined}</strong></li>
            <li><span>Farms</span><strong>{myFarms.length}</strong></li>
            <li><span>Total Output</span><strong>{national?.output.toLocaleString() || 0} kg</strong></li>
          </ul>
        </div>

        <div className="profile-farms">
          <div className="card mb-3">
            <h3 className="card-title">
              <i className="bi bi-trophy-fill me-2 text-brand"></i>Rank Information
            </h3>
            {national ? (
              <div className="snapshot-grid">
                <div><strong>{national.rank || '—'}</strong><span>National Rank</span></div>
                <div><strong>{regional?.rank || '—'}</strong><span>{myRegion ? `Regional Rank (${myRegion.name})` : 'Regional Rank'}</span></div>
              </div>
            ) : (
              <p className="text-danger mb-0">No ranking information available.</p>
            )}
          </div>

          <div className="card">
            <div className="card-head">
              <h3 className="card-title">
                <i className="bi bi-tree-fill me-2 text-brand"></i>Farm Information
              </h3>
              <Link to="/me/register-farm" className="btn btn-outline-sm">
                <i className="bi bi-plus-lg me-1"></i>Register Farm
              </Link>
            </div>
            {myFarms.length === 0 ? (
              <p className="text-danger text-center py-3 mb-0">You haven&apos;t yet registered a farm.</p>
            ) : (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Farm</th>
                      <th>Size (ha)</th>
                      <th>Crop</th>
                      <th>Region</th>
                      <th>District</th>
                      <th>Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myFarms.map((farm) => (
                      <tr key={farm.id}>
                        <td className="fw-semibold">{farm.name}</td>
                        <td>{farm.size}</td>
                        <td>{cropName(farm.cropId)}</td>
                        <td>{regionName(farm.regionId)}</td>
                        <td>{districtName(farm.districtId)}</td>
                        <td>
                          <span className="badge badge--price">{Number(farm.totalOutput).toLocaleString()}</span>
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
    </div>
  )
}