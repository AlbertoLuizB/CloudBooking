import api from './api'


export const getBookings = () => api.get('/bookings')


export const getBooking = (id) => api.get(`/bookings/${id}`)


export const createBooking = (data) => api.post('/bookings', data)


export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data)


export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`)