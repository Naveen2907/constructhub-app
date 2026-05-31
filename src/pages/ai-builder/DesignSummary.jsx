import { useNavigate } from 'react-router-dom'
import { formatINR } from '../../utils/helpers'

const APPLIANCES = [
  { name: 'Sub-Zero Pro 48', category: 'Refrigeration', icon: 'kitchen', price: 135000 },
  { name: 'Wolf Gas Range 60"', category: 'Kitchen Essentials', icon: 'cooking', price: 175000 },
  { name: 'Miele W1 Series', category: 'Laundry Room', icon: 'local_laundry_service', price: 85000 },
  { name: 'Split AC 1.5T x3', category: 'Cooling', icon: 'ac_unit', price: 105000 },
]

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300', label: 'Living Room' },
  { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', label: 'Kitchen' },
  { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300', label: 'Bedroom' },
]

export default function DesignSummary() {
  const navigate = useNavigate()
  const applianceTotal = APPLIANCES.reduce((s, a) => s + a.price, 0)
  const baseConstruction = 7000000
  const luxeFinishes = 1045000
  const grandTotal = baseConstruction + luxeFinishes + applianceTotal

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <span className="text-lg font-black text-indigo-600 font-headline">Luxe Design</span>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Premium Plan</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[['architecture','Projects'],['chair_alt','Rooms'],['king_bed','Furniture'],['texture','Materials'],['auto_awesome','AI Insights'],['history','History']].map(([icon,label]) => (
            <button key={label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all hover:translate-x-1 ${label === 'AI Insights' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>
              <span className="material-symbols-outlined text-lg">{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button className="w-full py-3 bg-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95">
            <span className="material-symbols-outlined text-sm">mic</span> Voice Command
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/ai-builder/canvas')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <span className="material-symbols-outlined text-gray-500">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-gray-900 font-headline">AI Home Builder</h1>
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex gap-6">
              {['Overview','Final Review','Collaboration'].map(t => (
                <a key={t} className={`text-sm font-semibold pb-1 transition-colors ${t === 'Final Review' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`} href="#">{t}</a>
              ))}
            </nav>
            <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined text-gray-500">mic</span></button>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95">Render AI</button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: 3D Render */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/20 h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900"
                  alt="3D Render"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* HUD */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">AI Confidence</p>
                        <p className="font-bold text-indigo-900">98.4% Aesthetic Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-black/50 backdrop-blur-lg rounded-full flex p-1 items-center">
                      <button className="px-3 py-1 text-[10px] font-bold rounded-full bg-white text-black">2D</button>
                      <button className="px-3 py-1 text-[10px] font-bold rounded-full text-white/70 hover:text-white">3D</button>
                    </div>
                    <button className="bg-black/50 backdrop-blur-lg text-white p-3 rounded-full hover:bg-black/70 transition-all">
                      <span className="material-symbols-outlined">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {GALLERY.map((g, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden aspect-square ${i === 0 ? 'border-2 border-indigo-500' : 'border border-gray-200 opacity-60 hover:opacity-100 transition-opacity'}`}>
                    <img src={g.url} alt={g.label} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-1 border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer aspect-square">
                  <span className="material-symbols-outlined">add</span>
                  <span className="text-[10px] font-bold">VIEW ALL</span>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5 space-y-6">
              {/* Project Overview */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-xl shadow-indigo-500/5">
                <h2 className="font-bold text-gray-900 font-headline mb-5">Project Overview</h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[['Total Rooms','12'],['Total Sq.ft','4,250'],['Levels','2.5']].map(([l,v]) => (
                    <div key={l} className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{l}</p>
                      <p className="text-2xl font-black text-indigo-700">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900 text-sm">Appliance List</h3>
                  <button className="text-indigo-600 text-xs font-bold hover:underline">Edit List</button>
                </div>
                <div className="space-y-2 max-h-44 overflow-y-auto custom-scrollbar">
                  {APPLIANCES.map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400 text-lg">{a.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                          <p className="text-[10px] text-gray-400">{a.category}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{formatINR(a.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h2 className="font-bold font-headline mb-5">Estimated Cost (INR)</h2>
                  <div className="space-y-3 mb-6">
                    {[['Base Construction', baseConstruction],['Luxury Finishes & AI', luxeFinishes],['Appliance Package', applianceTotal]].map(([l,v]) => (
                      <div key={l} className="flex justify-between text-sm">
                        <span className="text-gray-400">{l}</span>
                        <span className="text-white font-semibold">{formatINR(v)}</span>
                      </div>
                    ))}
                    <div className="h-px bg-gray-800 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Estimated Total</span>
                      <span className="text-2xl font-black text-indigo-400">{formatINR(grandTotal)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95">
                      <span className="material-symbols-outlined text-sm">save</span> Save Project
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95">
                      <span className="material-symbols-outlined text-sm">file_download</span> Export PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-amber-50/50 border border-amber-200/50 p-5 rounded-3xl">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <span className="material-symbols-outlined">gavel</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1">Next Steps: Procurement</h4>
                    <p className="text-sm text-amber-800/70 leading-relaxed mb-3">Your AI design is complete. Proceed to the marketplace to order materials based on your BOM.</p>
                    <button onClick={() => navigate('/marketplace')} className="flex items-center gap-2 text-sm font-bold text-amber-900 hover:gap-3 transition-all">
                      Go to Marketplace <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
