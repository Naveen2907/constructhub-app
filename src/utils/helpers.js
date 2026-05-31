// Currency formatter — INR
export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

// Short INR (e.g. ₹14.8L)
export const formatINRShort = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return `₹${amount}`
}

// Date formatter
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

// Status → badge class
export const statusBadge = (status) => {
  const map = {
    in_stock: 'badge-success', available: 'badge-success', active: 'badge-success',
    paid: 'badge-success', completed: 'badge-success', ongoing: 'badge-success',
    in_transit: 'badge-info', on_way: 'badge-info', in_progress: 'badge-info',
    bulk_deal: 'badge-orange', in_demand: 'badge-orange', planning: 'badge-orange',
    low: 'badge-warning', low_stock: 'badge-warning', maintenance: 'badge-warning',
    due_soon: 'badge-warning', upcoming: 'badge-warning', pending: 'badge-warning',
    overdue: 'badge-danger', issue: 'badge-danger', out_of_stock: 'badge-danger',
  }
  return map[status] || 'badge-info'
}

// Status → human label
export const statusLabel = (status) => {
  const map = {
    in_stock: 'In Stock', available: 'Available', active: 'Active', paid: 'Paid',
    completed: 'Completed', ongoing: 'Ongoing', in_transit: 'In Transit',
    on_way: 'On the Way', in_progress: 'In Progress', bulk_deal: 'Bulk Deal',
    in_demand: 'In Demand', planning: 'Planning', low: 'Low Stock',
    low_stock: 'Low Stock', maintenance: 'Maintenance', due_soon: 'Due Soon',
    upcoming: 'Upcoming', pending: 'Pending', overdue: 'Overdue',
    issue: 'Issue', out_of_stock: 'Out of Stock',
  }
  return map[status] || status
}

// Star rating renderer
export const renderStars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return { full, half, empty: 5 - full - (half ? 1 : 0) }
}

// Clamp number
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
