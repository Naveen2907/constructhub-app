import { createSlice } from '@reduxjs/toolkit'
import appData from '../../data/appData.json'

const stored = JSON.parse(localStorage.getItem('ch_user') || 'null')

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: stored, isAuthenticated: !!stored },
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('ch_user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('ch_user')
    },
    loginWithRole(state, action) {
      const role = action.payload
      const user = appData.users.find(u => u.role === role) || appData.users[0]
      state.user = user
      state.isAuthenticated = true
      localStorage.setItem('ch_user', JSON.stringify(user))
    },
  },
})

export const { login, logout, loginWithRole } = authSlice.actions
export default authSlice.reducer
