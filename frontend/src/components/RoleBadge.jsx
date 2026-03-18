import { Shield } from 'lucide-react'

export function RoleBadge({ role }) {
  const isAdmin = role === 'admin'
  return (
    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
      isAdmin ? 'badge-pending' : 'badge-confirmed'
    }`}>
      <Shield size={11} />
      {isAdmin ? 'Admin' : 'Usuário'}
    </span>
  )
}