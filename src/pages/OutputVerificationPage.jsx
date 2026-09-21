import { useMemo, useState } from 'react'
import { useFarmers } from '../context/FarmersContext.jsx'

const STATUSES = ['all', 'pending', 'verified', 'denied']

export default function OutputVerificationPage() {
  const { outputVerifications, farmerName } = useFarmers()
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    if (status === 'all') {
      return outputVerifications
    }
    return outputVerifications.filter((item) => item.status === status)
  }, [outputVerifications, status])

  const counts = useMemo(() => {
    const tally = { all: outputVerifications.length, pending: 0, verified: 0, denied: 0 }
    outputVerifications.forEach((item) => {
      tally[item.status] = (tally[item.status] || 0) + 1
    })
    return tally
  }, [outputVerifications])

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">
            <i className="bi bi-patch-check-fill me-2 text-brand"></i>Output Verification Records
          </h2>
          <span className="text-muted">Total: {outputVerifications.length}</span>
        </div>
      </div>

      <div className="filter-row">
        <div className="status-tabs">
          {STATUSES.map((value) => (
            <button
              key={value}
              type="button"
              className={`status-tab ${status === value ? 'status-tab--active' : ''}`}
              onClick={() => setStatus(value)}
            >
              {value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1)} ({counts[value]})
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-text">
          {outputVerifications.length === 0 ? 'No verification records found.' : 'No verifications match the selected status.'}
        </p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Farm</th>
                <th>Output (kg)</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold">{farmerName(item.ownerId)}</td>
                  <td>{item.farmName}</td>
                  <td>{Number(item.farmOutput).toLocaleString()}</td>
                  <td>
                    <span className={`badge badge--${item.status}`}>{item.status}</span>
                  </td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}