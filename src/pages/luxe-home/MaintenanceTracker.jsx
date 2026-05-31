import { useNavigate } from 'react-router-dom'
import appData from '../../data/appData.json'
import { formatDate } from '../../utils/helpers'

export default function MaintenanceTracker() {
  const navigate = useNavigate()
  const alerts = appData.maintenance_alerts
  const history = appData.service_history

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="section-label mb-1">Luxe Home</p>
        <h1 className="text-3xl font-black font-headline text-gray-900">Maintenance & Service</h1>
        <p className="text-gray-500 mt-1 max-w-2xl">Monitor system health and schedule professional care for your high-end appliances.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Alerts — 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">warning</span> Service Required
            </h2>
            <span className="badge badge-danger">{alerts.filter(a=>a.status!=='upcoming').length} Alerts Pending</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {alerts.map(alert => (
              <div key={alert.id} className={`bg-white rounded-3xl p-6 shadow-ambient border-l-4 relative overflow-hidden group ${alert.status==='overdue'?'border-red-500':alert.status==='due_soon'?'border-yellow-400':'border-blue-400'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 scale-150 pointer-events-none">
                  <span className="material-symbols-outlined text-6xl">build</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${alert.status==='overdue'?'text-red-500':alert.status==='due_soon'?'text-yellow-600':'text-blue-500'}`}>
                      {alert.status==='overdue'?`Overdue: ${alert.overdue_days} Days`:alert.status==='due_soon'?`Due: ${formatDate(alert.due_date)}`:`Upcoming: ${formatDate(alert.due_date)}`}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 font-headline">{alert.appliance_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{alert.type}</p>
                  </div>
                  <button className={`w-full py-3 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${alert.status==='overdue'?'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200':'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                    Schedule Service <span className="material-symbols-outlined text-sm">calendar_today</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Alerts — 4 cols */}
        <div className="lg:col-span-4 space-y-5">
          <h2 className="text-xl font-bold font-headline text-gray-900">Smart Alerts</h2>
          <div className="bg-indigo-50/50 border border-indigo-100/50 p-5 rounded-3xl space-y-5">
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm self-start flex-shrink-0">
                <span className="material-symbols-outlined text-indigo-600">verified_user</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Warranty Expiring</h4>
                <p className="text-sm text-gray-500 mt-0.5">Your <span className="font-semibold text-gray-800">Washing Machine</span> warranty ends in 30 days.</p>
                <a href="#" className="text-indigo-600 text-xs font-bold mt-2 inline-flex items-center gap-1 hover:underline">
                  Renew Warranty <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="h-px bg-indigo-100" />
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm self-start flex-shrink-0">
                <span className="material-symbols-outlined text-green-600">eco</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Efficiency Boost</h4>
                <p className="text-sm text-gray-500 mt-0.5">Cleaning solar panels could increase energy yield by up to 12%.</p>
              </div>
            </div>
          </div>

          {/* Elite Plan Card */}
          <div className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" alt="Elite Plan" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 p-5 z-20">
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Luxe Concierge</p>
              <h3 className="text-white font-bold text-lg font-headline">Elite Service Plan</h3>
              <p className="text-white/70 text-xs">Dedicated technician visits every quarter.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service History */}
      <div className="bg-white rounded-3xl shadow-ambient overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold font-headline text-gray-900">Service History</h2>
          <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
            Download Logs <span className="material-symbols-outlined text-sm">download</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Appliance','Date','Service Notes','Cost'].map(h => (
                  <th key={h} className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map(svc => (
                <tr key={svc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-indigo-500 text-sm">kitchen</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{svc.appliance_name}</p>
                        <p className="text-xs text-gray-400">{svc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">{formatDate(svc.date)}</td>
                  <td className="px-6 py-5 text-sm text-gray-500 max-w-xs">{svc.notes}</td>
                  <td className="px-6 py-5">
                    {svc.warranty_covered
                      ? <span className="text-sm font-bold text-green-600">₹0 <span className="text-xs text-gray-400 font-normal">WARRANTY</span></span>
                      : <span className="text-sm font-bold text-gray-900">₹{svc.cost_inr.toLocaleString('en-IN')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
