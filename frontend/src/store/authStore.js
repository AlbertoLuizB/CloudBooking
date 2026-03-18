import { create } from 'zustand'
import * as auth from '../services/auth'  
const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,

  init: async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    
    try {
      set({ loading: true })
      const { data } = await auth.getMe()  
      set({ user: data, loading: false })
    } catch {
      localStorage.removeItem('token')
      set({ user: null, token: null, loading: false })
    }
  },

  login: async (email, password) => {
    set({ loading: true })
    
    try {
      const { data } = await auth.login(email, password)  
      localStorage.setItem('token', data.access_token)
      
      const { data: user } = await auth.getMe()
      set({ user, token: data.access_token, loading: false })
      
      return user
    } catch (err) {
      set({ loading: false })
      throw err
    }
  },

  register: async (userData) => {
    set({ loading: true })
    
    try {
      await auth.register(userData)
      set({ loading: false })
    } catch (err) {
      set({ loading: false })
      throw err
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))

export default useAuthStore