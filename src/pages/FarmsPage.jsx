import { useMemo, useState } from 'react'
import { useFarmers } from '../context/FarmersContext.jsx'
import SearchInput from '../components/SearchInput.jsx'

export default function FarmsPage() {
  const { farms, cropName, regionName, districtName, farmerName } = useFarmers()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) {
      return farms
    }
    return farms.filter((farm) => {
      const crop = cropName(farm.cropId).toLowerCase()
      const region = regionName(farm.regionId).toLowerCase()
      const owner = farmerName(farm.ownerId).toLowerCase()
      return (
        farm.name.toLowerCase().includes(term) ||
        crop.includes(term) ||
        region.includes(term) ||
        owner.includes(term)
      )
    })
  }, [farms, search, cropName, regionName, farmerName])

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">
            <i className="bi bi-tree-fill me-2 text-brand"></i>Registered Farms
          </h2>
          <span className="text-muted">Total: {farms.length}</span>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search farms..." />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-text">{farms.length === 0 ? 'No farms found.' : 'No farms match your search.'}</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size (ha)</th>
                <th>Crop</th>
                <th>Region</th>
                <th>District</th>
                <th>Owner</th>
                <th>Output (kg)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((farm) => (
                <tr key={farm.id}>
                  <td className="fw-semibold">{farm.name}</td>
                  <td>{farm.size}</td>
                  <td>{cropName(farm.cropId)}</td>
                  <td>{regionName(farm.regionId)}</td>
                  <td>{districtName(farm.districtId)}</td>
                  <td className="text-brand">{farmerName(farm.ownerId)}</td>
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
  )
}