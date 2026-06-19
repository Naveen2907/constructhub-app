import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const steps = [
  {
    icon: 'settings_voice',
    title: 'Describe Your Dream House',
    desc: 'Speak or type your requirements — rooms, style, budget, vastu preferences, and location.',
    cta: 'Start Here',
    route: ROUTES.aiBuilder,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: 'architecture',
    title: 'Generate AI Floor Plan',
    desc: 'Instant 2D blueprint with room layout, optimized dimensions and traffic flow.',
    cta: 'See Example',
    route: ROUTES.floorPlanner,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: 'view_in_ar',
    title: 'View House in 3D',
    desc: 'Walk through a photorealistic render of your home before a single brick is laid.',
    cta: 'Explore 3D',
    route: ROUTES.floorPlanner,
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: 'calculate',
    title: 'Estimate Total Cost',
    desc: 'Live cost breakdown — materials, labor, equipment and GST by Tamil Nadu district.',
    cta: 'Get Estimate',
    route: ROUTES.costEstimation,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: 'local_shipping',
    title: 'Purchase Materials',
    desc: 'One-click bulk orders from verified TN suppliers at wholesale rates with logistics.',
    cta: 'Browse Market',
    route: ROUTES.marketplace,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: 'timeline',
    title: 'Track Construction',
    desc: 'Real-time milestone tracking from foundation to handover with photo updates.',
    cta: 'View Tracker',
    route: ROUTES.projectTracker,
    color: 'bg-rose-50 text-rose-600',
  },
]

export default function HowItWorksSection() {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-16">
          <span className="section-label">The Process</span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-4">How ConstructHub Works</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From a spoken word to a finished key — a seamless construction lifecycle in 6 steps.
          </p>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.title} className="flex-1 relative group">
              {/* connector */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-px bg-slate-200 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${step.color}`}>
                  <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-4 -mt-2 z-10">
                  {i + 1}
                </div>
                <h4 className="font-headline font-semibold text-base mb-2">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                <button
                  onClick={() => navigate(step.route)}
                  className="text-indigo-600 text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  {step.cta}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}>
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-2 min-h-[32px]" />}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Step {i + 1}</span>
                  <h4 className="font-headline font-semibold">{step.title}</h4>
                </div>
                <p className="text-slate-500 text-sm">{step.desc}</p>
                <button onClick={() => navigate(step.route)} className="text-indigo-600 text-xs font-bold mt-2 hover:underline flex items-center gap-1">
                  {step.cta} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
