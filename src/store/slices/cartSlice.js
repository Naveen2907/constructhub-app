import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity || 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    updateQty(state, action) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.quantity = action.payload.quantity
    },
    clearCart(state) { state.items = [] },
    toggleCart(state) { state.isOpen = !state.isOpen },
  },
})

export const { addItem, removeItem, updateQty, clearCart, toggleCart } = cartSlice.actions
export default cartSlice.reducer
