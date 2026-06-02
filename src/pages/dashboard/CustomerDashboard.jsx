import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import RevenueChart from '../../components/charts/RevenueChart'
import appData from '../../data/appData.json'
import { formatINR, formatINRShort, formatDate } from '../../utils/helpers'

const QUICK_LINKS = [
  { to: '/ai-builder',      icon: 'architecture',    label: 'AI Home Builder',  color: 'bg-indigo-500' },
  { to: '/marketplace',     icon: 'storefront',      label: 'Buy Materials',    color: 'bg-orange-500' },
  { to: '/equipment',       icon: 'construction',    label: 'Rent Equipment',   color: 'bg-yellow-500' },
  { to: '/workforce',       icon: 'engineering',     label: 'Hire Workers',     color: 'bg-green-500' },
  { to: '/project-tracker', icon: 'analytics',       label: 'Track Project',    color: 'bg-blue-500' },
  { to: '/luxe-home',       icon: 'home_iot_device', label: 'Luxe Home',        color: 'bg-purple-500' },
]

export default function CustomerDashboard() {
  const navigate = useNavigate()
  const { user } = useSelector(s => s.auth)
  const role = user?.role || 'homeowner'
  const project = appData.projects[0]
  const orders  = appData.orders
  const invoices = appData.invoices
  const alerts  = appData.maintenance_alerts.filter(a => a.status !== 'upcoming')
  const chartData = appData.vendor_dashboard.revenue_chart
  const roleQuickLinks = QUICK_LINKS.filter(link => {
    if (role === 'homeowner') return true
    if (role === 'vendor') return ['/equipment', '/vendor', '/dashboard'].includes(link.to)
    return true
  })

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">

      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 min-h-[180px] flex items-center">
        <div className="absolute inset-0 gradient-orange opacity-80" />
        <div className="absolute inset-0 opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute border border-white rounded-full"
              style={{ width: `${(i+1)*200}px`, height: `${(i+1)*200}px`, top: '50%', right: '-100px', transform: 'translateY(-50%)' }} />
          ))}
        </div>
        <div className="relative z-10 px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
          <div>
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">Welcome back</p>
            <h1 className="text-3xl md:text-4xl font-black text-white font-headline leading-tight">
              {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-white/80 mt-2">You have <span className="font-bold text-white">{orders.length} active orders</span> and <span className="font-bold text-white">{alerts.length} maintenance alerts</span> today.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate(role === 'vendor' ? '/vendor' : role === 'admin' ? '/admin' : '/ai-builder')} className="flex items-center gap-2 bg-white text-orange-600 font-bold px-5 py-3 rounded-2xl hover:bg-orange-50 transition-all active:scale-95 shadow-lg">
              <span className="material-symbols-outlined">{role === 'vendor' ? 'store' : role === 'admin' ? 'admin_panel_settings' : 'architecture'}</span> {role === 'vendor' ? 'Open Vendor Hub' : role === 'admin' ? 'Open Admin Panel' : 'Start Designing'}
            </button>
            <button onClick={() => navigate(role === 'vendor' ? '/equipment' : '/marketplace')} className="flex items-center gap-2 bg-white/20 text-white font-bold px-5 py-3 rounded-2xl hover:bg-white/30 transition-all active:scale-95">
              <span className="material-symbols-outlined">{role === 'vendor' ? 'construction' : 'storefront'}</span> {role === 'vendor' ? 'Manage Equipment' : 'Marketplace'}
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="analytics"       label="Active Projects"  value={appData.projects.length}          color="orange" onClick={() => navigate('/project-tracker')} />
        <StatCard icon="local_shipping"  label="Active Orders"    value={orders.length}                    color="indigo" onClick={() => navigate('/marketplace')} />
        <StatCard icon="currency_rupee"  label="Total Spent"      value={formatINRShort(project.spent_inr)} color="green"  />
        <StatCard icon="build"           label="Maintenance Alerts" value={alerts.length}                  color="red"    onClick={() => navigate('/luxe-home')} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Project Progress — 2 cols */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-ambient">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="section-label">Active Project</p>
              <h3 className="text-xl font-bold font-headline text-gray-900 mt-1">{project.name}</h3>
            </div>
            <button onClick={() => navigate('/project-tracker')} className="flex items-center gap-1 text-sm text-orange-500 font-bold hover:underline">
              View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Overall progress */}
          <div className="mb-6 p-4 bg-orange-50 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">Overall Completion</span>
              <span className="text-lg font-black text-orange-600">{project.completion_pct}%</span>
            </div>
            <ProgressBar value={project.completion_pct} color="orange" height="h-3" />
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>Started {formatDate(project.start_date)}</span>
              <span>Est. {formatDate(project.est_end_date)}</span>
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-3">
            {project.stages.slice(0, 5).map(stage => (
              <div key={stage.id} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  stage.status === 'completed' ? 'bg-green-500' :
                  stage.status === 'active'    ? 'bg-orange-500 ring-4 ring-orange-100' :
                  'bg-gray-200'
                }`}>
                  {stage.status === 'completed'
                    ? <span className="material-symbols-outlined text-white text-sm">check</span>
                    : stage.status === 'active'
                    ? <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    : <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-semibold ${stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-800'}`}>{stage.name}</span>
                    <span className={`text-xs font-bold ${stage.status === 'completed' ? 'text-green-600' : stage.status === 'active' ? 'text-orange-600' : 'text-gray-400'}`}>{stage.pct}%</span>
                  </div>
                  {stage.status !== 'upcoming' && <ProgressBar value={stage.pct} color={stage.status === 'completed' ? 'green' : 'orange'} height="h-1.5" />}
                </div>
              </div>
            ))}
          </div>

          {/* Budget */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Budget</p>
              <p className="text-xl font-black text-gray-900">{formatINR(project.budget_inr)}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-2xl">
              <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-1">Spent (12% over)</p>
              <p className="text-xl font-black text-red-600">{formatINR(project.spent_inr)}</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Active Orders */}
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-headline">Active Orders</h3>
              <button onClick={() => navigate('/marketplace')} className="text-xs text-orange-500 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-orange-500 text-sm">local_shipping</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{order.id}</p>
                    <p className="text-xs text-gray-500 truncate">{order.items[0]?.name}</p>
                  </div>
                  <Badge status={order.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-headline">Invoices</h3>
              <button className="text-xs text-orange-500 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {invoices.map(inv => (
                <div key={inv.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-gray-500 text-sm">receipt</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{inv.id}</p>
                    <p className="text-xs text-gray-400">{formatDate(inv.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900">{formatINRShort(inv.amount_inr)}</p>
                    <Badge status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div>
        <p className="section-label mb-4">Quick Access</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {role === 'vendor' && (
            <button onClick={() => navigate('/vendor')}
              className="bg-white rounded-3xl p-5 shadow-ambient hover:-translate-y-1 hover:shadow-ambient-lg transition-all duration-300 flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white">store</span>
              </div>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight">Vendor Hub</span>
            </button>
          )}
          {roleQuickLinks.map(({ to, icon, label, color }) => (
            <button key={to} onClick={() => navigate(to)}
              className="bg-white rounded-3xl p-5 shadow-ambient hover:-translate-y-1 hover:shadow-ambient-lg transition-all duration-300 flex flex-col items-center gap-3 group">
              <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-white">{icon}</span>
              </div>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spending Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-ambient">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Platform Activity</p>
            <h3 className="text-xl font-bold font-headline text-gray-900 mt-1">Monthly Revenue Trend</h3>
          </div>
        </div>
        <RevenueChart data={chartData} />
      </div>

      {/* Maintenance Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-ambient">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">warning</span>
              <h3 className="font-bold text-gray-900 font-headline">Maintenance Alerts</h3>
            </div>
            <button onClick={() => navigate('/luxe-home/maintenance')} className="text-xs text-orange-500 font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-2xl border-l-4 ${alert.status === 'overdue' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-400'}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${alert.status === 'overdue' ? 'text-red-500' : 'text-yellow-600'}`}>
                  {alert.status === 'overdue' ? `Overdue: ${alert.overdue_days} days` : 'Due Soon'}
                </p>
                <p className="font-bold text-gray-900">{alert.appliance_name}</p>
                <p className="text-sm text-gray-600 mt-0.5">{alert.type}</p>
                <button onClick={() => navigate('/luxe-home/maintenance')}
                  className="mt-3 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                  Schedule Service <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
