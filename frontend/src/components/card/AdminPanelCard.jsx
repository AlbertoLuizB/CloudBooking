import { Link } from 'react-router-dom'

export default function AdminPanelCard({ user, stats, isAdmin }) {
  const firstName = user?.full_name?.split(' ')[0] || 'usuário'

  if (isAdmin) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white p-6 rounded-lg">
        <h3 className="font-semibold mb-2">Painel Administrativo </h3>
        <p className="text-sm text-slate-300 mb-4">Você tem acesso total ao sistema</p>
        
        {/* Botões de admin */}
        <div className="space-y-2 mb-4">
          <Link
            to="/admin/users"
            className="block w-full bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-3 rounded-lg transition-colors text-center"
          >
            👥 Administrar usuários
          </Link>
          <Link
            to="/bookings"
            className="block w-full bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-3 rounded-lg transition-colors text-center"
          >
            📋 Administrar reservas
          </Link>
               <Link
            to="/services"
            className="block w-full bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-3 rounded-lg transition-colors text-center"
          >
            📋 Administrar serviços
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-xl font-bold">{stats.total}</p>
            <p className="text-xs text-slate-300">Reservas</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-xl font-bold">{stats.confirmed}</p>
            <p className="text-xs text-slate-300">Confirmadas</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white p-6 rounded-lg">
      <h3 className="font-semibold mb-2">Olá, {firstName}!</h3>
      <p className="text-sm text-slate-300 mb-4">Gerencie suas reservas com facilidade</p>
      <div className="grid grid-cols-2 gap-3 text-center text-sm">
        <div className="bg-white/10 rounded-lg p-2">
          <p className="text-xl font-bold">{stats.total}</p>
          <p className="text-xs text-slate-300">Reservas</p>
        </div>
        <div className="bg-white/10 rounded-lg p-2">
          <p className="text-xl font-bold">{stats.confirmed}</p>
          <p className="text-xs text-slate-300">Confirmadas</p>
        </div>
      </div>
    </div>
  )
}