import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const costItems = [
  { icon: 'foundation', label: 'Construction Cost', value: '₹ 32,00,000', color: 'text-indigo-600', bar: 'bg-indigo-500', pct: 45 },
  { icon: 'inventory_2', label: 'Material Cost', value: '₹ 18,50,000', color: 'text-emerald-600', bar: 'bg-emerald-500', pct: 26 },
  { icon: 'engineering', label: 'Labour Cost', value: '₹ 9,20,000', color: 'text-orange-600', bar: 'bg-orange-500', pct: 13 },
  { icon: 'precision_manufacturing', label: 'Equipment Cost', value: '₹ 4,80,000', color: 'text-purple-600', bar: 'bg-purple-500', pct: 7 },
  { icon: 'receipt', label: 'Tax', value: '₹ 1,90,000', color: 'text-slate-600', bar: 'bg-slate-400', pct: 3 },
  { icon: 'percent', label: 'GST (18%)', value: '₹ 4,50,000', color: 'text-slate-600', bar: 'bg-slate-400', pct: 6 },
]

export default function CostEstimationSection() {
  const navigate = useNavigate()
  const total = '₹ 70,90,000'

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="section-label">Smart Pricing</span>
            <h2 className="font-headline text-4xl font-bold mt-2 mb-4">Know Your Costs Before You Build</h2>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">
              AI-driven cost estimation with district-accurate material rates. Updates live as you change your design.
            </p>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold mb-8 bg-emerald-50 px-4 py-2.5 rounded-xl w-fit">
              <span className="material-symbols-outlined text-base animate-spin" style={{ animationDuration: '3s' }}>sync</span>
              Updates live as you design
            </div>
            <button
              onClick={() => navigate(ROUTES.costEstimation)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              Get My Estimate
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Right — cost card */}
          <div className="glass-card rounded-[32px] p-8 border border-white shadow-ambient-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline font-semibold text-lg">Cost Breakdown</h3>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-semibold">2400 sq.ft · Chennai</span>
            </div>

            <div className="space-y-4">
              {costItems.map(({ icon, label, value, color, bar, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-base ${color}`}>{icon}</span>
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                    </div>
                    <span className={`text-sm font-bold ${color}`}>{value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div className={`h-1.5 rounded-full ${bar} transition-all duration-1000`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600">account_balance</span>
                <span className="font-headline font-bold text-lg">Total Estimate</span>
              </div>
              <span className="font-headline font-bold text-2xl text-indigo-600">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
