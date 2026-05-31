import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import SearchBar from '../../components/ui/SearchBar'
import appData from '../../data/appData.json'

const CATS = ['All','Kitchen','Cooling','Laundry','Living Room']

export default function ApplianceInventory() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('Status')

  const filtered = appData.appliances.filter(a => {
    const matchCat = cat === 'All' || a.category === cat
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const statusDot = { active:'bg-green-500', maintenance:'bg-yellow-500', issue:'bg-red-500' }
  const statusLabel = { active:'Active', maintenance:'Maintenance', issue:'Issue' }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-label mb-1">Luxe Home</p>
          <h1 className="text-3xl font-black font-headline text-gray-900">Appliance Inventory</h1>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search appliances..." />
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-auto text-sm">
            <option>Status</option><option>Name</option><option>Recent</option>
          </select>
          <button onClick={() => navigate('/luxe-home/add-appliance')} className="btn-indigo flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">add</span> Add Device
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${cat===c ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-ambient hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-500 group">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${statusDot[item.status]}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{statusLabel[item.status]}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-headline">{item.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-xs">location_on</span>{item.room}
                  </p>
                </div>
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-500">kitchen</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 mb-4">
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-semibold">Brand</p>
                  <p className="text-sm font-bold text-gray-800">{item.brand}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-semibold">Energy/Day</p>
                  <p className="text-sm font-bold text-gray-800">{item.energy_kwh_daily} kWh</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
                <button onClick={() => navigate('/luxe-home/maintenance')} className="text-sm font-bold text-indigo-600 flex items-center gap-1 group/btn hover:gap-2 transition-all">
                  Details <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <button onClick={() => navigate('/luxe-home/add-appliance')}
          className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-12 gap-4 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-indigo-600 transition-colors">add</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-700">Add Appliance</p>
            <p className="text-xs text-gray-400 mt-1">Expand your smart ecosystem</p>
          </div>
        </button>
      </div>
    </div>
  )
}
