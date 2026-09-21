import { useMemo, useState } from 'react'
import { useFarmers } from '../context/FarmersContext.jsx'

export default function RegionalPricesPage() {
  const { regionalPrices, regions, crops, regionName, cropName } = useFarmers()
  const [regionFilter, setRegionFilter] = useState('')
  const [cropFilter, setCropFilter] = useState('')

  const filtered = useMemo(() => {
    return regionalPrices.filter((price) => {
      if (regionFilter && price.regionId !== regionFilter) {
        return false
      }
      if (cropFilter && price.cropId !== cropFilter) {
        return false
      }
      return true
    })
  }, [regionalPrices, regionFilter, cropFilter])

  const filteredRegions = useMemo(() => new Set(filtered.map((p) => p.regionId)).size, [filtered])
  const filteredCrops = useMemo(() => new Set(filtered.map((p) => p.cropId)).size, [filtered])

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">
            <i className="bi bi-currency-exchange me-2 text-brand"></i>Market Price Records
          </h2>
          <span className="text-muted">Total: {regionalPrices.length} records</span>
        </div>
      </div>

      <div className="filter-row">
        <label className="filter-label">
          <span>Region</span>
          <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} className="select-control">
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </label>
        <label className="filter-label">
          <span>Crop</span>
          <select value={cropFilter} onChange={(event) => setCropFilter(event.target.value)} className="select-control">
            <option value="">All Crops</option>
            {crops.map((crop) => (
              <option key={crop.id} value={crop.id}>{crop.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="stat-mini-row">
        <div className="stat-mini"><strong>{filtered.length}</strong><span>Prices</span></div>
        <div className="stat-mini"><strong>{filteredRegions}</strong><span>Regions</span></div>
        <div className="stat-mini"><strong>{filteredCrops}</strong><span>Crops</span></div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-text">
          {regionalPrices.length === 0 ? 'No regional prices found.' : 'No prices match your filters.'}
        </p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Region</th>
                <th>Price (Tsh/kg)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((price) => (
                <tr key={price.id}>
                  <td className="fw-semibold">{cropName(price.cropId)}</td>
                  <td>{regionName(price.regionId)}</td>
                  <td>
                    <span className="badge badge--price">Tsh {Number(price.price).toLocaleString()}</span>
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