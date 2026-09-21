import { useFarmers } from '../context/FarmersContext.jsx'

export default function CropsPage() {
  const { crops } = useFarmers()

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">
            <i className="bi bi-basket-fill me-2 text-brand"></i>Registered Crops
          </h2>
          <span className="text-muted">Total: {crops.length}</span>
        </div>
      </div>

      {crops.length === 0 ? (
        <p className="empty-text">No crops found.</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.id}>
                  <td className="fw-semibold">{crop.name}</td>
                  <td>
                    <span className={`badge badge--${crop.cropType.toLowerCase()}`}>{crop.cropType}</span>
                  </td>
                  <td>{crop.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}