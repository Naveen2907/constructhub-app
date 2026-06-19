import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'
import blueprintImg from '../../assets/blueprint.jpg'

const features = [
  ['settings_voice', 'Voice Design'],
  ['architecture', '2D Blueprint Generator'],
  ['view_in_ar', '3D House Generator'],
  ['open_with', 'Drag & Drop Room Designer'],
  ['style', 'Interior Design Studio'],
  ['holiday_village', 'Exterior Design Studio'],
  ['compass_calibration', 'Vastu Validation'],
  ['calculate', 'Cost Estimation'],
  ['receipt_long', 'Bill of Materials'],
  ['calendar_month', 'Construction Timeline'],
]

export default function AIBuilderShowcase() {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-950 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="section-label text-indigo-400">AI-Powered Design</span>
            <h2 className="font-headline text-4xl font-bold mt-2 mb-4">
              Everything you need to build your perfect home
            </h2>
            <p className="text-slate-400 mb-10 text-lg">One AI engine. Zero guesswork.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-indigo-400 text-base">{icon}</span>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(ROUTES.aiBuilder)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-900"
            >
              Try AI Builder
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Right — mockup card */}
          <div className="relative">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-6">
              {/* window chrome */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-2 bg-indigo-600/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm animate-pulse">record_voice_over</span>
                  Voice Command Active
                </div>
              </div>
              {/* blueprint image */}
              <div className="rounded-2xl overflow-hidden relative">
                <img src={blueprintImg} alt="AI Blueprint" className="w-full rounded-2xl grayscale opacity-60 contrast-125" />
                <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Vastu Compliant
                </div>
              </div>
              {/* voice input */}
              <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-sm italic">
                  "Show me a 3-bedroom villa with a central courtyard and modern Tamil traditional roof elements..."
                </p>
              </div>
              {/* feature pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['3 Bedrooms', 'Vastu OK', '2400 sq.ft', 'Ground + 1'].map(tag => (
                  <span key={tag} className="bg-indigo-600/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
