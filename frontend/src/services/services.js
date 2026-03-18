import api from './api'

export const getServices = (onlyActive = false) =>
  api.get('/services', { params: { only_active: onlyActive } })


export const getService = (id) => api.get(`/services/${id}`)


export const createService = (data) => api.post('/services', data)


export const updateService = (id, data) => api.put(`/services/${id}`, data)


export const deleteService = (id) => api.delete(`/services/${id}`)