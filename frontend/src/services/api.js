import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})


api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ───  autenticação ─────────────────────────────────────────────────


export const register = (data) => api.post('/auth/register', data)


export const login = (email, password) => {
  const form = new URLSearchParams()
  form.append('username', email)  // O back-end espera "username" mesmo sendo email
  form.append('password', password)
  return api.post('/auth/login', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}


export const getMe = () => api.get('/auth/me')




export const getServices = (onlyActive = false) =>
  api.get('/services', { params: { only_active: onlyActive } })


export const getService = (id) => api.get(`/services/${id}`)

export const createService = (data) => api.post('/services', data)


export const updateService = (id, data) => api.put(`/services/${id}`, data)


export const deleteService = (id) => api.delete(`/services/${id}`)




export const getBookings = () => api.get('/bookings')
export const getBooking = (id) => api.get(`/bookings/${id}`)
export const createBooking = (data) => api.post('/bookings', data)
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data)
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`)




export const getUsers = () => api.get('/users')


export const getUser = (id) => api.get(`/users/${id}`)


export const updateUser = (id, data) => api.put(`/users/${id}`, data)


export const deleteUser = (id) => api.delete(`/users/${id}`)

export default api