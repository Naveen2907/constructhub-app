import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addItem } from '../../store/slices/cartSlice'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import appData from '../../data/appData.json'
import { formatINR } from '../../utils/helpers'

const CATEGORIES = ['All', 'Earthmover', 'Lifting & Cranes', 'Transport & Tippers']
const EMPTY_EQUIPMENT = {
  name: '',
  category: 'Earthmover',
  model_year: new Date().getFullYear(),
  specsText: '',
  rate_inr_per_hour: '',
  rate_inr_per_day: '',
  stock_status: 'available',
  image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800',
  operator_available: true,
  fuel_included: false,
}

export default function EquipmentRental() {
  const dispatch = useDispatch()
  const role = useSelector(s => s.auth.user?.role)
  const canManage = ['vendor', 'admin'].includes(role)
  const [category, setCategory] = useState('All')
  const [rentalType, setRentalType] = useState({})
  const [added, setAdded] = useState({})
  const [equipment, setEquipment] = useState(appData.equipment)
  const [equipmentModal, setEquipmentModal] = useState(null)
  const [form, setForm] = useState(EMPTY_EQUIPMENT)

  const filtered = equipment.filter(e => category === 'All' || e.category === category)

  const getRentalType = id => rentalType[id] || 'day'
  const setType = (id, type) => setRentalType(prev => ({ ...prev, [id]: type }))

  const getRate = (item) => getRentalType(item.id) === 'hour' ? item.rate_inr_per_hour : item.rate_inr_per_day
  const getRateLabel = (item) => getRentalType(item.id) === 'hour' ? '/hr' : '/day'

  const handleAdd = (item, type = getRentalType(item.id)) => {
    const rate = type === 'hour' ? item.rate_inr_per_hour : item.rate_inr_per_day
    if (!rate) return
    setType(item.id, type)
    dispatch(addItem({ id: item.id, name: item.name, price_inr: rate, unit: type, image: item.image, quantity: 1 }))
    setAdded(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 2000)
  }

  const openAddEquipment = () => {
    setForm(EMPTY_EQUIPMENT)
    setEquipmentModal({ mode: 'add' })
  }

  const openEditEquipment = item => {
    setForm({
      ...item,
      specsText: item.specs.join(', '),
      rate_inr_per_hour: item.rate_inr_per_hour || '',
      rate_inr_per_day: item.rate_inr_per_day || '',
    })
    setEquipmentModal({ mode: 'edit', id: item.id })
  }

  const saveEquipment = event => {
    event.preventDefault()
    const nextItem = {
      ...form,
      id: equipmentModal.mode === 'edit' ? equipmentModal.id : `EQP-${String(equipment.length + 1).padStart(3, '0')}`,
      specs: form.specsText.split(',').map(item => item.trim()).filter(Boolean),
      model_year: Number(form.model_year),
      rate_inr_per_hour: form.rate_inr_per_hour ? Number(form.rate_inr_per_hour) : null,
      rate_inr_per_day: Number(form.rate_inr_per_day || 0),
      vendor_id: 'VND-001',
    }
    delete nextItem.specsText

    setEquipment(prev => equipmentModal.mode === 'edit'
      ? prev.map(item => item.id === equipmentModal.id ? nextItem : item)
      : [nextItem, ...prev])
    setEquipmentModal(null)
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
            <h1 className="text-4xl font-black text-white font-headline tracking-tight mb-2">{canManage ? 'Manage Your Equipment Fleet.' : 'Precision Engineering on Demand.'}</h1>
            <p className="text-gray-300 max-w-lg">{canManage ? 'Add, update, and monitor rental machinery available to ConstructHub customers.' : 'Industrial-grade machinery with guaranteed uptime, vetted operators, and seamless logistics.'}</p>
          </div>
          {canManage && (
            <button onClick={openAddEquipment} className="ml-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-900/20">
              <span className="material-symbols-outlined text-sm">add</span> Add Equipment
            </button>
          )}
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
            <p className="text-sm text-gray-500 mb-4">{canManage ? 'Keep fleet rates, image references, and availability current.' : 'Specialized equipment for enterprise infrastructure projects.'}</p>
            <button onClick={canManage ? openAddEquipment : undefined} className="btn-primary w-full text-sm">{canManage ? 'Add Fleet Asset' : 'Consult Specialist'}</button>
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
                      <button onClick={() => handleAdd(item, 'hour')}
                        className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${added[item.id] && getRentalType(item.id) === 'hour' ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200'}`}>
                        {canManage ? 'Test Hour Rate' : 'Rent by Hour'}
                      </button>
                    )}
                    <button onClick={() => handleAdd(item, 'day')}
                      className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${!item.rate_inr_per_hour ? 'col-span-2' : ''} ${added[item.id] && getRentalType(item.id) === 'day' ? 'bg-green-500 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                      {added[item.id] ? 'Added!' : canManage ? 'Test Day Rate' : 'Rent by Day'}
                    </button>
                  </div>
                  {canManage && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <button onClick={() => openEditEquipment(item)} className="py-2.5 rounded-2xl border border-orange-200 text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">edit</span> Update
                      </button>
                      <button onClick={() => setEquipment(prev => prev.map(asset => asset.id === item.id ? { ...asset, stock_status: asset.stock_status === 'available' ? 'low' : 'available' } : asset))} className="py-2.5 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                        Toggle Stock
                      </button>
                    </div>
                  )}
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
              <button onClick={canManage ? openAddEquipment : undefined} className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all active:scale-95">
                {canManage ? 'Add Specialized Asset' : 'Consult Specialist'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={!!equipmentModal} onClose={() => setEquipmentModal(null)} title={equipmentModal?.mode === 'edit' ? 'Update Equipment' : 'Add Equipment'} size="lg">
        <form onSubmit={saveEquipment} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="input-field" placeholder="Equipment name" />
            <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} className="input-field">
              {CATEGORIES.filter(item => item !== 'All').map(item => <option key={item}>{item}</option>)}
            </select>
            <input type="number" value={form.model_year} onChange={e => setForm(prev => ({ ...prev, model_year: e.target.value }))} className="input-field" placeholder="Model year" />
            <select value={form.stock_status} onChange={e => setForm(prev => ({ ...prev, stock_status: e.target.value }))} className="input-field">
              <option value="available">Available</option>
              <option value="low">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <input type="number" value={form.rate_inr_per_hour} onChange={e => setForm(prev => ({ ...prev, rate_inr_per_hour: e.target.value }))} className="input-field" placeholder="Hourly rate" />
            <input required type="number" value={form.rate_inr_per_day} onChange={e => setForm(prev => ({ ...prev, rate_inr_per_day: e.target.value }))} className="input-field" placeholder="Daily rate" />
          </div>
          <textarea value={form.specsText} onChange={e => setForm(prev => ({ ...prev, specsText: e.target.value }))} className="input-field resize-none" rows={3} placeholder="Specs separated by comma, e.g. 92 HP Engine, 4WD" />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4">
            <input value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} className="input-field" placeholder="Image URL" />
            <div className="h-28 rounded-2xl overflow-hidden bg-gray-100">
              {form.image && <img src={form.image} alt="Equipment preview" className="w-full h-full object-cover" />}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <input type="checkbox" checked={form.operator_available} onChange={e => setForm(prev => ({ ...prev, operator_available: e.target.checked }))} className="rounded text-orange-500" />
              Operator available
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <input type="checkbox" checked={form.fuel_included} onChange={e => setForm(prev => ({ ...prev, fuel_included: e.target.checked }))} className="rounded text-orange-500" />
              Fuel included
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setEquipmentModal(null)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{equipmentModal?.mode === 'edit' ? 'Save Updates' : 'Add Equipment'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
