import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import SearchBar from '../../components/ui/SearchBar'
import Modal from '../../components/ui/Modal'
import appData from '../../data/appData.json'
import { formatINR } from '../../utils/helpers'

const SKILLS = ['All', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Bar Bender']
const LEVELS = ['All', 'Expert', 'Skilled', 'Trainee']
const DISTRICTS = appData.tn_districts.slice(0, 6)

export default function WorkforceHiring() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [skill, setSkill] = useState('All')
  const [level, setLevel] = useState('All')
  const [district, setDistrict] = useState('Chennai')
  const [bookModal, setBookModal] = useState(null)
  const [booked, setBooked] = useState({})

  const filtered = appData.workers.filter(w => {
    const matchSkill = skill === 'All' || w.skill === skill
    const matchLevel = level === 'All' || w.skill_level === level
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.skill.toLowerCase().includes(search.toLowerCase())
    return matchSkill && matchLevel && matchSearch
  })

  const handleBook = (worker) => {
    setBooked(prev => ({ ...prev, [worker.id]: true }))
    setBookModal(null)
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  const levelColor = { Expert: 'bg-orange-100 text-orange-700', Skilled: 'bg-yellow-100 text-yellow-700', Trainee: 'bg-gray-100 text-gray-600' }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-1">Workforce Management</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black font-headline text-gray-900 tracking-tight">Find Skilled <span className="text-orange-500">Workforce.</span></h1>
            <p className="text-gray-500 mt-1">Verified daily wage experts across Tamil Nadu · Transparent pricing · Instant booking</p>
          </div>
          <SearchBar value={search} onChange={setSearch} placeholder="Search workers or skills..." />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-5 shadow-ambient">
            {/* Skill Filter */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Workforce Type</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {SKILLS.map(s => (
                <button key={s} onClick={() => setSkill(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${skill === s ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{s}</button>
              ))}
            </div>

            {/* Level Filter */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Expertise Level</h3>
            <div className="space-y-2 mb-5">
              {LEVELS.map(l => (
                <label key={l} className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${level === l ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}
                    onClick={() => setLevel(l)}>
                    {level === l && <span className="material-symbols-outlined text-white text-xs">check</span>}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{l}</span>
                </label>
              ))}
            </div>

            {/* Wage toggle */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Wage Structure</h3>
            <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-full mb-5">
              <button className="py-2 rounded-full bg-orange-500 text-white text-xs font-bold">Full Day</button>
              <button className="py-2 rounded-full text-gray-500 text-xs font-bold hover:text-gray-700 transition-colors">Half Day</button>
            </div>

            {/* Distance */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Distance (km)</h3>
            <div className="relative h-2 bg-gray-200 rounded-full mb-2">
              <div className="absolute inset-y-0 left-0 w-3/4 bg-orange-500 rounded-full" />
              <div className="absolute -top-1.5 left-3/4 w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-lg" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400"><span>0 KM</span><span className="text-gray-700">15 KM</span><span>50+ KM</span></div>
          </div>

          {/* Group Booking CTA */}
          <div className="bg-gray-900 rounded-3xl p-5 relative overflow-hidden">
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-white opacity-5 select-none">groups</span>
            <span className="badge badge-orange mb-3">Team Connect</span>
            <h4 className="text-lg font-bold text-white mb-2 leading-tight">Need a Full Construction Team?</h4>
            <p className="text-xs text-gray-400 mb-4">Pre-vetted groups for foundation, roofing, or electrical phases.</p>
            <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-full text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
              Explore Teams
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* District Selector */}
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {DISTRICTS.map(d => (
              <button key={d} onClick={() => setDistrict(d)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-3xl border-2 transition-all ${district === d ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <span className={`material-symbols-outlined text-sm ${district === d ? 'text-orange-500' : 'text-gray-400'}`}>location_on</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${district === d ? 'text-orange-600' : 'text-gray-500'}`}>{d}</span>
              </button>
            ))}
          </div>

          {/* Worker Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(worker => (
              <div key={worker.id} className="bg-white rounded-3xl p-5 shadow-ambient hover:shadow-ambient-lg transition-all duration-300 flex flex-col group">
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:rotate-3 transition-transform">
                      <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
                    </div>
                    <span className={`absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase shadow-lg ${levelColor[worker.skill_level]}`}>
                      {worker.skill_level}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 justify-end mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(worker.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                          style={{ fontVariationSettings: i < Math.floor(worker.rating) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{worker.total_ratings} Ratings</span>
                  </div>
                </div>

                <div className="mb-5 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 font-headline mb-0.5">{worker.name}</h3>
                  <p className="text-sm text-orange-500 font-semibold mb-3">{worker.skill} · {worker.experience_years} Yrs Exp.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {worker.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Daily Wage</p>
                    <p className="text-2xl font-black text-gray-900">{formatINR(worker.daily_wage_inr)}<span className="text-sm font-normal text-gray-400">/day</span></p>
                  </div>
                  <button
                    onClick={() => worker.is_available ? setBookModal(worker) : null}
                    disabled={!worker.is_available}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 ${
                      booked[worker.id] ? 'bg-green-500 text-white' :
                      worker.is_available ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200' :
                      'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}>
                    {booked[worker.id] ? 'Booked ✓' : worker.is_available ? 'Instant Book' : 'Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Group Booking Section */}
          <div className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="badge badge-orange mb-4">Enterprise Solutions</span>
                <h2 className="text-3xl font-black text-white font-headline mb-4 leading-tight">Scale Your Project with <span className="text-orange-400">Group Booking.</span></h2>
                <p className="text-gray-400 mb-6 leading-relaxed">Book pre-assembled teams with a lead foreman. Guaranteed synergy and standardized daily rates.</p>
                <div className="space-y-3">
                  {appData.group_bookings.map(grp => (
                    <div key={grp.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                      <span className="material-symbols-outlined text-orange-400">groups</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{grp.name}</p>
                        <p className="text-xs text-gray-400">{grp.description} · {formatINR(grp.rate_inr_per_day)}/day</p>
                      </div>
                      <button className="text-orange-400 font-bold text-sm hover:text-orange-300 transition-colors">Select</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600" alt="Team" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="text-3xl font-black text-white">150+</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Verified Groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Modal */}
      <Modal open={!!bookModal} onClose={() => setBookModal(null)} title="Confirm Booking" size="sm">
        {bookModal && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
              <img src={bookModal.avatar} alt={bookModal.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div>
                <h4 className="font-bold text-gray-900">{bookModal.name}</h4>
                <p className="text-sm text-orange-500 font-semibold">{bookModal.skill} · {bookModal.skill_level}</p>
                <p className="text-lg font-black text-gray-900 mt-1">{formatINR(bookModal.daily_wage_inr)}/day</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Start Date</label>
                <input type="date" className="input-field" defaultValue="2024-10-17" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Number of Days</label>
                <input type="number" className="input-field" defaultValue={5} min={1} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Project</label>
                <select className="input-field">
                  <option>Project Alpha — 3BHK Villa</option>
                  <option>Project Beta — Commercial Space</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setBookModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleBook(bookModal)} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">check</span> Confirm Booking
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
