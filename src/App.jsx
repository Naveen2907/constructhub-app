import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Layout
import AppLayout from './components/layout/AppLayout'

// Landing
import LandingPage from './pages/LandingPage'

// Auth
import Login from './pages/auth/Login'

// Dashboard
import CustomerDashboard from './pages/dashboard/CustomerDashboard'

// AI Builder
import AIBuilderWelcome from './pages/ai-builder/AIBuilderWelcome'
import AILayoutCanvas from './pages/ai-builder/AILayoutCanvas'
import DesignSummary from './pages/ai-builder/DesignSummary'
import Visualizer3D from './pages/ai-builder/Visualizer3D'

// Marketplace
import MaterialsMarketplace from './pages/marketplace/MaterialsMarketplace'
import EquipmentRental from './pages/marketplace/EquipmentRental'
import Checkout from './pages/marketplace/Checkout'
import OrderConfirmation from './pages/marketplace/OrderConfirmation'

// Workforce
import WorkforceHiring from './pages/workforce/WorkforceHiring'

// Project Tracker
import ProjectTracker from './pages/project-tracker/ProjectTracker'

// Luxe Home
import LuxeDashboard from './pages/luxe-home/LuxeDashboard'
import ApplianceInventory from './pages/luxe-home/ApplianceInventory'
import AddAppliance from './pages/luxe-home/AddAppliance'
import MaintenanceTracker from './pages/luxe-home/MaintenanceTracker'

// Vendor
import VendorHub from './pages/vendor/VendorHub'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated } = useSelector(s => s.auth)
  const role = useSelector(s => s.auth.user?.role)

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (roles && !roles.includes(role)) return <Navigate to="/dashboard" replace />

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* AI Builder — full screen, no sidebar */}
        <Route path="/ai-builder" element={<ProtectedRoute><AIBuilderWelcome /></ProtectedRoute>} />
        <Route path="/ai-builder/canvas" element={<ProtectedRoute><AILayoutCanvas /></ProtectedRoute>} />
        <Route path="/ai-builder/3d" element={<ProtectedRoute><Visualizer3D /></ProtectedRoute>} />
        <Route path="/ai-builder/summary" element={<ProtectedRoute><DesignSummary /></ProtectedRoute>} />

        {/* Vendor — full screen dark layout */}
        <Route path="/vendor" element={<ProtectedRoute roles={['vendor', 'admin']}><VendorHub /></ProtectedRoute>} />

        {/* App Shell — sidebar + header */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard"          element={<CustomerDashboard />} />
          <Route path="/marketplace"        element={<MaterialsMarketplace />} />
          <Route path="/equipment"          element={<EquipmentRental />} />
          <Route path="/checkout"           element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/workforce"          element={<WorkforceHiring />} />
          <Route path="/project-tracker"    element={<ProjectTracker />} />
          <Route path="/luxe-home"          element={<LuxeDashboard />} />
          <Route path="/luxe-home/appliances"    element={<ApplianceInventory />} />
          <Route path="/luxe-home/add-appliance" element={<AddAppliance />} />
          <Route path="/luxe-home/maintenance"   element={<MaintenanceTracker />} />
          <Route path="/admin"              element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
