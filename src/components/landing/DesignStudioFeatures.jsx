import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

const features = [
  { icon: 'meeting_room', label: 'Create Rooms' },
  { icon: 'open_with', label: 'Move Walls' },
  { icon: 'aspect_ratio', label: 'Resize Rooms' },
  { icon: 'door_front', label: 'Add Doors' },
  { icon: 'window', label: 'Add Windows' },
  { icon: 'stairs', label: 'Add Staircase' },
  { icon: 'balcony', label: 'Add Balcony' },
  { icon: 'yard', label: 'Add Garden' },
  { icon: 'local_parking', label: 'Add Parking' },
  { icon: 'solar_power', label: 'Add Solar Panels' },
  { icon: 'pool', label: 'Add Swimming Pool' },
  { icon: 'chair', label: 'Add Furniture' },
  { icon: 'kitchen', label: 'Add Appliances' },
]

export default function DesignStudioFeatures() {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Design Studio</span>
            <h2 className="font-headline text-4xl font-bold mt-2 mb-4">Design Every Corner of Your Home</h2>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">
              A fully interactive canvas — no CAD skills required. Drag, drop, and customize every element of your home.
            </p>
            <button
              onClick={() => navigate(ROUTES.floorPlanner)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              Open Design Studio
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {features.map(({ icon, label }) => (
              <div
                key={label}
                onClick={() => navigate(ROUTES.floorPlanner)}
                className="glass-card rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:-translate-y-1 transition-transform cursor-pointer group border border-white shadow-ambient"
              >
                <div className="w-10 h-10 bg-indigo-50 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-indigo-600 group-hover:text-white text-lg transition-colors">{icon}</span>
                </div>
                <span className="text-xs font-semibold text-slate-600 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
