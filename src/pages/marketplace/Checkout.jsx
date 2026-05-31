import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../store/slices/cartSlice'
import { formatINR } from '../../utils/helpers'

const ADDRESSES = [
  { id: 1, label: 'Project Alpha Site', address: '482 Industrial Way, Chennai, TN 600001', gate: 'Gate 4, Heavy Equipment Zone' },
  { id: 2, label: 'Site B Warehouse', address: '102 Supply Chain Rd, Warehouse District, Chennai', gate: '' },
]
const TIME_SLOTS = ['08:00 AM', '10:00 AM', '01:00 PM', '03:30 PM']

export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector(s => s.cart)
  const [selectedAddress, setSelectedAddress] = useState(1)
  const [selectedTime, setSelectedTime] = useState('10:00 AM')
  const [selectedDay, setSelectedDay] = useState(16)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [processing, setProcessing] = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price_inr * i.quantity, 0)
  const logistics = Math.round(subtotal * 0.02)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + logistics + gst

  const handleCheckout = () => {
    setProcessing(true)
    setTimeout(() => {
      dispatch(clearCart())
      navigate('/order-confirmation')
    }, 1500)
  }

  if (items.length === 0 && !processing) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shopping_cart</span>
        <h2 className="text-2xl font-bold text-gray-700 font-headline mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Add materials or equipment before checking out</p>
        <button onClick={() => navigate('/marketplace')} className="btn-primary">Go to Marketplace</button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-gray-500">arrow_back</span>
        </button>
        <div>
          <p className="section-label">Secure Checkout</p>
          <h1 className="text-3xl font-black font-headline text-gray-900">Complete Your Order</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 text-green-600 font-semibold text-sm">
          <span className="material-symbols-outlined text-sm">lock</span> SSL Secured
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Summary + Payment */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <h2 className="text-xl font-bold font-headline text-gray-900 mb-5">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-gray-400">inventory_2</span></div>}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} {item.unit}</p>
                    <p className="font-black text-orange-600 mt-1">{formatINR(item.price_inr * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {[['Subtotal', subtotal], ['Logistics & Handling', logistics], ['GST (18%)', gst]].map(([l, v]) => (
                <div key={l} className="flex justify-between text-sm text-gray-600">
                  <span>{l}</span><span className="font-semibold">{formatINR(v)}</span>
                </div>
              ))}
              <div className="flex justify-between text-lg font-black pt-3 border-t border-gray-100">
                <span>Total Due</span>
                <span className="text-orange-600">{formatINR(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <h2 className="text-xl font-bold font-headline text-gray-900 mb-5">Secure Payment</h2>
            <div className="space-y-3 mb-5">
              {[['credit','credit_card','Industrial Credit Account','Ends in 8842 · Corporate Hub'],['wire','payments','Wire Transfer (Net 30)','Approved for Industrial Tiers']].map(([id,icon,label,sub]) => (
                <label key={id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id)} className="hidden" />
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${paymentMethod === id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                  {paymentMethod === id && <span className="material-symbols-outlined text-orange-500">check_circle</span>}
                </label>
              ))}
            </div>
            <div className="space-y-3">
              <input className="input-field" placeholder="Cardholder Name" />
              <input className="input-field" placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field" placeholder="MM / YY" />
                <input className="input-field" placeholder="CVC" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Delivery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-ambient">
            <h2 className="text-xl font-bold font-headline text-gray-900 mb-6">Delivery Logistics</h2>

            {/* Address */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Destination</label>
                <button className="text-orange-500 text-sm font-bold hover:underline">+ Add New Site</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ADDRESSES.map(addr => (
                  <button key={addr.id} onClick={() => setSelectedAddress(addr.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative ${selectedAddress === addr.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    {selectedAddress === addr.id && <span className="material-symbols-outlined text-orange-500 absolute top-3 right-3 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">home_work</span>{addr.label}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{addr.address}</p>
                    {addr.gate && <p className="text-xs text-gray-400 mt-1">{addr.gate}</p>}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">Schedule Arrival</label>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900">October 2024</span>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-white rounded-xl transition-colors"><span className="material-symbols-outlined text-gray-500">chevron_left</span></button>
                    <button className="p-2 hover:bg-white rounded-xl transition-colors"><span className="material-symbols-outlined text-gray-500">chevron_right</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-3 text-center">
                  {['MO','TU','WE','TH','FR','SA','SU'].map(d => <div key={d} className="text-xs font-bold text-gray-400">{d}</div>)}
                  {[14,15,16,17,18,19,20].map(d => (
                    <button key={d} onClick={() => setSelectedDay(d)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${d < 15 ? 'text-gray-300 cursor-not-allowed' : selectedDay === d ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'hover:bg-white hover:shadow-sm'}`}
                      disabled={d < 15}>{d}</button>
                  ))}
                </div>
                <div className="h-px bg-gray-200 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedTime === t ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">Site Instructions</label>
              <textarea className="input-field resize-none" rows={3} placeholder="e.g., Use Gate 4, call Foreman upon arrival for offloading instructions..." />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="material-symbols-outlined text-green-500 text-sm">verified_user</span>
              Your data is protected by AES-256 encryption.
            </div>
            <button onClick={handleCheckout} disabled={processing}
              className="btn-primary flex items-center gap-2 text-base px-10 py-4 whitespace-nowrap">
              {processing
                ? <><span className="material-symbols-outlined animate-spin">progress_activity</span> Processing...</>
                : <><span className="material-symbols-outlined">check_circle</span> Complete Transaction</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
