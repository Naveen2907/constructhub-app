import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { toggleCart } from '../../store/slices/cartSlice'
import { closeMobileSidebar } from '../../store/slices/uiSlice'

const NAV = [
  { to: '/dashboard',       icon: 'dashboard',        label: 'Dashboard' },
  { to: '/ai-builder',      icon: 'architecture',     label: 'AI Home Builder' },
  { to: '/marketplace',     icon: 'storefront',       label: 'Marketplace' },
  { to: '/equipment',       icon: 'construction',     label: 'Equipment Rental' },
  { to: '/workforce',       icon: 'engineering',      label: 'Workforce' },
  { to: '/project-tracker', icon: 'analytics',        label: 'Project Tracker' },
  { to: '/luxe-home',       icon: 'home_iot_device',  label: 'Luxe Home' },
]

export default function Sidebar({ mobile = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(s => s.auth)
  const cartCount = useSelector(s => s.cart.items.length)

  const handleClose = () => dispatch(closeMobileSidebar())

  return (
    <aside className={`flex flex-col h-full bg-white border-r border-gray-100 ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">construction</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 font-headline tracking-tight">ConstructHub</h1>
            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Tamil Nadu</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl">
          <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-orange-500 font-semibold capitalize">{user?.role}</p>
          </div>
          <span className="material-symbols-outlined text-gray-400 text-sm">expand_more</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={mobile ? handleClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500 hover:translate-x-1'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            {label}
          </NavLink>
        ))}

        {/* Vendor link if vendor role */}
        {user?.role === 'vendor' && (
          <NavLink
            to="/vendor"
            onClick={mobile ? handleClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500 hover:translate-x-1'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">store</span>
            Vendor Hub
          </NavLink>
        )}

        {/* Admin link */}
        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            onClick={mobile ? handleClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500 hover:translate-x-1'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            Admin Panel
          </NavLink>
        )}
      </nav>

      {/* Cart + Logout */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-2">
        <button
          onClick={() => dispatch(toggleCart())}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-all"
        >
          <span className="material-symbols-outlined text-xl">shopping_cart</span>
          Cart
          {cartCount > 0 && (
            <span className="ml-auto bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={() => { dispatch(logout()); navigate('/login') }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          Logout
        </button>
      </div>
    </aside>
  )
}
