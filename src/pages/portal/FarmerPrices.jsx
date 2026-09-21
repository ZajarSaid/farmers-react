import { useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useFarmers } from '../../context/FarmersContext.jsx'

export default function FarmerPrices() {
  const { currentUser } = useAuth()
  const { farms, crops, regions, regionalPrices, cropName, regionName } = useFarmers()
  const [cropFilter, setCropFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')

  const myCropIds = useMemo(
    () => [...new Set(farms.filter((farm) => farm.ownerId === currentUser.id).map((farm) => farm.cropId))],
    [farms, currentUser.id],
  )

  const myCrops = useMemo(
    () => crops.filter((crop) => myCropIds.includes(crop.id)),
    [crops, myCropIds],
  )

  const prices = useMemo(() => {
    return regionalPrices
      .filter((price) => myCropIds.includes(price.cropId))
      .filter((price) => !cropFilter || price.cropId === cropFilter)
      .filter((price) => !regionFilter || price.regionId === regionFilter)
      .sort((a, b) => cropName(a.cropId).localeCompare(cropName(b.cropId)))
  }, [regionalPrices, myCropIds, cropFilter, regionFilter, cropName])

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-head">
          <div>
            <h2 className="card-title">
              <i className="bi bi-currency-exchange me-2 text-brand"></i>Market Prices for My Crops
            </h2>
            <span className="text-muted">
              {myCrops.length === 0
                ? 'Register a farm first to see prices for the crops you grow.'
                : `Showing regional prices for: ${myCrops.map((crop) => crop.name).join(', ')}`}
            </span>
          </div>
        </div>

        {myCrops.length > 0 && (
          <div className="d-flex filter-row">
            <label className="filter-label">
              <span>Crop</span>
              <select className="select-control" value={cropFilter} onChange={(event) => setCropFilter(event.target.value)}>
                <option value="">All my crops</option>
                {myCrops.map((crop) => (
                  <option key={crop.id} value={crop.id}>{crop.name}</option>
                ))}
              </select>
            </label>
            <label className="filter-label">
              <span>Region</span>
              <select className="select-control" value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
                <option value="">All regions</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {prices.length === 0 ? (
          <p className="empty-text">
            {myCrops.length === 0 ? 'No market price data available.' : 'No prices match your filters.'}
          </p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Region</th>
                  <th>Price (TSh/kg)</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price) => (
                  <tr key={price.id}>
                    <td className="fw-semibold">
                      <span className={`badge badge--${crops.find((c) => c.id === price.cropId)?.cropType?.toLowerCase() || 'price'}`}>
                        {cropName(price.cropId)}
                      </span>
                    </td>
                    <td>{regionName(price.regionId)}</td>
                    <td className="text-brand fw-bold">{Number(price.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}