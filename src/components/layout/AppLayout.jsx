import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import CartDrawer from './CartDrawer'
import { closeMobileSidebar } from '../../store/slices/uiSlice'

export default function AppLayout() {
  const dispatch = useDispatch()
  const { mobileSidebarOpen } = useSelector(s => s.ui)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => dispatch(closeMobileSidebar())} />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  )
}
