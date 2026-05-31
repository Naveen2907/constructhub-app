import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import appData from '../../data/appData.json'
import { formatINR, formatDate } from '../../utils/helpers'

export default function ProjectTracker() {
  const navigate = useNavigate()
  const [activeProject, setActiveProject] = useState(appData.projects[0])
  const [photoModal, setPhotoModal] = useState(null)

  const overBudget = activeProject.spent_inr > activeProject.budget_inr
  const budgetDiff = Math.abs(activeProject.spent_inr - activeProject.budget_inr)

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="section-label mb-1">Site Intelligence Dashboard</p>
          <h1 className="text-4xl font-black font-headline text-gray-900 tracking-tight">
            {activeProject.phase} <span className="text-orange-500">Phase</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge status={activeProject.status} label="In Progress" />
            <span className="text-sm text-gray-500">Est. Completion: {formatDate(activeProject.est_end_date)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          {/* Project switcher */}
          <select value={activeProject.id} onChange={e => setActiveProject(appData.projects.find(p => p.id === e.target.value))}
            className="input-field w-auto text-sm">
            {appData.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">upload_file</span> Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span> Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Timeline — Left */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-ambient h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-headline text-gray-900">Construction Stages</h3>
            <span className="text-sm font-bold text-gray-500">{activeProject.completion_pct}% Overall</span>
          </div>
          <div className="relative space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {activeProject.stages.map(stage => (
              <div key={stage.id} className="relative pl-10">
                <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white ${
                  stage.status === 'completed' ? 'bg-green-500' :
                  stage.status === 'active'    ? 'bg-orange-500' :
                  'bg-gray-200'
                }`}>
                  {stage.status === 'completed'
                    ? <span className="material-symbols-outlined text-white text-sm">check</span>
                    : stage.status === 'active'
                    ? <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    : <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />}
                </div>
                <div className="flex justify-between items-start mb-1">
                  <p className={`font-semibold text-sm ${stage.status === 'upcoming' ? 'text-gray-400' : stage.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {stage.name}
                  </p>
                  <span className={`text-xs font-bold ${stage.status === 'completed' ? 'text-green-600' : stage.status === 'active' ? 'text-orange-600' : 'text-gray-400'}`}>
                    {stage.pct}%
                  </span>
                </div>
                {stage.status === 'active' && (
                  <>
                    <ProgressBar value={stage.pct} color="orange" height="h-1.5" />
                    {stage.checkpoint && <p className="text-xs text-orange-500 mt-1 font-medium">{stage.checkpoint}</p>}
                  </>
                )}
                {stage.completed_date && <p className="text-xs text-gray-400 mt-0.5">Completed {formatDate(stage.completed_date)}</p>}
                {stage.start_date && stage.status === 'upcoming' && <p className="text-xs text-gray-400 mt-0.5">Starts {formatDate(stage.start_date)}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Budget', value: formatINR(activeProject.budget_inr), icon: 'account_balance_wallet', color: 'indigo' },
              { label: overBudget ? '⚠ Over Budget' : 'Under Budget', value: formatINR(budgetDiff), icon: 'currency_rupee', color: overBudget ? 'red' : 'green' },
              { label: 'Completion', value: `${activeProject.completion_pct}%`, icon: 'donut_large', color: 'orange' },
              { label: 'Team Size', value: activeProject.team.length, icon: 'groups', color: 'yellow' },
            ].map(({ label, value, icon, color }) => {
              const colors = { indigo: 'bg-indigo-50 text-indigo-600', red: 'bg-red-50 text-red-600', green: 'bg-green-50 text-green-600', orange: 'bg-orange-50 text-orange-600', yellow: 'bg-yellow-50 text-yellow-600' }
              return (
                <div key={label} className="bg-white rounded-3xl p-5 shadow-ambient">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
                    <span className="material-symbols-outlined text-lg">{icon}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-xl font-black text-gray-900 font-headline">{value}</p>
                </div>
              )
            })}
          </div>

          {/* Financial + Team */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Financial Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-ambient">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-900 font-headline">Financial Overview</h4>
                {overBudget && <span className="text-xs font-bold text-red-500">12% Over Budget</span>}
              </div>
              <div className="flex items-end gap-3 h-32 mb-4">
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-xl relative" style={{ height: '80%' }}>
                    <div className="absolute bottom-0 w-full bg-indigo-200 rounded-t-xl" style={{ height: '60%' }} />
                  </div>
                  <span className="text-xs text-gray-400 font-bold">Budget</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-xl relative" style={{ height: '95%' }}>
                    <div className="absolute bottom-0 w-full bg-orange-500 rounded-t-xl" style={{ height: '85%' }} />
                  </div>
                  <span className="text-xs text-gray-400 font-bold">Actual</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50 rounded-2xl">
                  <p className="text-xs text-indigo-500 font-bold uppercase">Projected</p>
                  <p className="text-lg font-black text-indigo-700">{formatINR(activeProject.budget_inr)}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-2xl">
                  <p className="text-xs text-orange-500 font-bold uppercase">Actual Spent</p>
                  <p className="text-lg font-black text-orange-700">{formatINR(activeProject.spent_inr)}</p>
                </div>
              </div>
            </div>

            {/* Active Team */}
            <div className="bg-white rounded-3xl p-6 shadow-ambient">
              <h4 className="font-bold text-gray-900 font-headline mb-4">Active Site Team</h4>
              <div className="space-y-3">
                {activeProject.team.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">{member.name}</p>
                      <p className="text-xs text-orange-500 font-semibold">{member.role}</p>
                    </div>
                    <button className="p-2 hover:bg-white rounded-xl transition-colors">
                      <span className="material-symbols-outlined text-gray-400 text-sm">chat_bubble</span>
                    </button>
                  </div>
                ))}
                <button onClick={() => navigate('/workforce')} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-orange-400 hover:text-orange-500 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span> Add Workers
                </button>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-ambient">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold font-headline text-gray-900">Foundation Resources</h3>
              <div className="flex gap-2">
                <button onClick={() => navigate('/marketplace')} className="p-2 bg-gray-100 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition-colors">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
                <button onClick={() => navigate('/equipment')} className="p-2 bg-gray-100 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition-colors">
                  <span className="material-symbols-outlined text-sm">construction</span>
                </button>
              </div>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Required Materials</h4>
                <div className="space-y-2">
                  {[['texture','OPC Cement (50kg)','120/150 Bags','orange'],['grid_on','TMT Steel Rods (12mm)','In Transit','indigo']].map(([icon,name,status,color]) => (
                    <div key={name} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-${color}-500 text-sm`}>{icon}</span>
                        <span className="font-semibold text-sm text-gray-900">{name}</span>
                      </div>
                      <span className={`text-xs font-bold text-${color}-600`}>{status}</span>
                    </div>
                  ))}
                  <button onClick={() => navigate('/marketplace')} className="w-full text-center py-2 text-xs font-bold text-orange-500 hover:underline uppercase tracking-widest">
                    Visit Marketplace →
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Site Machinery</h4>
                <div className="space-y-2">
                  {[['nest_eco_leaf','Concrete Mixer','Operational','green'],['agriculture','Mini Excavator','Returned','gray']].map(([icon,name,status,color]) => (
                    <div key={name} className={`flex justify-between items-center p-3 bg-gray-50 rounded-2xl ${status === 'Returned' ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-${color}-500 text-sm`}>{icon}</span>
                        <span className="font-semibold text-sm text-gray-900">{name}</span>
                      </div>
                      <span className={`text-xs font-bold text-${color}-600`}>{status}</span>
                    </div>
                  ))}
                  <button onClick={() => navigate('/equipment')} className="w-full text-center py-2 text-xs font-bold text-orange-500 hover:underline uppercase tracking-widest">
                    Book Rentals →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Photos */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8 bg-white rounded-3xl p-6 shadow-ambient">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold font-headline text-gray-900">Stage Progress Photos</h3>
                <button className="text-xs text-orange-500 font-bold hover:underline uppercase tracking-widest">View All</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {activeProject.photos.map(photo => (
                  <div key={photo.id} onClick={() => setPhotoModal(photo)} className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-orange-500 transition-colors">add_a_photo</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 bg-orange-500 rounded-3xl p-6 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-xl font-black font-headline leading-tight mb-2">Next Step Readiness</h3>
                <p className="text-sm text-orange-100">Phase: Pillar Work starts in 3 days. Ensure all rebar is ordered.</p>
              </div>
              <button onClick={() => navigate('/marketplace')} className="bg-white text-orange-600 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
                Order Pillar Rebar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {photoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setPhotoModal(null)}>
          <div className="max-w-2xl w-full rounded-3xl overflow-hidden">
            <img src={photoModal.url} alt={photoModal.caption} className="w-full" />
            <div className="bg-white p-4">
              <p className="font-bold text-gray-900">{photoModal.caption}</p>
              <p className="text-sm text-gray-400">{formatDate(photoModal.date)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
