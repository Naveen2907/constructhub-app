import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../../store/slices/cartSlice'
import Badge from '../../components/ui/Badge'
import SearchBar from '../../components/ui/SearchBar'
import appData from '../../data/appData.json'
import { formatINR } from '../../utils/helpers'

const CATEGORIES = ['All', 'Aggregates & Sand', 'Cement & Binding', 'Structural Steel', 'Masonry Units', 'Lumber & Timber']

export default function MaterialsMarketplace() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('relevance')
  const [quantities, setQuantities] = useState({})
  const [added, setAdded] = useState({})

  const filtered = appData.materials.filter(m => {
    const matchCat = category === 'All' || m.category === category
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }).sort((a, b) => sort === 'price_asc' ? a.price_inr - b.price_inr : sort === 'price_desc' ? b.price_inr - a.price_inr : 0)

  const getQty = id => quantities[id] || 1
  const setQty = (id, val) => setQuantities(prev => ({ ...prev, [id]: Math.max(1, val) }))

  const handleAdd = (item) => {
    dispatch(addItem({ id: item.id, name: item.name, price_inr: item.price_inr, unit: item.unit, image: item.image, quantity: getQty(item.id) }))
    setAdded(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 2000)
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <p className="section-label mb-1">Industrial Marketplace</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black font-headline text-gray-900 tracking-tight">Materials</h1>
            <p className="text-gray-500 mt-1">Certified manufacturers · Real-time inventory · GST-compliant invoicing</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search materials..." />
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-auto text-sm">
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <button onClick={() => navigate('/equipment')} className="btn-outline whitespace-nowrap flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">construction</span> Equipment
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
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

          <div className="bg-white rounded-3xl p-5 shadow-ambient">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Price Range</h3>
              <span className="text-xs font-bold text-orange-500">₹50 – ₹1L</span>
            </div>
            <input type="range" className="w-full accent-orange-500" />
            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400"><span>MIN</span><span>MAX</span></div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-ambient">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Availability</h3>
            <div className="space-y-3">
              {[['Ready to Ship', true], ['Bulk Only', false]].map(([label, on]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${on ? 'bg-orange-500' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${on ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setCategory('All'); setSearch('') }} className="w-full py-3 bg-white border-b-2 border-orange-500 text-orange-600 font-bold text-sm rounded-2xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span> Reset Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-6 font-medium">{filtered.length} products found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-ambient hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {item.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge status={item.stock_status} label={item.badge} />
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 font-headline leading-tight">{item.name}</h3>
                    <span className="text-lg font-black text-orange-600 ml-2 whitespace-nowrap">{formatINR(item.price_inr)}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">{item.category}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{item.description}</p>

                  {/* Qty + Unit */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Quantity</p>
                      <div className="flex items-center justify-between">
                        <button onClick={() => setQty(item.id, getQty(item.id) - 1)} className="material-symbols-outlined text-sm hover:text-orange-500 transition-colors">remove</button>
                        <span className="font-bold text-sm">{getQty(item.id)}</span>
                        <button onClick={() => setQty(item.id, getQty(item.id) + 1)} className="material-symbols-outlined text-sm hover:text-orange-500 transition-colors">add</button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Unit</p>
                      <p className="font-bold text-sm capitalize">{item.unit}</p>
                    </div>
                  </div>

                  <button onClick={() => handleAdd(item)}
                    className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${added[item.id] ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200'}`}>
                    <span className="material-symbols-outlined text-sm">{added[item.id] ? 'check' : 'shopping_cart'}</span>
                    {added[item.id] ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-3">
            {[1,2,3].map(p => (
              <button key={p} className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${p === 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-ambient'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
