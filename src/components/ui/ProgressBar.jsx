export default function ProgressBar({ value, max = 100, color = 'orange', showLabel = false, height = 'h-2' }) {
  const pct = Math.min((value / max) * 100, 100)
  const colors = {
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-600',
    green:  'bg-green-500',
    red:    'bg-red-500',
    yellow: 'bg-yellow-400',
  }
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
          <span>{value}%</span><span>{max}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
