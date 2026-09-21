const COLORS = [
  '#2e7d32',
  '#66bb6a',
  '#a5d6a7',
  '#ef6c00',
  '#ffa726',
  '#ffcc80',
  '#1976d2',
  '#42a5f5',
  '#7e57c2',
  '#ab47bc',
  '#26a69a',
  '#8d6e63',
  '#78909c',
  '#d32f2f',
  '#f57f17',
  '#00695c',
  '#5d4037',
  '#546e7a',
  '#afb42b',
]

export function palette(index) {
  return COLORS[index % COLORS.length]
}