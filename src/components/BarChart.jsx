import { palette } from '../utils/colors.js'

function BarChart({ data, height = 240 }) {
  const items = Array.isArray(data) ? data : []
  if (items.length === 0) {
    return <p className="empty-text">No data available.</p>
  }

  const max = Math.max(...items.map((item) => Number(item.value) || 0), 1)

  return (
    <div className="bar-chart" style={{ height }}>
      <div className="bar-chart-axis">
        {items.map((item, index) => {
          const value = Number(item.value) || 0
          const percent = Math.round((value / max) * 100)
          return (
            <div className="bar-row" key={item.label + index}>
              <div className="bar-label" title={item.label}>{item.label}</div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.max(percent, 2)}%`, background: palette(index) }}
                />
              </div>
              <div className="bar-value">{value.toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BarChart