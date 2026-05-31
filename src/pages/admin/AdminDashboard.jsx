import { useNavigate } from 'react-router-dom'
import StatCard from '../../components/ui/StatCard'
import RevenueChart from '../../components/charts/RevenueChart'
import BudgetChart from '../../components/charts/BudgetChart'
import appData from '../../data/appData.json'
import { formatINRShort } from '../../utils/helpers'

const { admin_stats: stats } = appData

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="section-label mb-1">Admin Panel</p>
          <h1 className="text-4xl font-black font-headline text-gray-900 tracking-tight">Platform Analytics</h1>
          <p className="text-gray-500 mt-1">ConstructHub · Tamil Nadu Hub · Real-time overview</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span> Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> Add District
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="people"          label="Total Users"       value={stats.total_users.toLocaleString('en-IN')} color="indigo" />
        <StatCard icon="store"           label="Active Vendors"    value={stats.total_vendors}                       color="orange" />
        <StatCard icon="currency_rupee"  label="Total Revenue"     value={formatINRShort(stats.total_revenue_inr)}   color="green"  />
        <StatCard icon="construction"    label="Active Projects"   value={stats.active_projects}                     color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-ambient">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="section-label mb-1">Revenue</p>
              <h3 className="text-xl font-bold font-headline text-gray-900">Monthly Revenue Trend</h3>
            </div>
            <span className="badge badge-success">+{stats.monthly_growth_pct}% Growth</span>
          </div>
          <RevenueChart data={appData.vendor_dashboard.revenue_chart} />
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-ambient">
          <div className="mb-5">
            <p className="section-label mb-1">Users</p>
            <h3 className="text-xl font-bold font-headline text-gray-900">User Growth by Role</h3>
          </div>
          <BudgetChart data={stats.user_growth} />
        </div>
      </div>

      {/* District Stats */}
      <div className="bg-white rounded-3xl shadow-ambient overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="section-label mb-1">Districts</p>
            <h3 className="text-xl font-bold font-headline text-gray-900">Tamil Nadu District Performance</h3>
          </div>
          <span className="badge badge-info">{stats.districts_active} Active Districts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['District','Active Projects','Revenue','Market Share','Status'].map(h => (
                  <th key={h} className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.district_stats.map((d, i) => {
                const totalRev = stats.district_stats.reduce((s, x) => s + x.revenue_inr, 0)
                const share = ((d.revenue_inr / totalRev) * 100).toFixed(1)
                return (
                  <tr key={d.district} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-orange-500 text-sm">location_on</span>
                        </div>
                        <span className="font-bold text-gray-900">{d.district}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">{d.projects}</td>
                    <td className="px-6 py-4 font-black text-gray-900">{formatINRShort(d.revenue_inr)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${share}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{share}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-success">Active</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Pending Verifications', count: 12, icon: 'pending_actions', color: 'yellow', action: 'Review Now' },
          { title: 'New Vendor Requests', count: 5, icon: 'store', color: 'indigo', action: 'Approve Vendors' },
          { title: 'Support Tickets', count: 8, icon: 'support_agent', color: 'red', action: 'View Tickets' },
        ].map(item => {
          const colors = { yellow: 'bg-yellow-50 text-yellow-600', indigo: 'bg-indigo-50 text-indigo-600', red: 'bg-red-50 text-red-600' }
          const btnColors = { yellow: 'btn-secondary', indigo: 'btn-indigo', red: 'bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-2xl transition-all active:scale-95' }
          return (
            <div key={item.title} className="bg-white rounded-3xl p-6 shadow-ambient flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[item.color]}`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="text-3xl font-black text-gray-900 font-headline">{item.count}</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-400 mt-0.5">Requires immediate attention</p>
              </div>
              <button className={`${btnColors[item.color]} text-sm`}>{item.action}</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
