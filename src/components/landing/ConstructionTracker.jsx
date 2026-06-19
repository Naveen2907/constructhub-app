import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const milestones = [
  { icon: 'foundation', phase: 'Foundation', pct: 100, status: 'completed' },
  { icon: 'domain', phase: 'Brick Work', pct: 100, status: 'completed' },
  { icon: 'roofing', phase: 'Roofing', pct: 72, status: 'in-progress' },
  { icon: 'plumbing', phase: 'Plumbing', pct: 40, status: 'in-progress' },
  { icon: 'electrical_services', phase: 'Electrical', pct: 0, status: 'pending' },
  { icon: 'format_paint', phase: 'Painting', pct: 0, status: 'pending' },
  { icon: 'key', phase: 'Handover', pct: 0, status: 'pending' },
]

const statusStyle = {
  completed: 'bg-emerald-100 text-emerald-700',
  'in-progress': 'bg-indigo-100 text-indigo-700',
  pending: 'bg-slate-100 text-slate-500',
}

const barColor = {
  completed: 'bg-emerald-500',
  'in-progress': 'bg-indigo-500',
  pending: 'bg-slate-200',
}

export default function ConstructionTracker() {
  const navigate = useNavigate()
  const overall = Math.round(milestones.reduce((acc, m) => acc + m.pct, 0) / milestones.length)

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Site Management</span>
            <h2 className="font-headline text-4xl font-bold mt-2 mb-4">Real-Time Construction Monitoring</h2>
            <p className="text-slate-500 mb-6 text-lg leading-relaxed">
              Track every phase from foundation to handover. Get photo updates, milestone alerts and worker reports — all from your phone.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${overall}%` }} />
              </div>
              <span className="font-bold text-indigo-600 text-lg">{overall}%</span>
            </div>
            <p className="text-sm text-slate-500 mb-8">Overall construction progress · Villa, Anna Nagar, Chennai</p>
            <button
              onClick={() => navigate(ROUTES.projectTracker)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              View Full Tracker
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Milestone list */}
          <div className="space-y-3">
            {milestones.map(({ icon, phase, pct, status }) => (
              <div key={phase} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${status === 'completed' ? 'bg-emerald-100' : status === 'in-progress' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                  <span className={`material-symbols-outlined text-lg ${status === 'completed' ? 'text-emerald-600' : status === 'in-progress' ? 'text-indigo-600' : 'text-slate-400'}`}>{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm">{phase}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">{pct}%</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${statusStyle[status]}`}>
                        {status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full">
                    <div className={`h-1.5 rounded-full transition-all duration-700 ${barColor[status]}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
