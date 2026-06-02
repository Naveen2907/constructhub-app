import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleCart } from '../../store/slices/cartSlice'
import { markAllRead, togglePanel } from '../../store/slices/notificationSlice'
import { toggleMobileSidebar } from '../../store/slices/uiSlice'

export default function Header({ title = 'ConstructHub' }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(s => s.auth)
  const cartCount = useSelector(s => s.cart.items.length)
  const { items: notifs, panelOpen } = useSelector(s => s.notifications)
  const unread = notifs.filter(n => !n.read).length

  const typeIcon = { delivery: 'local_shipping', maintenance: 'build', project: 'analytics', invoice: 'receipt' }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Mobile menu + Title */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => dispatch(toggleMobileSidebar())}
          >
            <span className="material-symbols-outlined text-gray-600">menu</span>
          </button>
          <h2 className="text-lg font-bold text-gray-900 font-headline hidden sm:block">{title}</h2>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-gray-600">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => dispatch(togglePanel())}
              className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-gray-600">notifications</span>
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {/* Notification Panel */}
            {panelOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900">Notifications</h4>
                  <button onClick={() => dispatch(markAllRead())} className="text-xs text-orange-500 font-bold hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {notifs.map(n => (
                    <div key={n.id} className={`flex gap-3 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-orange-50/40' : ''}`}>
                      <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-orange-500 text-sm">{typeIcon[n.type] || 'notifications'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover border-2 border-orange-200" />
            <span className="text-sm font-semibold text-gray-700 hidden md:block">{user?.name?.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
