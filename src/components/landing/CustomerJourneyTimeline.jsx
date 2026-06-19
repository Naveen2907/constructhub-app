import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const journey = [
  { icon: 'home', label: 'Landing Page', sub: 'Your starting point', route: ROUTES.landing },
  { icon: 'dashboard', label: 'Dashboard', sub: 'Project command center', route: ROUTES.dashboard },
  { icon: 'auto_awesome', label: 'AI Home Builder', sub: 'Voice to blueprint in seconds', route: ROUTES.aiBuilder },
  { icon: 'architecture', label: '2D Floor Planner', sub: 'Precision room-by-room layout', route: ROUTES.floorPlanner },
  { icon: 'view_in_ar', label: '3D Walkthrough', sub: 'Photorealistic preview', route: ROUTES.floorPlanner },
  { icon: 'calculate', label: 'Cost Estimation', sub: 'District-accurate pricing', route: ROUTES.costEstimation },
  { icon: 'storefront', label: 'Marketplace', sub: 'Materials & equipment', route: ROUTES.marketplace },
  { icon: 'engineering', label: 'Worker Hiring', sub: 'Verified skilled workforce', route: ROUTES.workforce },
  { icon: 'timeline', label: 'Project Tracker', sub: 'Real-time site monitoring', route: ROUTES.projectTracker },
  { icon: 'stars', label: 'Luxe Home', sub: 'Smart home management', route: ROUTES.smartHome },
]

export default function CustomerJourneyTimeline() {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-16">
          <span className="section-label">End-to-End</span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-4">Your Complete Construction Journey</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Every step connected. One platform from your first idea to a smart home.
          </p>
        </div>

        {/* Desktop horizontal scroll timeline */}
        <div className="hidden md:flex items-start gap-0 overflow-x-auto pb-4">
          {journey.map((node, i) => (
            <div key={node.label} className="flex-shrink-0 flex flex-col items-center text-center w-28 group cursor-pointer" onClick={() => navigate(node.route)}>
              {/* node + connector */}
              <div className="flex items-center w-full relative mb-4">
                {i > 0 && <div className="flex-1 h-px bg-indigo-200" />}
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-indigo-200 group-hover:border-indigo-600 group-hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-indigo-400 group-hover:text-white text-xl transition-colors">{node.icon}</span>
                </div>
                {i < journey.length - 1 && <div className="flex-1 h-px bg-indigo-200" />}
              </div>
              <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors leading-tight">{node.label}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-tight">{node.sub}</p>
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-0">
          {journey.map((node, i) => (
            <div key={node.label} className="flex gap-4 cursor-pointer group" onClick={() => navigate(node.route)}>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-indigo-200 group-hover:border-indigo-600 group-hover:bg-indigo-600 flex items-center justify-center transition-all flex-shrink-0">
                  <span className="material-symbols-outlined text-indigo-400 group-hover:text-white text-lg transition-colors">{node.icon}</span>
                </div>
                {i < journey.length - 1 && <div className="w-px flex-1 bg-indigo-200 min-h-[24px] my-1" />}
              </div>
              <div className="pb-5 pt-1">
                <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{node.label}</p>
                <p className="text-xs text-slate-400">{node.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
