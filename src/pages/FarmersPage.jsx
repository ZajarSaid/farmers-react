import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFarmers } from '../context/FarmersContext.jsx'
import SearchInput from '../components/SearchInput.jsx'

export default function FarmersPage() {
  const { farmers, farmsByOwner } = useFarmers()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) {
      return farmers
    }
    return farmers.filter((farmer) => {
      const fullName = `${farmer.firstName} ${farmer.lastName}`.toLowerCase()
      return (
        fullName.includes(term) ||
        farmer.email.toLowerCase().includes(term) ||
        farmer.phone.toLowerCase().includes(term) ||
        farmer.username.toLowerCase().includes(term)
      )
    })
  }, [farmers, search])

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">
            <i className="bi bi-people-fill me-2 text-brand"></i>Registered Farmers
          </h2>
          <span className="text-muted">Total: {farmers.length}</span>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search farmers..." />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-text">{farmers.length === 0 ? 'No farmers found.' : 'No farmers match your search.'}</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Farms</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((farmer) => {
                const farmCount = farmsByOwner(farmer.id).length
                return (
                  <tr key={farmer.id}>
                    <td className="fw-semibold">{farmer.firstName}</td>
                    <td>{farmer.lastName}</td>
                    <td>{farmer.email}</td>
                    <td>{farmer.phone}</td>
                    <td>
                      {farmCount >= 1 ? (
                        <span className="text-brand"><i className="bi bi-tree-fill me-1"></i>{farmCount}</span>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge--${farmer.status.toLowerCase()}`}>{farmer.status}</span>
                    </td>
                    <td className="text-end">
                      <Link to={`/farmers/${farmer.id}`} className="btn btn-outline-sm">
                        <i className="bi bi-eye me-1"></i>View
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}