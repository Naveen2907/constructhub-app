import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appData from '../../data/appData.json'

const ROOMS = [
  { id: 'kitchen',  label: 'Kitchen',       icon: 'kitchen' },
  { id: 'bedroom',  label: 'Master Bedroom', icon: 'king_bed' },
  { id: 'hall',     label: 'Living Hall',    icon: 'chair' },
  { id: 'bathroom', label: 'Bathroom',       icon: 'bathtub' },
  { id: 'garage',   label: 'Garage',         icon: 'garage' },
]

const SUGGESTIONS = [
  { icon: 'lightbulb', bg: 'bg-indigo-50 border-indigo-100', iconColor: 'text-indigo-600', text: 'Place fridge near kitchen wall for optimal plumbing accessibility.' },
  { icon: 'eco',       bg: 'bg-green-50 border-green-100',   iconColor: 'text-green-600',  text: 'Window placement for Bedroom maximizes 82% natural light efficiency.' },
  { icon: 'warning',   bg: 'bg-orange-50 border-orange-100', iconColor: 'text-orange-600', text: 'Bathroom conflicts with load-bearing wall. Adjust 2m east.' },
]

export default function AILayoutCanvas() {
  const navigate = useNavigate()
  const [activeRoom, setActiveRoom] = useState('kitchen')
  const [selectedAppliance, setSelectedAppliance] = useState(appData.appliance_library[1])
  const [view, setView] = useState('2D')
  const [placed, setPlaced] = useState([appData.appliance_library[0]])

  const handleConfirm = () => {
    if (selectedAppliance && !placed.find(p => p.id === selectedAppliance.id)) {
      setPlaced(prev => [...prev, selectedAppliance])
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/ai-builder')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-gray-500">arrow_back</span>
          </button>
          <span className="text-lg font-bold text-gray-900 font-headline">AI Home Builder</span>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">PRO</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined text-gray-500">mic</span></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined text-gray-500">notifications</span></button>
          <button onClick={() => navigate('/ai-builder/summary')} className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95">
            Render AI
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl flex flex-col flex-shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider">Voice Command</span>
                <div className="flex gap-0.5 items-end h-4">
                  {[2,4,3,5,2,4,3].map((h,i) => (
                    <div key={i} className="w-0.5 bg-indigo-500 rounded-full animate-pulse" style={{ height: `${h*3}px`, animationDelay: `${i*0.1}s` }} />
                  ))}
                </div>
              </div>
              <p className="text-indigo-900 font-medium text-xs italic">"Place a modern refrigerator in the kitchen island area..."</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Rooms</h3>
              <div className="space-y-1">
                {ROOMS.map(room => (
                  <button key={room.id} onClick={() => setActiveRoom(room.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-sm font-medium transition-all ${activeRoom === room.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <span className="material-symbols-outlined text-lg">{room.icon}</span>{room.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Appliance Library</h3>
              <div className="space-y-2">
                {appData.appliance_library.map(item => (
                  <button key={item.id} onClick={() => setSelectedAppliance(item)}
                    className={`w-full flex items-center gap-3 p-3 border rounded-2xl transition-all ${selectedAppliance?.id === item.id ? 'border-indigo-300 bg-indigo-50/60' : 'border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedAppliance?.id === item.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.model}</p>
                    </div>
                    {placed.find(p => p.id === item.id) && <span className="ml-auto w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-sm">add</span> Import Custom Model
            </button>
          </div>
        </aside>

        {/* Canvas */}
        <section className="flex-1 relative bg-slate-50 overflow-auto flex items-center justify-center p-12"
          style={{ backgroundImage: 'linear-gradient(to right, rgba(79,70,229,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,70,229,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="relative w-[700px] h-[520px] bg-white shadow-[0_32px_64px_-12px_rgba(79,70,229,0.12)] rounded border border-slate-200">
            <div className="absolute top-4 left-4 text-slate-300 pointer-events-none">
              <span className="material-symbols-outlined text-3xl">explore</span>
            </div>
            <div className="absolute top-3 left-12 right-12 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <div className="flex-1 h-px bg-slate-200" /><span>12,450 mm</span><div className="flex-1 h-px bg-slate-200" />
            </div>
            {/* Kitchen */}
            <div className="absolute top-10 left-10 w-72 h-[440px] border-4 border-slate-700 rounded-sm">
              <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Kitchen Area</div>
              <div className="absolute top-0 right-0 w-20 h-full bg-slate-50 border-l border-slate-300" />
              {placed.map((item, i) => (
                <div key={item.id} className="absolute border-2 border-indigo-500 bg-indigo-100/50 rounded flex items-center justify-center"
                  style={{ bottom: `${16 + i * 90}px`, left: '16px', width: '72px', height: '72px' }}>
                  <span className="material-symbols-outlined text-indigo-600">{item.icon}</span>
                </div>
              ))}
              <div className="absolute top-16 left-20 w-24 h-8 bg-indigo-500/20 border-2 border-dashed border-indigo-500 flex items-center justify-center animate-pulse">
                <span className="text-[8px] font-bold text-indigo-600 uppercase">AC Placeholder</span>
              </div>
            </div>
            {/* Bedroom */}
            <div className="absolute top-10 left-[310px] w-[360px] h-[280px] border-4 border-slate-700 border-l-0 rounded-sm">
              <div className="absolute top-2 left-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Master Bedroom</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-48 bg-slate-50 border border-slate-300 rounded-sm">
                <div className="w-full h-10 border-b border-slate-200" />
              </div>
            </div>
            {view === '3D' && (
              <div className="absolute inset-0 bg-indigo-900/90 flex items-center justify-center rounded">
                <div className="text-center text-white">
                  <span className="material-symbols-outlined text-5xl mb-3 block">view_in_ar</span>
                  <p className="font-bold text-lg">3D Render Preview</p>
                  <p className="text-indigo-300 text-sm mt-1">AI rendering in progress...</p>
                </div>
              </div>
            )}
          </div>
          {/* Toolbar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-3 py-2 rounded-2xl shadow-xl flex items-center gap-1 border border-white/50">
            <button onClick={() => setView(v => v === '2D' ? '3D' : '2D')}
              className="px-3 py-2 hover:bg-indigo-50 rounded-xl text-xs font-bold text-indigo-600 flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm">3d_rotation</span>{view}
            </button>
            {[['pan_tool','Pan'],['edit','Draw'],['architecture','Plan'],['zoom_in','Zoom'],['undo','Undo']].map(([icon,tip]) => (
              <button key={icon} title={tip} className="p-2.5 hover:bg-indigo-50 rounded-xl transition-colors text-gray-600 hover:text-indigo-600">
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-72 border-l border-slate-200/50 bg-white/80 backdrop-blur-xl flex flex-col flex-shrink-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-indigo-600">auto_awesome</span>
              <h3 className="font-bold text-gray-900 text-sm">Smart Suggestions</h3>
            </div>
            <div className="space-y-3">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className={`p-3 rounded-2xl border ${s.bg}`}>
                  <div className="flex gap-2">
                    <span className={`material-symbols-outlined text-sm mt-0.5 ${s.iconColor}`}>{s.icon}</span>
                    <p className="text-xs font-medium text-gray-700 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Item Details</h3>
              {selectedAppliance && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-bold">Selected</span>}
            </div>
            {selectedAppliance ? (
              <div className="space-y-4">
                <div className="w-full h-32 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-400 text-5xl">{selectedAppliance.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{selectedAppliance.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedAppliance.model}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400">Category</p><p className="text-sm font-semibold">{selectedAppliance.category}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400">Room</p><p className="text-sm font-semibold capitalize">{activeRoom}</p></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Placement Score</span><span className="font-bold text-indigo-600">92%</span></div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full w-[92%]" /></div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center mt-8">Select an appliance to see details</p>
            )}
          </div>
          <div className="p-5 border-t border-gray-100 space-y-2">
            <button onClick={handleConfirm} className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
              Confirm Placement
            </button>
            <button onClick={() => navigate('/ai-builder/summary')} className="w-full py-3 border border-indigo-200 text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all">
              View Summary →
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
