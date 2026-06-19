import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'
import blueprintImg from '../../assets/blueprint.jpg'

const views = [
  {
    key: 'exterior',
    label: 'Exterior',
    icon: 'holiday_village',
    bg: 'bg-gradient-to-br from-sky-400 via-blue-300 to-indigo-200',
    scene: (
      <div className="relative w-full h-full flex items-end justify-center pb-6 overflow-hidden">
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-blue-100" />
        {/* Sun */}
        <div className="absolute top-6 right-12 w-14 h-14 bg-yellow-300 rounded-full shadow-[0_0_40px_10px_rgba(253,224,71,0.5)]" />
        {/* Clouds */}
        <div className="absolute top-10 left-8 w-24 h-8 bg-white/70 rounded-full blur-sm" />
        <div className="absolute top-14 left-20 w-16 h-6 bg-white/60 rounded-full blur-sm" />
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-600 to-emerald-400" />
        {/* House body */}
        <div className="relative z-10 flex flex-col items-center mb-10">
          {/* Roof */}
          <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[60px] border-l-transparent border-r-transparent border-b-slate-700" />
          {/* Walls */}
          <div className="w-40 h-24 bg-amber-100 border-2 border-amber-200 relative flex items-end justify-center pb-0">
            {/* Door */}
            <div className="w-10 h-14 bg-amber-800 rounded-t-full border border-amber-900" />
            {/* Windows */}
            <div className="absolute top-3 left-4 w-10 h-8 bg-sky-300 border-2 border-amber-200 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-sky-200/60" /><div className="bg-sky-200/60" />
              <div className="bg-sky-200/60" /><div className="bg-sky-200/60" />
            </div>
            <div className="absolute top-3 right-4 w-10 h-8 bg-sky-300 border-2 border-amber-200 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-sky-200/60" /><div className="bg-sky-200/60" />
              <div className="bg-sky-200/60" /><div className="bg-sky-200/60" />
            </div>
          </div>
        </div>
        {/* Trees */}
        <div className="absolute bottom-14 left-8 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[28px] border-l-transparent border-r-transparent border-b-emerald-700" />
          <div className="w-3 h-5 bg-amber-800" />
        </div>
        <div className="absolute bottom-14 right-8 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[28px] border-l-transparent border-r-transparent border-b-emerald-700" />
          <div className="w-3 h-5 bg-amber-800" />
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur text-xs px-3 py-1.5 rounded-lg text-slate-700 font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-sky-500">wb_sunny</span> Day View
        </div>
      </div>
    ),
  },
  {
    key: 'interior',
    label: 'Interior',
    icon: 'living',
    scene: (
      <div className="relative w-full h-full overflow-hidden">
        {/* Room walls */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50" />
        {/* Back wall */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-stone-200 to-amber-100" />
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-amber-200 to-amber-100"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(180,140,80,0.15) 0px, rgba(180,140,80,0.15) 1px, transparent 1px, transparent 40px)' }}
        />
        {/* Window with light */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-20 bg-sky-200 border-4 border-stone-300 rounded-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-200" />
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
            {[...Array(4)].map((_, i) => <div key={i} className="bg-sky-200/40 rounded-sm" />)}
          </div>
          {/* Light rays */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-yellow-200/30 blur-md rounded-full" />
        </div>
        {/* Sofa */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="flex gap-1 mb-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-12 h-10 bg-indigo-400 rounded-t-lg border border-indigo-500" />
            ))}
          </div>
          <div className="w-38 h-3 bg-indigo-600 rounded-sm w-full" />
        </div>
        {/* Table */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-3 bg-amber-700 rounded-sm" />
        {/* Plant */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center">
          <div className="w-8 h-10 bg-emerald-500 rounded-full" />
          <div className="w-4 h-5 bg-amber-700 rounded-b-sm" />
        </div>
        {/* Lamp */}
        <div className="absolute bottom-16 left-8">
          <div className="w-8 h-1 bg-amber-700" />
          <div className="w-0.5 h-10 bg-amber-700 mx-auto" />
          <div className="w-6 h-4 bg-amber-200 mx-auto rounded-sm" />
          <div className="w-5 h-5 bg-amber-100/50 mx-auto rounded-full blur-sm -mt-2" />
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur text-xs px-3 py-1.5 rounded-lg text-slate-700 font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-amber-500">living</span> Living Room
        </div>
      </div>
    ),
  },
  {
    key: 'night',
    label: 'Night View',
    icon: 'nights_stay',
    scene: (
      <div className="relative w-full h-full overflow-hidden">
        {/* Night sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900" />
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{ top: `${Math.random() * 50}%`, left: `${Math.random() * 100}%` }} />
        ))}
        {/* Moon */}
        <div className="absolute top-5 right-10 w-10 h-10 bg-yellow-100 rounded-full shadow-[0_0_20px_5px_rgba(254,249,195,0.4)]" />
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-slate-800 to-slate-900" />
        {/* House body */}
        <div className="relative z-10 flex flex-col items-center absolute bottom-10 left-1/2 -translate-x-1/2">
          {/* Roof */}
          <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[55px] border-l-transparent border-r-transparent border-b-slate-800" />
          {/* Walls */}
          <div className="w-40 h-20 bg-slate-700 border border-slate-600 relative flex items-end justify-center">
            {/* Glowing windows */}
            <div className="absolute top-2 left-4 w-10 h-8 bg-amber-300/80 rounded-sm shadow-[0_0_12px_4px_rgba(251,191,36,0.4)]" />
            <div className="absolute top-2 right-4 w-10 h-8 bg-amber-300/80 rounded-sm shadow-[0_0_12px_4px_rgba(251,191,36,0.4)]" />
            {/* Door */}
            <div className="w-9 h-12 bg-amber-900/80 rounded-t-lg border border-slate-600 mb-0" />
          </div>
        </div>
        {/* Garden lights */}
        {[-40, 40].map((x, i) => (
          <div key={i} className="absolute bottom-12 w-2 h-8 bg-slate-600 rounded-sm"
            style={{ left: `calc(50% + ${x}px)` }}>
            <div className="w-4 h-4 bg-amber-300/60 rounded-full -mt-1 -ml-1 blur-sm shadow-[0_0_8px_4px_rgba(251,191,36,0.3)]" />
          </div>
        ))}
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur text-xs px-3 py-1.5 rounded-lg text-white font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-indigo-300">nights_stay</span> Night View
        </div>
      </div>
    ),
  },
]

export default function DemoSplitView() {
  const [activeTab, setActiveTab] = useState('2d')
  const [activeView, setActiveView] = useState('exterior')
  const navigate = useNavigate()

  const currentView = views.find(v => v.key === activeView)

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-label">Design Tools</span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-4">2D Blueprint. 3D Reality.</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Switch between precision floor plans and photorealistic 3D walkthroughs — built from the same design.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 rounded-xl p-1 flex gap-1">
            {['2d', '3d'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
              >
                {tab === '2d' ? '2D Blueprint' : '3D Walkthrough'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* 2D Panel */}
          <div className={`rounded-[32px] border-2 transition-all duration-300 overflow-hidden ${activeTab === '2d' ? 'border-indigo-500 shadow-2xl shadow-indigo-100' : 'border-slate-100'}`}>
            <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600">architecture</span>
                <span className="font-semibold text-sm text-slate-700">2D Floor Plan</span>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-semibold">Ground Floor</span>
            </div>
            <div className="relative overflow-hidden">
              <img src={blueprintImg} alt="2D Blueprint" className="w-full grayscale opacity-70 contrast-125" />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-xs px-3 py-1.5 rounded-lg border border-indigo-100 text-indigo-600 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">straighten</span> 2400 sq.ft
              </div>
            </div>
          </div>

          {/* 3D Panel */}
          <div className={`rounded-[32px] border-2 transition-all duration-300 overflow-hidden flex flex-col ${activeTab === '3d' ? 'border-indigo-500 shadow-2xl shadow-indigo-100' : 'border-slate-100'}`}>
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">view_in_ar</span>
                <span className="font-semibold text-sm text-white">3D Visualization</span>
              </div>
              <span className="text-xs bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                Real-time sync with 2D
              </span>
            </div>

            {/* View switcher tabs */}
            <div className="bg-slate-800 px-4 py-2 flex gap-2 flex-shrink-0">
              {views.map(v => (
                <button
                  key={v.key}
                  onClick={() => setActiveView(v.key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeView === v.key
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{v.icon}</span>
                  {v.label}
                </button>
              ))}
            </div>

            {/* Scene */}
            <div className="relative flex-1 min-h-64 transition-all duration-500">
              {currentView.scene}
            </div>

            {/* Info bar */}
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-indigo-400">{currentView.icon}</span>
                {currentView.label} · Villa, Anna Nagar
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Vastu Compliant
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button onClick={() => navigate(ROUTES.floorPlanner)} className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined">architecture</span> View 2D Plan
          </button>
          <button onClick={() => navigate(ROUTES.floorPlanner)} className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined">view_in_ar</span> View 3D Walkthrough
          </button>
          <button onClick={() => navigate(ROUTES.aiBuilder)} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined">edit</span> Edit Design
          </button>
        </div>
      </div>
    </section>
  )
}
