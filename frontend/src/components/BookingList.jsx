import { Link } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import BookingStatus from './BookingStatus'

export default function BookingList({ 
  title, 
  subtitle, 
  bookings, 
  emptyMessage,
  onNewBooking,
  showViewAll = false,
  viewAllLink = '/bookings',
  showUserName = false,  
  serviceMap = {},       
  userMap = {}           
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        {bookings.length > 0 && (
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
            {bookings.length} {bookings.length === 1 ? 'reserva' : 'reservas'}
          </span>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {bookings.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Calendar className="mx-auto mb-2 text-slate-300" size={32} />
            <p>{emptyMessage}</p>
            {onNewBooking && (
              <button
                onClick={onNewBooking}
                className="text-sm text-emerald-600 hover:underline mt-2 inline-block"
              >
                Criar primeira reserva
              </button>
            )}
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
      
                  <p className="font-medium text-slate-800">
                    {serviceMap[booking.service_id] || 'Serviço'}
                  </p>
                  
        
                  <p className="text-sm text-slate-600">
                    {format(new Date(booking.start_time), "dd/MM/yyyy 'às' HH:mm")}
                  </p>
       
                  {showUserName && booking.user_id && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                      <User size={12} />
                      <span>{userMap[booking.user_id] || 'Usuário'}</span>
                    </div>
                  )}
                </div>
                
                <BookingStatus status={booking.status} />
              </div>
            </div>
          ))
        )}
      </div>

      {showViewAll && bookings.length > 0 && (
        <div className="p-3 border-t border-slate-200 text-center">
          <Link to={viewAllLink} className="text-xs text-slate-600 hover:text-slate-800">
            Ver todas as reservas →
          </Link>
        </div>
      )}
    </div>
  )
}