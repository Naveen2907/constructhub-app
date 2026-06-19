import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import blueprintImg from '../../assets/blueprint.jpg'

const CARDS = [
  {
    id: '2d',
    badge: '2D Blueprint Studio',
    heading: 'Design every wall with architectural precision.',
    sub: 'Professional-grade floor planning tools used by Tamil Nadu\'s top architects — now in your browser.',
    cta: 'Launch Blueprint Studio',
    route: '/ai-builder/canvas',
    img: blueprintImg,
    imgFilter: 'grayscale(0.3) contrast(1.1)',
    accent: 'from-indigo-500 to-violet-500',
    accentLight: 'from-indigo-50 to-violet-50',
    accentText: 'text-indigo-600',
    accentBg: 'bg-indigo-600',
    accentGlow: 'shadow-indigo-500/30',
    badgeBg: 'bg-indigo-50 text-indigo-700',
    icon: 'architecture',
    features: [
      'Room Planning',
      'Wall Design',
      'Door Placement',
      'Window Placement',
      'Measurement Tools',
      'Construction Dimensions',
      'Auto Area Calculation',
    ],
    animation: 'blueprint',
  },
  {
    id: '3d',
    badge: '3D Reality Walkthrough',
    heading: 'Walk inside your future home before construction begins.',
    sub: 'Photorealistic 3D rendering with day/night lighting, material previews and first-person walkthrough.',
    cta: 'Explore In 3D',
    route: '/ai-builder/3d',
    img: null,
    accent: 'from-emerald-500 to-teal-500',
    accentLight: 'from-emerald-50 to-teal-50',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-600',
    accentGlow: 'shadow-emerald-500/30',
    badgeBg: 'bg-emerald-50 text-emerald-700',
    icon: 'view_in_ar',
    features: [
      'First Person Walkthrough',
      'Day / Night Mode',
      'Furniture Preview',
      'Material Preview',
      'Virtual Tour',
      'Interior Design',
    ],
    animation: '3d',
  },
  {
    id: 'ai',
    badge: 'AI Dream Home Generator',
    heading: 'Describe your dream home and let AI create it instantly.',
    sub: 'Just speak or type your requirements — AI generates the floor plan, 3D model, cost estimate and BOM.',
    cta: 'Generate My House',
    route: '/ai-builder',
    img: null,
    accent: 'from-orange-500 to-rose-500',
    accentLight: 'from-orange-50 to-rose-50',
    accentText: 'text-orange-600',
    accentBg: 'bg-orange-500',
    accentGlow: 'shadow-orange-500/30',
    badgeBg: 'bg-orange-50 text-orange-700',
    icon: 'auto_awesome',
    features: [
      'Voice To Design',
      'AI House Generation',
      'AI Interior Themes',
      'AI Cost Estimation',
      'AI Material Suggestions',
      'AI Vastu Validation',
    ],
    animation: 'ai',
  },
]

/* ── Hover preview visuals ── */

function BlueprintPreview({ active }) {
  return (
    <div className={`absolute inset-0 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <img src={blueprintImg} alt="Blueprint" className="w-full h-full object-cover grayscale contrast-125 opacity-60" />
      {/* animated scan line */}
      <div className={`absolute left-0 right-0 h-0.5 bg-indigo-400/60 blur-sm transition-all duration-1000 ${active ? 'top-1/3' : 'top-0'}`}
        style={{ animation: active ? 'blueprintScan 2s ease-in-out infinite' : 'none' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
      {/* dimension lines */}
      <div className={`absolute top-4 left-4 right-4 flex items-center gap-2 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex-1 h-px bg-indigo-400/60" />
        <span className="text-indigo-300 text-xs font-mono">16.50 m</span>
        <div className="flex-1 h-px bg-indigo-400/60" />
      </div>
    </div>
  )
}

function ThreeDPreview({ active }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 via-indigo-900/60 to-slate-900" />
      {/* Rotating house silhouette */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${active ? 'scale-100' : 'scale-90'}`}>
        <div className="relative" style={{ animation: active ? 'slowRotate 8s linear infinite' : 'none' }}>
          {/* House body */}
          <div className="w-32 h-20 bg-amber-900/60 border border-amber-700/40 relative mx-auto">
            {/* Windows glow */}
            <div className="absolute top-3 left-3 w-8 h-6 bg-amber-300/60 shadow-[0_0_12px_4px_rgba(251,191,36,0.3)]" />
            <div className="absolute top-3 right-3 w-8 h-6 bg-amber-300/60 shadow-[0_0_12px_4px_rgba(251,191,36,0.3)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 bg-amber-800/80" />
          </div>
          {/* Roof */}
          <div className="w-0 h-0 mx-auto"
            style={{ borderLeft: '72px solid transparent', borderRight: '72px solid transparent', borderBottom: '48px solid rgba(120,80,40,0.7)', marginTop: '-48px', marginBottom: '48px' }} />
        </div>
      </div>
      {/* Floor grid */}
      <div className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'repeating-linear-gradient(90deg,rgba(99,102,241,0.1) 0 1px,transparent 1px 40px),repeating-linear-gradient(0deg,rgba(99,102,241,0.1) 0 1px,transparent 1px 40px)' }} />
      {/* Mode badges */}
      <div className={`absolute top-4 right-4 flex flex-col gap-1.5 transition-all duration-500 ${active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
        {['Day Mode', 'Night Mode', 'Orbit View'].map((b, i) => (
          <span key={b} className="text-xs bg-white/10 backdrop-blur text-white/80 px-2 py-0.5 rounded-full font-medium"
            style={{ animationDelay: `${i * 0.1}s` }}>
            {b}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
    </div>
  )
}

function AIPreview({ active }) {
  const lines = [
    '> Analyzing prompt...',
    '> Generating floor plan...',
    '> Applying Vastu rules...',
    '> Estimating costs...',
    '> Design complete ✓',
  ]
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-slate-950 to-indigo-950 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
      {/* Particle dots */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-orange-400/40"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            animation: active ? `pulse ${1 + Math.random()}s ease-in-out infinite` : 'none',
            animationDelay: `${Math.random() * 1}s` }} />
      ))}
      {/* Terminal window */}
      <div className={`absolute top-6 left-6 right-6 bg-black/60 backdrop-blur rounded-xl border border-orange-500/20 p-4 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs text-slate-400 font-mono">AI Design Engine</span>
        </div>
        {lines.map((line, i) => (
          <p key={line} className="text-xs font-mono text-emerald-400 leading-relaxed"
            style={{ opacity: active ? 1 : 0, transition: `opacity 0.3s ${i * 0.3}s` }}>
            {line}
          </p>
        ))}
      </div>
      {/* Floor plan outline */}
      <svg className={`absolute bottom-6 left-6 right-6 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
        viewBox="0 0 200 120" style={{ height: '100px' }}>
        <rect x="10" y="10" width="80" height="50" fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" strokeDasharray={active ? '0' : '200'} style={{ transition: 'stroke-dasharray 1.5s ease' }} />
        <rect x="90" y="10" width="100" height="50" fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" strokeDasharray={active ? '0' : '200'} style={{ transition: 'stroke-dasharray 1.5s 0.2s ease' }} />
        <rect x="10" y="60" width="60" height="50" fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" strokeDasharray={active ? '0' : '200'} style={{ transition: 'stroke-dasharray 1.5s 0.4s ease' }} />
        <rect x="70" y="60" width="120" height="50" fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" strokeDasharray={active ? '0' : '200'} style={{ transition: 'stroke-dasharray 1.5s 0.6s ease' }} />
        {/* Labels */}
        {active && <>
          <text x="30" y="40" fill="rgba(251,146,60,0.8)" fontSize="8" fontFamily="monospace">Living</text>
          <text x="125" y="40" fill="rgba(251,146,60,0.8)" fontSize="8" fontFamily="monospace">Master Bed</text>
          <text x="20" y="88" fill="rgba(251,146,60,0.8)" fontSize="8" fontFamily="monospace">Kitchen</text>
          <text x="105" y="88" fill="rgba(251,146,60,0.8)" fontSize="8" fontFamily="monospace">Bedroom 2</text>
        </>}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
    </div>
  )
}

/* ── Card component ── */

function ShowcaseCard({ card, index }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className={`relative group rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500
        ${hovered ? 'scale-[1.02] shadow-2xl ' + card.accentGlow : 'scale-100 shadow-xl'}
        bg-white border border-slate-100`}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #0f0f1a, #1a1a2e)'
          : 'white',
        transitionDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient border glow on hover */}
      <div className={`absolute inset-0 rounded-[32px] transition-opacity duration-500 pointer-events-none z-10
        ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: `linear-gradient(135deg, ${card.accent.includes('indigo') ? 'rgba(99,102,241,0.3)' : card.accent.includes('emerald') ? 'rgba(16,185,129,0.3)' : 'rgba(249,115,22,0.3)'}, transparent)`, borderRadius: 32 }} />

      {/* Visual area */}
      <div className="relative h-64 overflow-hidden rounded-t-[32px] bg-slate-900">
        {/* Default image/bg */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
          {card.img
            ? <img src={card.img} alt={card.badge} className="w-full h-full object-cover" style={{ filter: card.imgFilter }} />
            : <div className={`w-full h-full bg-gradient-to-br ${card.accentLight} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-8xl ${card.accentText} opacity-20`}>{card.icon}</span>
              </div>
          }
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        </div>

        {/* Hover animation */}
        {card.animation === 'blueprint' && <BlueprintPreview active={hovered} />}
        {card.animation === '3d' && <ThreeDPreview active={hovered} />}
        {card.animation === 'ai' && <AIPreview active={hovered} />}

        {/* Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20
            ${hovered ? 'bg-white/15 text-white' : card.badgeBg}`}>
            {card.badge}
          </span>
        </div>

        {/* Index number */}
        <div className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
          ${hovered ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
          ${hovered ? `bg-gradient-to-br ${card.accent} shadow-lg ${card.accentGlow}` : `bg-gradient-to-br ${card.accentLight}`}`}>
          <span className={`material-symbols-outlined text-xl ${hovered ? 'text-white' : card.accentText}`}>{card.icon}</span>
        </div>

        <h3 className={`font-headline text-xl font-bold mb-2 transition-colors duration-300 ${hovered ? 'text-white' : 'text-slate-900'}`}>
          {card.heading}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${hovered ? 'text-slate-400' : 'text-slate-500'}`}>
          {card.sub}
        </p>

        {/* Feature list */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-7">
          {card.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-sm flex-shrink-0 transition-colors duration-300
                ${hovered ? 'text-emerald-400' : card.accentText}`}>check_circle</span>
              <span className={`text-xs font-medium transition-colors duration-300 ${hovered ? 'text-slate-300' : 'text-slate-600'}`}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate(card.route)}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95
            ${hovered
              ? `bg-gradient-to-r ${card.accent} text-white shadow-lg ${card.accentGlow}`
              : `bg-slate-50 border border-slate-200 ${card.accentText} hover:bg-slate-100`}`}
        >
          <span className="material-symbols-outlined text-base">{card.icon}</span>
          {card.cta}
          <span className={`material-symbols-outlined text-base transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`}>arrow_forward</span>
        </button>
      </div>
    </div>
  )
}

/* ── Main Section ── */

export default function DesignExperienceShowcase() {
  const navigate = useNavigate()

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">AI-Powered Design Platform</span>
          </div>
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Design Beyond{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-orange-400">
              Blueprints
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Create, visualize, and experience your dream home before construction begins.
          </p>

          {/* Flow hint */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {['2D Blueprint', '3D Reality', 'Cost Estimate', 'Marketplace', 'Build'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white/60 bg-white/8 px-3 py-1 rounded-full border border-white/10">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="material-symbols-outlined text-white/30 text-sm">arrow_forward</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card, i) => (
            <ShowcaseCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm mb-4">Not sure where to start?</p>
          <button
            onClick={() => navigate('/ai-builder')}
            className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-indigo-600">auto_awesome</span>
            Let AI Design Your Home
            <span className="material-symbols-outlined text-indigo-600">arrow_forward</span>
          </button>
          <p className="text-slate-600 text-xs mt-3">Free · No credit card required · Tamil Nadu rates loaded</p>
        </div>
      </div>

      {/* Keyframe styles injected */}
      <style>{`
        @keyframes blueprintScan {
          0%, 100% { top: 20%; }
          50% { top: 70%; }
        }
        @keyframes slowRotate {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
      `}</style>
    </section>
  )
}
