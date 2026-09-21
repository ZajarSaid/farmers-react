import { useMemo, useState } from 'react'
import { useFarmers } from '../context/FarmersContext.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DoughnutChart from '../components/DoughnutChart.jsx'

export default function ProductionPage() {
  const { farms, regions, regionName, cropName } = useFarmers()
  const [regionFilter, setRegionFilter] = useState('')

  const filteredFarms = useMemo(() => {
    if (!regionFilter) {
      return farms
    }
    return farms.filter((farm) => farm.regionId === regionFilter)
  }, [farms, regionFilter])

  const summary = useMemo(() => {
    return {
      farms: filteredFarms.length,
      output: filteredFarms.reduce((sum, farm) => sum + (Number(farm.totalOutput) || 0), 0),
    }
  }, [filteredFarms])

  const cropOutput = useMemo(() => {
    const map = new Map()
    filteredFarms.forEach((farm) => {
      map.set(farm.cropId, (map.get(farm.cropId) || 0) + (Number(farm.totalOutput) || 0))
    })
    return [...map.entries()]
      .map(([cropId, value]) => ({ label: cropName(cropId), value }))
      .sort((a, b) => b.value - a.value)
  }, [filteredFarms, cropName])

  return (
    <div className="production">
      <div className="stat-grid">
        <StatCard icon="tree-fill" label="Total Farms" value={summary.farms} accent="blue" />
        <StatCard icon="graph-up-arrow" label="Total Output (kg)" value={summary.output.toLocaleString()} accent="green" />
        <div className="card filter-card">
          <label className="filter-label">
            <span>Filter by Region</span>
            <select
              value={regionFilter}
              onChange={(event) => setRegionFilter(event.target.value)}
              className="select-control"
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="chart-grid">
        <div className="card">
          <h2 className="card-title">Output Share by Crop</h2>
          <div className="chart-center">
            <DoughnutChart data={cropOutput} />
          </div>
        </div>
        <div className="card">
          <h2 className="card-title">Total Output per Crop</h2>
          <BarChart data={cropOutput} />
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h2 className="card-title">Output by Region</h2>
        </div>
        <div className="table-responsive">
          {filteredFarms.length === 0 ? (
            <p className="empty-text">No farms found for the selected filter.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Farm</th>
                  <th>Crop</th>
                  <th>Region</th>
                  <th>Output (kg)</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarms.map((farm) => (
                  <tr key={farm.id}>
                    <td className="fw-semibold">{farm.name}</td>
                    <td>{cropName(farm.cropId)}</td>
                    <td>{regionName(farm.regionId)}</td>
                    <td>{Number(farm.totalOutput).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}