import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const actions = [
  { icon: 'inventory_2', label: 'Buy Materials', sub: 'Steel, Cement, Sand, Bricks', route: ROUTES.marketplace, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: 'construction', label: 'Rent Equipment', sub: 'Cranes, JCBs, Mixers', route: ROUTES.equipment, color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: 'person_search', label: 'Hire Workers', sub: 'Daily wage & skilled labor', route: ROUTES.workforce, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: 'groups', label: 'Book Construction Teams', sub: 'End-to-end project teams', route: ROUTES.workforce, color: 'bg-purple-50 text-purple-600 border-purple-100' },
]

const materials = [
  { icon: 'rebase_edit', name: 'TMT Steel (Fe 550)', sub: 'Primary Brands', price: '₹ 68,500 / Ton', change: '-2.4%', trend: 'trending_down', trendColor: 'text-emerald-500' },
  { icon: 'texture', name: 'OPC Cement (Grade 53)', sub: 'PPC/OPC Varieties', price: '₹ 420 / Bag', change: '+0.8%', trend: 'trending_up', trendColor: 'text-red-500' },
  { icon: 'grain', name: 'M-Sand (Plastering)', sub: 'Certified Quality', price: '₹ 4,200 / Unit', change: '0.0%', trend: 'horizontal_rule', trendColor: 'text-slate-400' },
  { icon: 'landslide', name: 'River Sand', sub: 'Premium Sieve Quality', price: '₹ 8,200 / Unit', change: '+1.2%', trend: 'trending_up', trendColor: 'text-red-500' },
]

export default function ProcurementHub() {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-label">Marketplace</span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-4">One Platform for Everything You Need</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Wholesale prices. Verified suppliers. Instant logistics across Tamil Nadu.</p>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {actions.map(({ icon, label, sub, route, color }) => (
            <button
              key={label}
              onClick={() => navigate(route)}
              className={`glass-card rounded-2xl p-6 text-left border hover:-translate-y-1 transition-transform active:scale-95 ${color}`}
            >
              <span className={`material-symbols-outlined text-2xl mb-3 block`}>{icon}</span>
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs opacity-70 mt-0.5">{sub}</p>
            </button>
          ))}
        </div>

        {/* Material rates */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-headline font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">monitoring</span>
              Live Material Rates
            </h3>
            <div className="space-y-3">
              {materials.map(({ icon, name, sub, price, change, trend, trendColor }) => (
                <div key={name} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:shadow-ambient transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-600">{icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{name}</p>
                      <p className="text-xs text-slate-400">{sub}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{price}</p>
                    <p className={`text-xs flex items-center justify-end gap-0.5 ${trendColor}`}>
                      <span className="material-symbols-outlined text-xs">{trend}</span>{change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heavy equipment highlight */}
          <div>
            <h3 className="font-headline font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">construction</span>
              Equipment Rental
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Heavy Crane (20T)', sub: 'Rental Daily/Monthly', price: '₹ 15,000 / Day' },
                { name: 'JCB Excavator', sub: 'With Operator', price: '₹ 8,500 / Day' },
                { name: 'Concrete Mixer', sub: '1.5 Bag Capacity', price: '₹ 2,200 / Day' },
                { name: 'Bar Bending Machine', sub: 'Electric Operated', price: '₹ 1,800 / Day' },
              ].map(({ name, sub, price }) => (
                <div key={name} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 border-l-4 border-l-orange-400 hover:shadow-ambient transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-500">construction</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{name}</p>
                      <p className="text-xs text-slate-400">{sub}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{price}</p>
                    <button onClick={() => navigate(ROUTES.equipment)} className="text-xs text-orange-500 font-semibold hover:underline mt-0.5">Rent Now →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
