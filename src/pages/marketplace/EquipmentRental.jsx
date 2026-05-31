import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../../store/slices/cartSlice'
import Badge from '../../components/ui/Badge'
import appData from '../../data/appData.json'
import { formatINR } from '../../utils/helpers'

const CATEGORIES = ['All', 'Earthmover', 'Lifting & Cranes', 'Transport & Tippers']

export default function EquipmentRental() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [category, setCategory] = useState('All')
  const [rentalType, setRentalType] = useState({})
  const [added, setAdded] = useState({})

  const filtered = appData.equipment.filter(e => category === 'All' || e.category === category)

  const getRentalType = id => rentalType[id] || 'day'
  const setType = (id, type) => setRentalType(prev => ({ ...prev, [id]: type }))

  const getRate = (item) => getRentalType(item.id) === 'hour' ? item.rate_inr_per_hour : item.rate_inr_per_day
  const getRateLabel = (item) => getRentalType(item.id) === 'hour' ? '/hr' : '/day'

  const handleAdd = (item) => {
    const rate = getRate(item)
    if (!rate) return
    dispatch(addItem({ id: item.id, name: item.name, price_inr: rate, unit: getRentalType(item.id), image: item.image, quantity: 1 }))
    setAdded(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 2000)
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-64">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200" alt="Equipment" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-end p-8">
          <div>
            <span className="badge badge-orange mb-3">Fleet Status: Available</span>
            <h1 className="text-4xl font-black text-white font-headline tracking-tight mb-2">Precision Engineering on Demand.</h1>
            <p className="text-gray-300 max-w-lg">Industrial-grade machinery with guaranteed uptime, vetted operators, and seamless logistics.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-5 shadow-ambient">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={category === cat} onChange={() => setCategory(cat)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 border-gray-300" />
                  <span className={`text-sm font-medium transition-colors ${category === cat ? 'text-orange-600' : 'text-gray-700 group-hover:text-orange-500'}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Calendar */}
          <div className="bg-white rounded-3xl p-5 shadow-ambient">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Calendar</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-3">
              {['M','T','W','T','F','S','S'].map((d,i) => <span key={i} className="text-gray-400 font-bold">{d}</span>)}
              {[12,13,14,15,16,17,18].map(d => (
                <button key={d} className={`py-2 rounded-lg text-xs font-semibold transition-colors ${d === 14 ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 hover:text-orange-600'}`}>{d}</button>
              ))}
            </div>
            <p className="text-xs text-gray-400 italic">Selected: 14th Oct</p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-ambient">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Need Custom Fleet?</h3>
            <p className="text-sm text-gray-500 mb-4">Specialized equipment for enterprise infrastructure projects.</p>
            <button className="btn-primary w-full text-sm">Consult Specialist</button>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black font-headline text-gray-900">Available Fleet</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors">Recently Added</button>
              <button className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold">Price: Low to High</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(item => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-ambient hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge status={item.stock_status} label={item.stock_status === 'available' ? 'In Stock' : item.stock_status === 'low' ? 'Low Stock' : item.stock_status} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-headline">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category} · {item.model_year} Model</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase">Starting at</p>
                      <p className="text-xl font-black text-orange-600">{formatINR(getRate(item))}<span className="text-sm font-normal text-gray-500">{getRateLabel(item)}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.specs.map(s => <span key={s} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{s}</span>)}
                    {item.operator_available && <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Operator Available</span>}
                    {item.fuel_included && <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Fuel Included</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {item.rate_inr_per_hour && (
                      <button onClick={() => { setType(item.id, 'hour'); handleAdd(item) }}
                        className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${added[item.id] && getRentalType(item.id) === 'hour' ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200'}`}>
                        Rent by Hour
                      </button>
                    )}
                    <button onClick={() => { setType(item.id, 'day'); handleAdd(item) }}
                      className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${!item.rate_inr_per_hour ? 'col-span-2' : ''} ${added[item.id] && getRentalType(item.id) === 'day' ? 'bg-green-500 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                      {added[item.id] ? 'Added!' : 'Rent by Day'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black font-headline tracking-tight mb-3">Need Something Specialized?</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Marine cranes, tunneling equipment, and specialized paving machines for enterprise infrastructure projects.</p>
                <ul className="space-y-3 mb-6">
                  {['Project-specific sourcing','Global logistics network','24/7 on-site maintenance'].map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-orange-500 text-sm">verified</span>
                      <span className="text-sm font-semibold">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all active:scale-95">
                Consult Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
