import { Calendar, Users, CheckCircle, AlertCircle, XCircle, TrendingUp } from 'lucide-react'

export function BookingStats({ stats, userStats, serviceStats }) {
  const cards = [
    {
      title: 'Total de reservas',
      value: stats.total,
      icon: Calendar,
      color: 'blue',
      subtitle: `${stats.confirmed} confirmadas`
    },
    {
      title: 'Usuários ativos',
      value: userStats.active,
      icon: Users,
      color: 'emerald',
      subtitle: `${userStats.total} total`
    },
    {
      title: 'Taxa de confirmação',
      value: `${stats.confirmRate}%`,
      icon: TrendingUp,
      color: 'blue',
      subtitle: `${stats.confirmed} de ${stats.total - stats.cancelled}`
    },
    {
      title: 'Cancelamentos',
      value: stats.cancelled,
      icon: XCircle,
      color: 'rose',
      subtitle: `${Math.round((stats.cancelled / stats.total) * 100)}% do total`
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        const colors = {
          blue: 'bg-blue-50 text-blue-600 border-blue-200',
          emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
          blue: 'bg-blue-50 text-blue-600 border-blue-200',
          rose: 'bg-rose-50 text-rose-600 border-rose-200'
        }
        
        return (
          <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500">{card.title}</p>
              <div className={`p-2 rounded-lg border ${colors[card.color]}`}>
                <Icon size={14} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
          </div>
        )
      })}
    </div>
  )
}