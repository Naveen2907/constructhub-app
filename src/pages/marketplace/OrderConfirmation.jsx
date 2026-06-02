import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const [orderId] = useState(() => `ORD-${Math.floor(10000 + Math.random() * 90000)}`)

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-lg w-full text-center">
        {/* Success animation */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <span className="material-symbols-outlined text-green-500 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>

        <h1 className="text-4xl font-black font-headline text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-500 text-lg mb-2">Your order has been placed successfully.</p>
        <p className="text-orange-600 font-bold text-xl mb-8">{orderId}</p>

        {/* Details */}
        <div className="bg-white rounded-3xl p-6 shadow-ambient mb-8 text-left space-y-4">
          {[
            ['Order ID', orderId, 'tag'],
            ['Status', 'Confirmed & Processing', 'check_circle'],
            ['Estimated Delivery', 'Oct 16, 2024 · 10:00 AM', 'schedule'],
            ['Delivery Location', 'Project Alpha Site, Chennai', 'location_on'],
            ['Payment', 'Industrial Credit Account', 'credit_card'],
          ].map(([label, value, icon]) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-orange-500 text-sm">{icon}</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                <p className="font-bold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* GST Invoice notice */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <span className="material-symbols-outlined text-indigo-600">receipt_long</span>
          <p className="text-sm text-indigo-800 font-medium">GST-compliant invoice has been generated and sent to your email.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">dashboard</span> Go to Dashboard
          </button>
          <button onClick={() => navigate('/project-tracker')} className="btn-secondary flex-1 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">analytics</span> Track Project
          </button>
          <button onClick={() => navigate('/marketplace')} className="btn-outline flex-1 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">storefront</span> Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
