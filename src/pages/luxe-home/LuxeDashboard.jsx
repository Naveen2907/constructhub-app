import { useNavigate } from 'react-router-dom'
import StatCard from '../../components/ui/StatCard'
import appData from '../../data/appData.json'

export default function LuxeDashboard() {
  const navigate = useNavigate()
  const alerts = appData.maintenance_alerts
  const totalEnergy = appData.appliances.reduce((s, a) => s + a.energy_kwh_daily, 0).toFixed(1)
  const activeCount = appData.appliances.filter(a => a.status === 'active').length

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" alt="Luxe Home" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
        <div className="relative z-10 px-8 py-8">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-1">Luxe Home · Serene Intelligence</p>
          <h1 className="text-3xl font-black text-white font-headline mb-2">Welcome back, Arjun!</h1>
          <p className="text-white/70">Your home is running smoothly. All security protocols active and systems optimized.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="devices"      label="Total Devices"        value={appData.appliances.length} color="indigo" onClick={() => navigate('/luxe-home/appliances')} />
        <StatCard icon="check_circle" label="Active Now"           value={activeCount}               color="green"  onClick={() => navigate('/luxe-home/appliances')} />
        <StatCard icon="bolt"         label="Energy Usage (Daily)" value={`${totalEnergy} kWh`}      color="yellow" />
        <StatCard icon="warning"      label="Maintenance Alerts"   value={alerts.length}             color="red"    onClick={() => navigate('/luxe-home/maintenance')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <h3 className="font-bold text-gray-900 font-headline mb-5 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-600 rounded-full" /> Quick Actions
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => navigate('/luxe-home/add-appliance')} className="bg-indigo-600 text-white rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
                <span className="material-symbols-outlined text-3xl">add_circle</span>
                <span className="text-xs font-bold">Add New Device</span>
              </button>
              <button onClick={() => navigate('/luxe-home/maintenance')} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-gray-50 transition-all active:scale-95">
                <span className="material-symbols-outlined text-3xl text-indigo-600">calendar_today</span>
                <span className="text-xs font-bold text-gray-700">Schedule Service</span>
              </button>
              <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-gray-50 transition-all active:scale-95">
                <span className="material-symbols-outlined text-3xl text-indigo-600">analytics</span>
                <span className="text-xs font-bold text-gray-700">Energy Report</span>
              </button>
            </div>
          </div>

          {/* Upcoming Maintenance */}
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-900 font-headline flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full" /> Upcoming Maintenance
              </h3>
              <button onClick={() => navigate('/luxe-home/maintenance')} className="text-indigo-600 text-sm font-bold hover:underline">View Schedule</button>
            </div>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-5 hover:border-indigo-200 transition-colors group cursor-pointer">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100 flex-shrink-0">
                    <span className="text-xs font-bold text-gray-400">{new Date(alert.due_date).toLocaleString('en',{month:'short'}).toUpperCase()}</span>
                    <span className="text-xl font-black text-gray-900 leading-none">{new Date(alert.due_date).getDate()}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">{alert.type}</h5>
                    <p className="text-sm text-gray-500">{alert.appliance_name}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`badge ${alert.status==='overdue'?'badge-danger':alert.status==='due_soon'?'badge-warning':'badge-info'}`}>
                      {alert.status==='overdue'?`${alert.overdue_days}d Overdue`:alert.status==='due_soon'?'Due Soon':'Upcoming'}
                    </span>
                    <span className="material-symbols-outlined text-indigo-600 group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-3xl p-6 shadow-ambient">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 font-headline">Activity</h3>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-400 text-sm">more_horiz</span>
            </button>
          </div>
          <div className="relative space-y-6">
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-100" />
            {[
              {icon:'lightbulb',color:'bg-green-100 text-green-600',title:'Master Bedroom Lights',desc:'Turned off by "Night" scene.',time:'10 min ago'},
              {icon:'lock',color:'bg-indigo-100 text-indigo-600',title:'Main Entrance Door',desc:'Locked remotely by Arjun.',time:'45 min ago'},
              {icon:'kitchen',color:'bg-orange-100 text-orange-600',title:'Luxe Fridge Pro',desc:'Energy saving mode enabled.',time:'2 hours ago'},
              {icon:'person_add',color:'bg-gray-100 text-gray-600',title:'New Access Granted',desc:'Guest key created for Housekeeping.',time:'Yesterday'},
            ].map((item,i) => (
              <div key={i} className="relative flex gap-4">
                <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white flex-shrink-0 ${item.color}`}>
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  <span className="text-[10px] text-gray-400 uppercase font-bold mt-1 inline-block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-gray-400 border border-dashed border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-indigo-200 hover:text-indigo-600 transition-all">
            View All History
          </button>
        </div>
      </div>
    </div>
  )
}
