export default function StatCard({ icon, label, value, sub, color = 'orange', onClick }) {
  const colors = {
    orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
    indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    green:  'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white',
    red:    'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
    yellow: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white',
  }
  return (
    <div className="stat-card group cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${colors[color]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {sub && <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{sub}</span>}
      </div>
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-black text-gray-900 font-headline">{value}</p>
    </div>
  )
}
