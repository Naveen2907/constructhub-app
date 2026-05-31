import { useNavigate } from 'react-router-dom'
import RevenueChart from '../../components/charts/RevenueChart'
import ProgressBar from '../../components/ui/ProgressBar'
import appData from '../../data/appData.json'
import { formatINRShort, formatINR } from '../../utils/helpers'

const { vendor_dashboard: vd } = appData

export default function VendorHub() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313] border-b border-white/5">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black text-orange-500 uppercase tracking-tighter font-headline">ConstructHub</div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {['Dashboard','Logistics','Procurement'].map((t,i) => (
                <span key={t} className={`font-semibold cursor-pointer transition-colors px-3 py-1 rounded-full ${i===0?'text-orange-500':'text-gray-400 hover:bg-white/5 hover:text-white'}`}>{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-orange-500 cursor-pointer">location_on</span>
              <span className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white transition-colors">search</span>
              <span className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white transition-colors">account_circle</span>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard')} className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-gray-400">arrow_back</span>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-[60] hidden lg:flex flex-col h-full w-64 bg-[#131313]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl py-8">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-orange-500">
              <img src="https://i.pravatar.cc/150?img=5" alt="Vendor" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-orange-500 font-bold text-sm">Project Alpha</h3>
              <p className="text-xs text-gray-500">Tamil Nadu Region</p>
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-300 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20">
            Create New Order
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-3">
          {[
            ['precision_manufacturing','Materials',false],
            ['construction','Machinery',false],
            ['engineering','Workers',false],
            ['analytics','Project Tracker',false],
            ['storefront','Vendor Hub',true],
          ].map(([icon,label,active]) => (
            <div key={label} className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-full cursor-pointer transition-all ${active?'bg-gradient-to-r from-orange-500 to-orange-300 text-white':'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined text-lg">{icon}</span>
              <span className="font-semibold uppercase tracking-widest text-[10px]">{label}</span>
            </div>
          ))}
        </nav>
        <div className="px-6 pt-6 mt-auto border-t border-white/5 space-y-3">
          {[['verified_user','Safety Compliance'],['receipt_long','GST Invoices']].map(([icon,label]) => (
            <div key={label} className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">{icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 pt-24 px-6 md:px-10 pb-12 min-h-screen">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs">Partner Ecosystem</span>
            <h1 className="text-5xl font-extrabold tracking-tighter mt-2 text-white font-headline">Vendor Hub</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2a2a2a] rounded-2xl p-5 min-w-[160px]">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Monthly Revenue</span>
              <p className="text-2xl font-black text-white mt-1">{formatINRShort(vd.monthly_revenue_inr)}</p>
              <div className="flex items-center gap-1 text-green-400 mt-2">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span className="text-[10px] font-bold">+12% vs last month</span>
              </div>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl p-5 min-w-[160px]">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Pending Payout</span>
              <p className="text-2xl font-black text-orange-400 mt-1">{formatINRShort(vd.pending_payout_inr)}</p>
              <div className="flex items-center gap-1 text-gray-500 mt-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="text-[10px] font-bold">ETA: {vd.payout_eta}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Revenue Chart */}
        <div className="bg-[#201f1f] rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white font-headline mb-4">Revenue Trend</h3>
          <RevenueChart data={vd.revenue_chart} dark />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Active Orders */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            <div className="bg-[#201f1f] rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-500">local_shipping</span>
                  <h2 className="text-lg font-bold text-white">Active Logistics & Fleet</h2>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-orange-500 hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {vd.active_orders.map(order => (
                  <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center gap-5 p-5 rounded-2xl bg-[#1c1b1b] hover:bg-[#2a2a2a] transition-all group">
                    <div className="w-14 h-14 rounded-xl bg-[#353534] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl text-gray-300">{order.type==='rental'?'construction':'precision_manufacturing'}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-white">{order.item}</h4>
                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status==='ongoing'?'bg-yellow-500/20 text-yellow-400':'bg-blue-500/20 text-blue-400'}`}>
                          {order.status==='ongoing'?'Ongoing':'In Transit'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{order.project}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-gray-500">{order.status==='ongoing'?'Return Date':'Live ETA'}</span>
                      <p className="font-bold text-white">{order.return_date || order.eta}</p>
                    </div>
                    <button className="p-3 rounded-full bg-[#353534] text-white group-hover:bg-orange-500 transition-colors">
                      <span className="material-symbols-outlined text-sm">{order.status==='ongoing'?'open_in_new':'location_searching'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fleet */}
            <div className="bg-[#201f1f] rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-500">inventory_2</span>
                  <h2 className="text-lg font-bold text-white uppercase tracking-tight">Fleet & Inventory</h2>
                </div>
                <button className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                  Add Asset
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vd.fleet.map(item => (
                  <div key={item.name} className="bg-[#353534]/40 backdrop-blur p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-orange-400 text-3xl">layers</span>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Stock</span>
                        <p className="font-bold text-lg text-white">{item.units}</p>
                      </div>
                    </div>
                    <h4 className="font-bold text-white mb-0.5">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-4">{item.model}</p>
                    <ProgressBar value={item.utilization_pct} color="orange" height="h-1.5" />
                    <p className="text-[10px] text-gray-500 mt-1">{item.utilization_pct}% utilized</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calendar + Districts */}
          <div className="col-span-12 xl:col-span-4 space-y-6">
            {/* Calendar */}
            <div className="bg-[#201f1f] rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-orange-500">calendar_month</span>
                <h2 className="text-lg font-bold text-white">Fleet Availability</h2>
              </div>
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="text-center text-[10px] font-black text-gray-500">{d}</div>)}
                {[20,21,22,23,24,25,26,27,28].map(d => (
                  <div key={d} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-semibold ${[24,25].includes(d)?'bg-orange-500 text-white font-bold':d===23?'bg-[#2a2a2a] border border-orange-500 text-white':'bg-[#1c1b1b] text-gray-500'}`}>{d}</div>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                {[['Excavator #104','Booked','bg-orange-500'],['Crane Unit A2','Reserved','bg-yellow-500']].map(([name,status,dot]) => (
                  <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-[#1c1b1b]">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${dot}`} />
                      <span className="text-xs font-bold text-white">{name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Districts */}
            <div className="bg-[#201f1f] rounded-3xl overflow-hidden">
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-1">
                  <span className="material-symbols-outlined text-orange-500">map</span>
                  <h2 className="text-lg font-bold text-white">Service Districts</h2>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Region: Tamil Nadu Central</p>
              </div>
              <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400" alt="Map" className="w-full h-full object-cover grayscale opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201f1f] to-transparent" />
                <div className="absolute top-3 left-4 p-2 bg-[#353534]/80 backdrop-blur rounded-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Selected: {vd.service_districts.length} Districts</p>
                </div>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {vd.service_districts.map(d => (
                    <span key={d} className="px-3 py-1 rounded-full bg-[#353534] text-[10px] font-bold text-orange-400">{d}</span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-[#1c1b1b] text-[10px] font-bold text-gray-500">Trichy</span>
                </div>
                <button className="w-full py-3 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors text-gray-400">
                  Manage Coverage Area
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Request */}
        <div className="mt-6 bg-orange-500 rounded-3xl p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-white/80">bolt</span>
                <span className="text-xs font-black uppercase tracking-widest text-white/80">Urgent Request</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white mb-1">New Site Requirement: Tirupur Cluster</h2>
              <p className="text-white/80 font-medium">Immediate procurement for 2500 bags of Portland Cement & Logistics support.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="px-7 py-3 bg-white text-orange-600 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95">
                Accept Quotation
              </button>
              <button className="px-7 py-3 bg-white/20 backdrop-blur text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/30 transition-all">
                Decline
              </button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[14rem] text-white">precision_manufacturing</span>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-orange-500 text-white shadow-2xl shadow-orange-500/40 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  )
}
