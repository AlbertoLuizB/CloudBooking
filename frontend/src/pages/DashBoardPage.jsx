import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import useAuthStore from '../store/authStore'
import { getBookings, getServices, getUsers } from '../services/api'
import AdminPanelCard from '../components/card/AdminPanelCard'
import {
  StatCard,
  BookingList,
  PageHeader,
  Loading,
  BookingModal  
} from '../components'



export default function DashboardPage() {
  const { user } = useAuthStore()
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  // 👇 Estado pro modal
  const [showBookingModal, setShowBookingModal] = useState(false)

  const isAdmin = user?.role === 'admin'
  const isCommonUser = !isAdmin && user 

  useEffect(() => {
    async function fetchData() {
      try {
        const promises = [
          getBookings(),
          getServices(false)
        ]
        
        if (isAdmin) {
          promises.push(getUsers())
        }
        
        const [bookingsRes, servicesRes, usersRes] = await Promise.all(promises)
        
        setBookings(bookingsRes.data || [])
        setServices(servicesRes.data || [])
        if (isAdmin && usersRes) {
          setUsers(usersRes.data || [])
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [isAdmin])

  const serviceMap = {}
  services.forEach(s => { serviceMap[s.id] = s.name })

  const userMap = {}
  users.forEach(u => { userMap[u.id] = u.full_name || u.email })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    activeServices: services.filter(s => s.is_active).length,
  }

  const upcoming = bookings
    .filter(b => b.status !== 'cancelled' && new Date(b.start_time) > new Date())
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
    .slice(0, 5)

  const recent = [...bookings]
    .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
    .slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const firstName = user?.full_name?.split(' ')[0] || 'usuário'

  // 👇 Função chamada quando cria reserva com sucesso
  const handleBookingCreated = () => {
    getBookings().then(res => setBookings(res.data || []))
  }

  if (loading) return <Loading />

  return (
    <div className="p-8 max-w-7xl mx-auto">

      <PageHeader
        title={`${greeting}, ${firstName}!`}
        subtitle={format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        buttonText="Nova reserva"
        onButtonClick={() => setShowBookingModal(true)}
        showButton={isCommonUser}  
      />

   
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} color="total" />
        <StatCard  label="Confirmadas" value={stats.confirmed} color="confirmed" />
        <StatCard  label="Pendentes" value={stats.pending} color="pending" />
        <StatCard  label="Canceladas" value={stats.cancelled} color="cancelled" />
        <StatCard  label="Serviços" value={stats.activeServices} color="active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
               <BookingList
            title="Próximas reservas"
            subtitle="Agendamentos futuros"
            bookings={upcoming}
            emptyMessage="Nenhuma reserva futura"
            onNewBooking={isCommonUser ? () => setShowBookingModal(true) : null}  // 
            showViewAll
            viewAllLink="/bookings"
            showUserName={isAdmin}
            serviceMap={serviceMap}
            userMap={userMap}
          />

          <BookingList
            title="Atividade recente"
            subtitle="Últimas reservas realizadas"
            bookings={recent}
            emptyMessage="Nenhuma reserva no histórico"
            showUserName={isAdmin}
            serviceMap={serviceMap}
            userMap={userMap}
          />
        </div>

           <div className="space-y-6">
          <AdminPanelCard user={user} stats={stats} isAdmin={isAdmin} />
        </div>
      </div>


      {showBookingModal && (
        <BookingModal
          services={services}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingCreated}
        />
      )}
    </div>
  )
}