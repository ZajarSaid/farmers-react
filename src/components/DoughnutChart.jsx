import { palette } from '../utils/colors.js'

function DoughnutChart({ data, size = 200 }) {
  const items = Array.isArray(data) ? data : []
  const total = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0)

  if (total === 0) {
    return <p className="empty-text">No data available.</p>
  }

  const radius = size / 2
  const stroke = radius * 0.72
  const circumference = 2 * Math.PI * (radius - stroke / 2)

  const segments = items.reduce((acc, item, index) => {
    const fraction = (Number(item.value) || 0) / total
    const previousShare = acc.reduce((sum, segment) => sum + segment.fraction, 0)
    const length = fraction * circumference
    const offset = -previousShare * circumference
    acc.push({
      key: item.label + index,
      length,
      offset,
      fraction,
      color: palette(index),
      label: item.label,
      value: Number(item.value) || 0,
    })
    return acc
  }, [])

  return (
    <div className="doughnut">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${radius} ${radius})`}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - stroke / 2}
            fill="none"
            stroke="#e9ecef"
            strokeWidth={stroke}
          />
          {segments.map((segment) => (
            <circle
              key={segment.key}
              cx={radius}
              cy={radius}
              r={radius - stroke / 2}
              fill="none"
              stroke={segment.color}
              strokeWidth={stroke}
              strokeDasharray={`${segment.length} ${circumference}`}
              strokeDashoffset={segment.offset}
            />
          ))}
        </g>
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={radius * 0.28}
          fontWeight={600}
          fill="#212529"
        >
          {total.toLocaleString()}
        </text>
      </svg>
      <ul className="doughnut-legend">
        {segments.map((segment) => (
          <li key={segment.key}>
            <span className="doughnut-dot" style={{ background: segment.color }}></span>
            <span className="doughnut-name">{segment.label}</span>
            <span className="doughnut-value">{segment.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DoughnutChart