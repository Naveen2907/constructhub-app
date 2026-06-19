import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginWithRole } from '../../store/slices/authSlice'

const ROLES = [
  { role: 'homeowner', label: 'Homeowner', icon: 'home', desc: 'Design, buy materials & track projects', color: 'orange' },
  { role: 'vendor',    label: 'Vendor',    icon: 'store', desc: 'Manage fleet, orders & invoices', color: 'indigo' },
  { role: 'admin',     label: 'Admin',     icon: 'admin_panel_settings', desc: 'Platform analytics & user management', color: 'gray' },
]

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selected, setSelected] = useState('homeowner')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(loginWithRole(selected))
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-orange flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute border border-white rounded-full"
              style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white">construction</span>
            </div>
            <span
              className="text-2xl font-black text-white font-headline tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              ConstructHub
            </span>
          </div>
          <h1 className="text-5xl font-black text-white font-headline leading-tight mb-6">
            Build Smarter.<br />Live Better.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            Tamil Nadu's premier AI-powered construction ecosystem. Design, procure, build and manage — all in one place.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[['1,284', 'Homeowners'], ['87', 'Vendors'], ['234', 'Projects']].map(([v, l]) => (
            <div key={l} className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-white">{v}</p>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white">construction</span>
            </div>
            <span className="text-2xl font-black text-gray-900 font-headline">ConstructHub</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-8 -ml-1"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Home
          </button>
          <h2 className="text-3xl font-black text-gray-900 font-headline mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Select your role to continue with demo access</p>

          {/* Role selector */}
          <div className="space-y-3 mb-8">
            {ROLES.map(({ role, label, icon, desc }) => (
              <button
                key={role}
                onClick={() => setSelected(role)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  selected === role
                    ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-100'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selected === role ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${selected === role ? 'text-orange-600' : 'text-gray-800'}`}>{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
                {selected === role && (
                  <span className="material-symbols-outlined text-orange-500">check_circle</span>
                )}
              </button>
            ))}
          </div>

          {/* Email/Password fields (demo) */}
          <div className="space-y-3 mb-6">
            <input className="input-field" placeholder="Email address" defaultValue="demo@constructhub.in" readOnly />
            <input className="input-field" type="password" placeholder="Password" defaultValue="••••••••" readOnly />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-base"
          >
            {loading ? (
              <><span className="material-symbols-outlined animate-spin">progress_activity</span> Signing in...</>
            ) : (
              <><span className="material-symbols-outlined">login</span> Sign In as {ROLES.find(r => r.role === selected)?.label}</>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            Demo app — no real authentication required
          </p>
        </div>
      </div>
    </div>
  )
}
