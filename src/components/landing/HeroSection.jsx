import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'
import heroBg from '../../assets/hero-bg.jpg'

export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <section
      className="relative min-h-screen flex items-center pt-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/20" />
      <div className="container mx-auto px-8 relative z-10 max-w-7xl">
        <div className="max-w-2xl">
          <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
            The Future of Construction in Tamil Nadu
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Build Your Legacy,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              Powered by AI.
            </span>
          </h1>
          <p className="text-lg text-slate-500 mb-4 leading-relaxed">
            Describe your dream home. Get an AI floor plan in seconds. Purchase materials at wholesale rates. Hire verified workers. Track every brick.
          </p>
          <p className="text-sm text-slate-400 mb-10">
            Voice → Blueprint → 3D → Cost → Build → Move In. All in one platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate(ROUTES.aiBuilder)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
            >
              Start Designing with AI
              <span className="material-symbols-outlined">auto_awesome</span>
            </button>
            <button
              onClick={() => navigate(ROUTES.marketplace)}
              className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all active:scale-95"
            >
              Explore Marketplace
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
            Free to design · No credit card required
          </p>
        </div>
      </div>
    </section>
  )
}
