import { useVisualizerStore } from '../../../store/visualizerStore'

const VIEW_MODES = [
  { key: 'orbit',      icon: '360',           label: 'Orbit' },
  { key: 'fpv',        icon: 'person',         label: 'Walk' },
  { key: 'child',      icon: 'child_care',     label: 'Child' },
  { key: 'wheelchair', icon: 'accessible',     label: 'Access' },
  { key: 'drone',      icon: 'flight',         label: 'Drone' },
]

const LIGHTING = [
  { key: 'day',     icon: 'wb_sunny',      label: 'Day',     color: 'text-yellow-500' },
  { key: 'night',   icon: 'nights_stay',   label: 'Night',   color: 'text-indigo-400' },
  { key: 'sunrise', icon: 'wb_twilight',   label: 'Sunrise', color: 'text-orange-400' },
  { key: 'sunset',  icon: 'wb_twilight',   label: 'Sunset',  color: 'text-red-400' },
  { key: 'rain',    icon: 'rainy',         label: 'Rain',    color: 'text-blue-400' },
  { key: 'cloudy',  icon: 'cloud',         label: 'Cloudy',  color: 'text-slate-400' },
]

const DESIGN_PRESETS = [
  { key: 'budget',  label: 'Budget',        color: 'bg-slate-100 text-slate-700' },
  { key: 'premium', label: 'Premium',       color: 'bg-indigo-100 text-indigo-700' },
  { key: 'luxury',  label: 'Luxury',        color: 'bg-amber-100 text-amber-700' },
  { key: 'ultra',   label: 'Ultra Luxury',  color: 'bg-rose-100 text-rose-700' },
]

const MODE_HUD = {
  child:      { icon: 'child_care',  color: 'bg-amber-500', text: 'Child View · Height 3.5 ft · Safety analysis active' },
  wheelchair: { icon: 'accessible', color: 'bg-blue-500',   text: 'Accessibility View · Height 4 ft · Path analysis active' },
  fpv:        { icon: 'person',     color: 'bg-indigo-500', text: 'First Person · WASD to move · Click doors to open' },
  drone:      { icon: 'flight',     color: 'bg-emerald-500',text: 'Drone View · WASD to fly · Space/Shift for altitude' },
  orbit:      null,
}

export default function ViewModeToolbar() {
  const { viewMode, lightingPreset, designPreset, showRoof, showFurniture, showExterior,
    setViewMode, setLightingPreset, setDesignPreset, toggleRoof, toggleFurniture, toggleExterior,
  } = useVisualizerStore()

  const hud = MODE_HUD[viewMode]

  return (
    <>
      {/* Left — View Modes */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {VIEW_MODES.map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setViewMode(key)}
            title={label}
            className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all shadow-lg ${
              viewMode === key
                ? 'bg-indigo-600 text-white shadow-indigo-200 scale-110'
                : 'bg-white/90 backdrop-blur text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{icon}</span>
            <span className="text-[9px] font-bold leading-none">{label}</span>
          </button>
        ))}
      </div>

      {/* Top — Lighting Presets */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-white/90 backdrop-blur rounded-2xl p-1.5 shadow-lg">
        {LIGHTING.map(({ key, icon, label, color }) => (
          <button
            key={key}
            onClick={() => setLightingPreset(key)}
            title={label}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-all ${
              lightingPreset === key
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`material-symbols-outlined text-sm ${lightingPreset === key ? 'text-white' : color}`}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Right — Design Presets + Scene Toggles */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {/* Design presets */}
        <div className="bg-white/90 backdrop-blur rounded-2xl p-2 shadow-lg flex flex-col gap-1.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 text-center px-1">Design</p>
          {DESIGN_PRESETS.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setDesignPreset(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                designPreset === key ? color + ' ring-2 ring-offset-1 ring-indigo-400' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Scene toggles */}
        <div className="bg-white/90 backdrop-blur rounded-2xl p-2 shadow-lg flex flex-col gap-1.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 text-center px-1">Scene</p>
          {[
            { label: 'Roof',      icon: 'roofing',           active: showRoof,      toggle: toggleRoof },
            { label: 'Furniture', icon: 'chair',             active: showFurniture, toggle: toggleFurniture },
            { label: 'Exterior',  icon: 'holiday_village',   active: showExterior,  toggle: toggleExterior },
          ].map(({ label, icon, active, toggle }) => (
            <button key={label} onClick={toggle}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs font-semibold transition-all ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-400'}`}
            >
              <span className="material-symbols-outlined text-sm">{icon}</span>{label}
              <span className={`ml-auto w-7 h-4 rounded-full transition-colors ${active ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                <span className={`block w-3 h-3 rounded-full bg-white shadow mt-0.5 transition-transform ${active ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom — Mode HUD */}
      {hud && (
        <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-3 rounded-2xl text-white text-sm font-semibold shadow-xl ${hud.color}`}>
          <span className="material-symbols-outlined">{hud.icon}</span>
          {hud.text}
        </div>
      )}

      {/* Bottom — Controls hint */}
      {viewMode !== 'orbit' && (
        <div className="absolute bottom-6 right-4 z-20 bg-black/60 backdrop-blur text-white/80 text-xs rounded-xl px-3 py-2">
          <div className="grid grid-cols-3 gap-1 text-center mb-1">
            <div />
            <kbd className="bg-white/20 rounded px-1.5 py-0.5">W</kbd>
            <div />
            <kbd className="bg-white/20 rounded px-1.5 py-0.5">A</kbd>
            <kbd className="bg-white/20 rounded px-1.5 py-0.5">S</kbd>
            <kbd className="bg-white/20 rounded px-1.5 py-0.5">D</kbd>
          </div>
          <p className="text-center opacity-60">Move · Mouse to look</p>
        </div>
      )}
    </>
  )
}
