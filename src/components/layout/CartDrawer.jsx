import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeItem, updateQty, toggleCart, clearCart } from '../../store/slices/cartSlice'
import { formatINR } from '../../utils/helpers'

export default function CartDrawer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, isOpen } = useSelector(s => s.cart)
  const total = items.reduce((sum, i) => sum + i.price_inr * i.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => dispatch(toggleCart())} />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-orange-500">shopping_cart</span>
            <h3 className="text-xl font-bold font-headline">Cart ({items.length})</h3>
          </div>
          <button onClick={() => dispatch(toggleCart())} className="p-2 hover:bg-gray-100 rounded-xl">
            <span className="material-symbols-outlined text-gray-500">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">shopping_cart</span>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add materials or equipment to get started</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-gray-400">inventory_2</span></div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.unit && `per ${item.unit}`}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => item.quantity > 1 ? dispatch(updateQty({ id: item.id, quantity: item.quantity - 1 })) : dispatch(removeItem(item.id))}
                      className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-orange-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQty({ id: item.id, quantity: item.quantity + 1 }))}
                      className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-orange-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => dispatch(removeItem(item.id))} className="p-1 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm text-gray-400">delete</span>
                  </button>
                  <p className="text-sm font-black text-orange-600">{formatINR(item.price_inr * item.quantity)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-black text-gray-900 font-headline">{formatINR(total)}</span>
            </div>
            <p className="text-xs text-gray-400">GST & logistics calculated at checkout</p>
            <button
              onClick={() => { dispatch(toggleCart()); navigate('/checkout') }}
              className="btn-primary w-full text-center"
            >
              Proceed to Checkout
            </button>
            <button onClick={() => dispatch(clearCart())} className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors font-medium">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
