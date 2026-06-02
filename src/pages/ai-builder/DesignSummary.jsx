import { useNavigate } from 'react-router-dom'
import { formatINR } from '../../utils/helpers'
import {
  bomItems,
  complianceChecks,
  costItems,
  designVariations,
  energyStats,
  immersiveItems,
  marketplaceCategories,
  roomPlan,
  samplePrompt,
  smartHomeItems,
  timelineItems,
  workforceItems,
} from './aiHomeBuilderData'

const totalCost = costItems.reduce((sum, item) => sum + item.value, 0)
const bomSubtotal = bomItems.reduce((sum, item) => sum + Number(String(item.qty).replace(/,/g, '')) * item.price, 0)

function ReportCard({ title, icon, children, className = '' }) {
  return (
    <section className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-indigo-600">{icon}</span>
        <h2 className="font-black text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function DesignSummary() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => navigate('/ai-builder/canvas')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Back">
            <span className="material-symbols-outlined text-gray-500">arrow_back</span>
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-black text-gray-900 font-headline truncate">AI Home Builder Project Report</h1>
            <p className="hidden md:block text-[11px] text-gray-500 truncate">{samplePrompt}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-gray-700 text-xs font-bold">
            <span className="material-symbols-outlined text-base">share</span> Collaborate
          </button>
          <button className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95">
            Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto p-4 md:p-6 space-y-6">
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-gray-950 text-white rounded-2xl p-6 overflow-hidden relative min-h-[360px]">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-100">
                <span className="material-symbols-outlined text-sm">auto_awesome</span> AI Generated
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-5 max-w-3xl">Modern 3BHK villa, Chennai</h2>
              <p className="text-slate-300 max-w-2xl mt-3 leading-relaxed">
                Includes modular kitchen, pooja room, home office, two-car parking, solar panels, garden, rainwater harvesting, smart home planning, and marketplace-ready procurement.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                {[
                  ['Built-up Area', '2,260 sq.ft'],
                  ['Budget Fit', 'Rs.50L'],
                  ['Timeline', '9 months'],
                  ['Energy Score', '91/100'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/10 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{label}</p>
                    <p className="text-xl font-black mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ReportCard title="Cost Estimation" icon="payments" className="bg-white">
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
              {costItems.map(item => (
                <div key={item.name} className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-black text-gray-900">{formatINR(item.value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
              <span className="font-black text-indigo-900">Total Project Cost</span>
              <span className="text-2xl font-black text-indigo-700">{formatINR(totalCost)}</span>
            </div>
          </ReportCard>
        </section>

        <section className="grid xl:grid-cols-3 gap-6">
          <ReportCard title="Floor Plan + Dimensions" icon="architecture">
            <div className="relative h-[360px] bg-slate-50 border-2 border-slate-800 rounded overflow-hidden">
              {roomPlan.map(room => (
                <div key={room.id} className={`absolute border p-1.5 ${room.color}`} style={{ left: `${room.x}%`, top: `${room.y}%`, width: `${room.w}%`, height: `${room.h}%` }}>
                  <p className="text-[10px] font-black truncate">{room.name}</p>
                  <p className="text-[9px] font-semibold">{room.size}</p>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Construction Timeline" icon="timeline">
            <div className="space-y-3">
              {timelineItems.map((item, index) => (
                <div key={item.phase}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-gray-700">{index + 1}. {item.phase}</span>
                    <span className="text-gray-500">{item.weeks} weeks</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Workforce Requirement" icon="engineering">
            <div className="grid grid-cols-2 gap-3">
              {workforceItems.map(item => (
                <div key={item.role} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-2xl font-black text-indigo-700">{item.count}</p>
                  <p className="text-xs font-bold text-gray-600 mt-1">{item.role}</p>
                </div>
              ))}
            </div>
          </ReportCard>
        </section>

        <section className="grid xl:grid-cols-[1.25fr_0.75fr] gap-6">
          <ReportCard title="Bill of Materials + Marketplace Cart" icon="receipt_long">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-gray-400 border-b">
                    <th className="py-2 pr-3">Material</th>
                    <th className="py-2 pr-3">Qty</th>
                    <th className="py-2 pr-3">Unit Price</th>
                    <th className="py-2 pr-3">GST</th>
                    <th className="py-2">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {bomItems.map(item => (
                    <tr key={item.item} className="border-b border-slate-100">
                      <td className="py-3 pr-3 font-bold text-gray-800">{item.item}</td>
                      <td className="py-3 pr-3 text-gray-600">{item.qty} {item.unit}</td>
                      <td className="py-3 pr-3 text-gray-600">{formatINR(item.price)}</td>
                      <td className="py-3 pr-3 text-gray-600">{item.gst}</td>
                      <td className="py-3 text-gray-600">{item.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div>
                <p className="text-xs text-gray-500">Estimated marketplace cart subtotal</p>
                <p className="text-xl font-black text-gray-900">{formatINR(bomSubtotal)}</p>
              </div>
              <button onClick={() => navigate('/marketplace')} className="px-5 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700">
                Purchase Materials
              </button>
            </div>
          </ReportCard>

          <ReportCard title="Compliance Engine" icon="rule">
            <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-3">
              {complianceChecks.map(item => (
                <div key={item.label} className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <span className="material-symbols-outlined text-indigo-600 text-lg">{item.icon}</span>{item.label}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${item.status === 'Passed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </ReportCard>
        </section>

        <section className="grid xl:grid-cols-3 gap-6">
          <ReportCard title="Interior Design Studio" icon="chair">
            <div className="space-y-3">
              {[
                ['Living Room', 'Sofa, TV unit, coffee table, carpet'],
                ['Bedroom', 'Bed, wardrobe, study table'],
                ['Kitchen', 'Refrigerator, stove, chimney, dishwasher'],
                ['Bathroom', 'Wash basin, shower, toilet'],
              ].map(([room, items]) => (
                <div key={room} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="font-black text-gray-900">{room}</p>
                  <p className="text-xs text-gray-600 mt-1">{items}</p>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Material Design Studio" icon="palette">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Walls', 'White, texture, stone'],
                ['Floor', 'Marble, granite, tiles, wood'],
                ['Ceiling', 'POP, wood, premium lights'],
                ['3D Preview', 'Instant material rendering'],
              ].map(([surface, options]) => (
                <div key={surface} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-sm font-black text-gray-900">{surface}</p>
                  <p className="text-[11px] text-gray-600 mt-1">{options}</p>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Exterior Design Studio" icon="villa">
            <div className="grid grid-cols-2 gap-3">
              {['Compound wall', 'Main gate', 'Garden', 'Swimming pool', 'Driveway', 'Solar panels', 'Terrace garden', 'Outdoor lighting'].map(item => (
                <div key={item} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                  <p className="text-xs font-black text-emerald-900">{item}</p>
                </div>
              ))}
            </div>
          </ReportCard>
        </section>

        <section className="grid xl:grid-cols-3 gap-6">
          <ReportCard title="Energy Intelligence" icon="bolt">
            <div className="grid grid-cols-2 gap-3">
              {energyStats.map(item => (
                <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <span className="material-symbols-outlined text-indigo-600 text-lg">{item.icon}</span>
                  <p className="text-sm font-black text-gray-900 mt-2">{item.value}</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Design Variations" icon="compare">
            <div className="space-y-3">
              {designVariations.map(item => (
                <div key={item.name} className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-gray-900">Option {item.name}</p>
                    <p className="font-black text-indigo-700">{formatINR(item.cost)}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.area} - {item.timeline} - Energy {item.efficiency}/100</p>
                  <p className="text-xs text-gray-600 mt-2">{item.materials}</p>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Smart Home + Maintenance" icon="settings_remote">
            <div className="grid grid-cols-2 gap-3">
              {smartHomeItems.map(item => (
                <div key={item} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                  <span className="material-symbols-outlined text-indigo-600 text-lg">check_circle</span>
                  <p className="text-xs font-bold text-indigo-900 mt-2">{item}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/luxe-home/maintenance')} className="w-full mt-4 py-3 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800">
              Open Maintenance Plan
            </button>
          </ReportCard>
        </section>

        <section className="grid xl:grid-cols-3 gap-6">
          <ReportCard title="Immersive Experience" icon="view_in_ar">
            <div className="space-y-3">
              {immersiveItems.map(item => (
                <div key={item.name} className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <span className="material-symbols-outlined text-indigo-600 text-lg">{item.icon}</span>{item.name}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${item.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </ReportCard>

          <ReportCard title="Marketplace Integration" icon="shopping_cart">
            <div className="space-y-3">
              {marketplaceCategories.map(item => (
                <div key={item.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600">{item.icon}</span>
                    <p className="font-black text-gray-900">{item.name}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.items}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => navigate('/equipment')} className="py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800">
                Rent Equipment
              </button>
              <button onClick={() => navigate('/workforce')} className="py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700">
                Hire Workers
              </button>
            </div>
          </ReportCard>

          <ReportCard title="Construction Launch" icon="rocket_launch">
            <div className="space-y-3">
              {['Finalize design approval', 'Lock material cart', 'Book equipment slots', 'Hire verified workforce', 'Create project tracker'].map((item, index) => (
                <div key={item} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">{index + 1}</span>
                  <p className="text-sm font-bold text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/project-tracker')} className="w-full mt-4 py-3 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800">
              Start Construction
            </button>
          </ReportCard>
        </section>

        <ReportCard title="Export Center" icon="download">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {['PDF', 'DWG', 'Excel', 'Image', '3D Model', 'Bill Of Materials', 'Cost Report', 'Project Timeline'].map(item => (
              <button key={item} className="min-h-20 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 text-sm font-black text-gray-800 transition-all">
                {item}
              </button>
            ))}
          </div>
        </ReportCard>
      </main>
    </div>
  )
}
