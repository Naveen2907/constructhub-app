import { createSlice } from '@reduxjs/toolkit'
import appData from '../../data/appData.json'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { items: appData.notifications, panelOpen: false },
  reducers: {
    markRead(state, action) {
      const n = state.items.find(i => i.id === action.payload)
      if (n) n.read = true
    },
    markAllRead(state) { state.items.forEach(n => (n.read = true)) },
    togglePanel(state) { state.panelOpen = !state.panelOpen },
  },
})

export const { markRead, markAllRead, togglePanel } = notificationSlice.actions
export default notificationSlice.reducer
