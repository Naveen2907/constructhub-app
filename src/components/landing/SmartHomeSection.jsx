import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const appliances = [
  { icon: 'ac_unit', label: 'Air Conditioner', action: 'Control', status: 'Active · 22°C', color: 'bg-sky-50 text-sky-600' },
  { icon: 'water_drop', label: 'Water Purifier', action: 'Monitor', status: 'Filtered: 1,240L', color: 'bg-blue-50 text-blue-600' },
  { icon: 'kitchen', label: 'Refrigerator', action: 'Status', status: 'Optimal · 4°C', color: 'bg-indigo-50 text-indigo-600' },
  { icon: 'solar_power', label: 'Solar System', action: 'Analytics', status: '18.4 kWh today', color: 'bg-amber-50 text-amber-600' },
  { icon: 'videocam', label: 'Security Camera', action: 'Live View', status: '6 cams · All Online', color: 'bg-slate-100 text-slate-600' },
  { icon: 'lock', label: 'Smart Locks', action: 'Manage', status: 'All Locked', color: 'bg-emerald-50 text-emerald-600' },
  { icon: 'bolt', label: 'Energy Usage', action: 'Dashboard', status: '8.2 kWh · -12% WoW', color: 'bg-yellow-50 text-yellow-600' },
  { icon: 'notifications_active', label: 'Maintenance Alerts', action: 'View Alerts', status: '1 Due this week', color: 'bg-red-50 text-red-600' },
]

export default function SmartHomeSection() {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-16">
          <span className="section-label text-indigo-400">After Construction</span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-4">Your Home, Intelligently Managed</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            After construction, ConstructHub stays with you. Monitor, control and maintain every system from one dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {appliances.map(({ icon, label, action, status, color }) => (
            <div
              key={label}
              onClick={() => navigate(ROUTES.smartHome)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </div>
              <p className="font-semibold text-sm mb-1">{label}</p>
              <p className="text-xs text-slate-500 mb-3">{status}</p>
              <span className="text-xs text-indigo-400 font-semibold group-hover:text-indigo-300 flex items-center gap-1">
                {action} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate(ROUTES.smartHome)}
            className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-900 flex items-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined">stars</span>
            Explore Smart Home Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}
