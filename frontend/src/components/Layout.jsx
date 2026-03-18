import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { 
  Calendar, LayoutDashboard, Settings, Users, 
  LogOut, BookOpen, ChevronRight, Sparkles 
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import { AppLogo } from './AppLogo'

// Itens do menu que todo mundo têm acesso (com cores suaves)
const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-indigo-500' },
  { to: '/services',  label: 'Serviços',  icon: BookOpen,         color: 'text-blue-500' },
  { to: '/bookings',  label: 'Reservas',  icon: Calendar,         color: 'text-emerald-500' },
  { to: '/profile',   label: 'Perfil',    icon: Settings,         color: 'text-purple-500' },
]

// Itens que só admin tem acesso
const adminItems = [
  { to: '/admin/users', label: 'Usuários', icon: Users, color: 'text-amber-500' },
]

export default  function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Pega as iniciais do nome da pessoa (pra mostrar no avatar)
  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col fixed top-0 left-0 h-screen z-30 bg-white border-r border-slate-200 shadow-sm">
        
        {/* Logo com gradiente suave */}
  <AppLogo></AppLogo>

        {/* Navegação principal */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Menu principal
            </p>
          </div>
          
          {navItems.map(({ to, label, icon: Icon, color }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon 
                      size={18} 
                      className={`transition-colors duration-200 ${
                        isActive ? color : 'text-slate-400 group-hover:text-slate-600'
                      }`} 
                    />
                    <span>{label}</span>
                  </div>
                  {isActive && (
                    <ChevronRight size={14} className="text-slate-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Seção Admin (só aparece se for admin) */}
          {user?.role === 'admin' && (
            <>
              <div className="pt-4 pb-1 px-3 mt-4 border-t border-slate-100">
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Administração
                </p>
              </div>
              {adminItems.map(({ to, label, icon: Icon, color }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-amber-50 text-amber-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon 
                          size={18} 
                          className={`transition-colors duration-200 ${
                            isActive ? color : 'text-slate-400 group-hover:text-slate-600'
                          }`} 
                        />
                        <span>{label}</span>
                      </div>
                      {isActive && (
                        <ChevronRight size={14} className="text-slate-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        {/* Rodapé com usuário e botão de logout */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          {/* Card do usuário */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm mb-2">
            {/* Avatar com gradiente baseado no role */}
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 ${
                user?.role === 'admin' 
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600' 
                  : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
              }`}
            >
              {initials}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user?.full_name || 'Usuário'}
              </p>
              <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  user?.role === 'admin' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
              </p>
            </div>
          </div>

          {/* Botão de logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 group"
          >
            <LogOut size={17} className="text-slate-400 group-hover:text-rose-600 transition-colors duration-200" />
            <span>Sair da conta</span>
          </button>

          {/* Versão do sistema */}
          <p className="text-[10px] text-slate-400 text-center mt-3">
            v1.0.0 • © 2026
          </p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 ml-64 min-h-screen bg-slate-50">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}