export default function BookingStatus({ status }) {
  const config = {
    confirmed: { label: 'Confirmada', class: 'bg-green-100 text-green-700' },
    pending: { label: 'Pendente', class: 'bg-yellow-100 text-yellow-700' },
    cancelled: { label: 'Cancelada', class: 'bg-red-100 text-red-700' }
  }
  const { label, class: className } = config[status] || config.pending
  return <span className={`px-2 py-1 text-xs rounded-full ${className}`}>{label}</span>
}