// pages/BookingsPage.jsx
import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'

import useAuthStore from '../store/authStore'
import { getBookings, cancelBooking, getServices, getUsers } from '../services/api'
import { StatCard, BookingStatus, BookingModal,Loading } from '../components'

export default function BookingsPage() {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  const [data, setData] = useState({ bookings: [], services: [], users: [] })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({ search: '', status: 'all', service: 'all', user: 'all' })

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      const promises = [getBookings(), getServices(false)]
      if (isAdmin) promises.push(getUsers())
      const [bookingsRes, servicesRes, usersRes] = await Promise.all(promises)
      setData({
        bookings: bookingsRes.data || [],
        services: servicesRes.data || [],
        users: isAdmin && usersRes ? usersRes.data || [] : []
      })
    } catch {
      alert('Erro ao carregar')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!confirm('Cancelar?')) return
    try {
      await cancelBooking(id)
      alert('Cancelada!')
      loadData()
    } catch {
      alert('Erro')
    }
  }

  const serviceMap = Object.fromEntries(data.services.map(s => [s.id, s.name]))
  const userMap = Object.fromEntries(data.users.map(u => [u.id, u.full_name || u.email]))

  const filtered = data.bookings
    .filter(b => !filters.search || serviceMap[b.service_id]?.toLowerCase().includes(filters.search.toLowerCase()))
    .filter(b => filters.status === 'all' || b.status === filters.status)
    .filter(b => filters.service === 'all' || b.service_id === filters.service)
    .filter(b => !isAdmin || filters.user === 'all' || b.user_id === filters.user)
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))

  const stats = {
    total: filtered.length,
    confirmed: filtered.filter(b => b.status === 'confirmed').length,
    pending: filtered.filter(b => b.status === 'pending').length,
    cancelled: filtered.filter(b => b.status === 'cancelled').length
  }

  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))


  if (loading) return <Loading />
  return (
    
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">{isAdmin ? 'Gestão' : 'Suas'} reservas</p>
          <h1 className="text-3xl font-bold">Reservas</h1>
        </div>
        <button onClick={() => setShowModal(true)} className="flex gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg">
          <Plus size={16} /> Nova reserva
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <input className="p-2 border rounded-lg" placeholder="Buscar..." value={filters.search} onChange={e => updateFilter('search', e.target.value)} />
        <select className="p-2 border rounded-lg" value={filters.status} onChange={e => updateFilter('status', e.target.value)}>
          {['all', 'confirmed', 'pending', 'cancelled'].map(s => <option key={s} value={s}>{s === 'all' ? 'Todos' : s}</option>)}
        </select>
        <select className="p-2 border rounded-lg" value={filters.service} onChange={e => updateFilter('service', e.target.value)}>
          <option value="all">Todos serviços</option>
          {data.services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        {isAdmin ? (
          <select className="p-2 border rounded-lg" value={filters.user} onChange={e => updateFilter('user', e.target.value)}>
            <option value="all">Todos usuários</option>
            {data.users.map(u => <option key={u.id} value={u.id}>{u.full_name || u.email}</option>)}
          </select>
        ) : (
          <div className="p-2 border rounded-lg bg-slate-50">Apenas suas reservas</div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {['total', 'confirmed', 'pending', 'cancelled'].map(key => (
          <StatCard key={key} label={key} value={stats[key]} color={key} />
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center border rounded-lg">Nenhuma reserva</div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-slate-500">Mostrando {filtered.length} de {data.bookings.length}</p>
          {filtered.map(b => (
            <div key={b.id} className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{serviceMap[b.service_id]}</p>
                  <p className="text-sm text-slate-600">{new Date(b.start_time).toLocaleString('pt-BR')}</p>
                  {isAdmin && <p className="text-xs text-slate-400">{userMap[b.user_id] || b.user_id}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <BookingStatus status={b.status} />
                  {b.status !== 'cancelled' && (
                    <button onClick={() => handleCancel(b.id)} className="text-xs text-red-600">Cancelar</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <BookingModal services={data.services} onClose={() => setShowModal(false)} onSuccess={loadData} />}
    </div>
  )
}