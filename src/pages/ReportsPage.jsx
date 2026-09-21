import { useFarmers } from '../context/FarmersContext.jsx'
import StatCard from '../components/StatCard.jsx'
import { toCsv, downloadCsv } from '../utils/csv.js'

export default function ReportsPage() {
  const {
    farmers,
    farms,
    crops,
    regionalPrices,
    regions,
    outputVerifications,
    totals,
    cropName,
    regionName,
    farmerName,
  } = useFarmers()

  const downloadFarmers = () => {
    const csv = toCsv(
      ['ID', 'Username', 'First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Status', 'Date Joined'],
      farmers.map((farmer) => [
        farmer.id,
        farmer.username,
        farmer.firstName,
        farmer.lastName,
        farmer.email,
        farmer.phone,
        farmer.address,
        farmer.status,
        farmer.dateJoined,
      ]),
    )
    downloadCsv('farmers_report.csv', csv)
  }

  const downloadFarms = () => {
    const csv = toCsv(
      ['ID', 'Name', 'Size', 'Crop', 'Region', 'District', 'Owner', 'Total Output', 'Created'],
      farms.map((farm) => [
        farm.id,
        farm.name,
        farm.size,
        cropName(farm.cropId),
        regionName(farm.regionId),
        farm.districtId,
        farmerName(farm.ownerId),
        farm.totalOutput,
        farm.createdAt,
      ]),
    )
    downloadCsv('farms_report.csv', csv)
  }

  const downloadCrops = () => {
    const csv = toCsv(
      ['ID', 'Name', 'Type', 'Created'],
      crops.map((crop) => [crop.id, crop.name, crop.cropType, crop.createdAt]),
    )
    downloadCsv('crops_report.csv', csv)
  }

  const downloadPrices = () => {
    const csv = toCsv(
      ['Crop', 'Region', 'Price (Tsh per kg)'],
      regionalPrices.map((price) => [cropName(price.cropId), regionName(price.regionId), price.price]),
    )
    downloadCsv('prices_report.csv', csv)
  }

  const downloadProduction = () => {
    const map = new Map()
    farms.forEach((farm) => {
      const key = `${cropName(farm.cropId)}|${regionName(farm.regionId)}`
      map.set(key, (map.get(key) || 0) + (Number(farm.totalOutput) || 0))
    })
    const csv = toCsv(
      ['Crop', 'Region', 'Total Output'],
      [...map.entries()].map(([key, total]) => {
        const [crop, region] = key.split('|')
        return [crop, region, total]
      }),
    )
    downloadCsv('production_report.csv', csv)
  }

  const downloadVerifications = () => {
    const csv = toCsv(
      ['Farmer', 'Farm', 'Output (kg)', 'Status'],
      outputVerifications.map((item) => [farmerName(item.ownerId), item.farmName, item.farmOutput, item.status]),
    )
    downloadCsv('notifications_report.csv', csv)
  }

  const reports = [
    { title: 'Farmers Report', icon: 'people-fill', count: `${farmers.length} farmers registered`, onDownload: downloadFarmers },
    { title: 'Farms Report', icon: 'tree-fill', count: `${farms.length} farms registered`, onDownload: downloadFarms },
    { title: 'Crops Report', icon: 'basket-fill', count: `${crops.length} crops registered`, onDownload: downloadCrops },
    { title: 'Market Prices Report', icon: 'currency-exchange', count: `${regionalPrices.length} price records`, onDownload: downloadPrices },
    { title: 'Production Trends Report', icon: 'graph-up-arrow', count: 'Crop output by region', onDownload: downloadProduction },
    { title: 'Notifications Report', icon: 'bell-fill', count: `${outputVerifications.length} records`, onDownload: downloadVerifications },
  ]

  return (
    <div className="reports">
      <div className="stat-grid">
        <StatCard icon="people-fill" label="Farmers" value={farmers.length} accent="green" />
        <StatCard icon="tree-fill" label="Farms" value={farms.length} accent="blue" />
        <StatCard icon="basket-fill" label="Crops" value={crops.length} accent="orange" />
        <StatCard icon="currency-exchange" label="Prices" value={regionalPrices.length} accent="purple" />
        <StatCard icon="geo-alt-fill" label="Regions" value={regions.length} accent="teal" />
        <StatCard icon="graph-up-arrow" label="Output (kg)" value={totals.output.toLocaleString()} accent="red" />
      </div>

      <div className="report-grid">
        {reports.map((report) => (
          <div className="card report-card" key={report.title}>
            <div className="d-flex gap-3 mb-3">
              <div className="stat-icon">
                <i className={`bi bi-${report.icon}`}></i>
              </div>
              <div>
                <div className="fw-bold text-brand">{report.title}</div>
                <div className="text-muted small">{report.count}</div>
              </div>
            </div>
            <p className="report-desc">Download the full report as a CSV file.</p>
            <button type="button" className="btn btn-brand" onClick={report.onDownload}>
              <i className="bi bi-download me-1"></i>Download CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}