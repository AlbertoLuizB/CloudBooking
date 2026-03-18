export const BOOKING_STATUS = {
  confirmed: { label: 'Confirmada', color: 'emerald' },
  pending: { label: 'Pendente', color: 'amber' },
  cancelled: { label: 'Cancelada', color: 'rose' }
}

export const STAT_COLORS = {
  total: { text: 'text-slate-700', bg: 'from-slate-50', border: 'border-slate-200' },
  confirmed: { text: 'text-emerald-700', bg: 'from-emerald-50', border: 'border-emerald-200' },
  pending: { text: 'text-amber-700', bg: 'from-amber-50', border: 'border-amber-200' },
  cancelled: { text: 'text-rose-700', bg: 'from-rose-50', border: 'border-rose-200' },
  active: { text: 'text-blue-700', bg: 'from-blue-50', border: 'border-blue-200' }
}

export const SERVICE_ICONS = {
  wifi: { icon: 'Wifi', color: 'text-blue-600' },
  internet: { icon: 'Wifi', color: 'text-blue-600' },
  café: { icon: 'Coffee', color: 'text-amber-600' },
  coffee: { icon: 'Coffee', color: 'text-amber-600' },
  monitor: { icon: 'Monitor', color: 'text-purple-600' },
  projetor: { icon: 'Monitor', color: 'text-purple-600' },
  sala: { icon: 'MapPin', color: 'text-emerald-600' },
  espaço: { icon: 'MapPin', color: 'text-emerald-600' }
}

export const ERROR_MESSAGES = {
  network: 'Erro de conexão. Verifique sua internet.',
  unauthorized: 'Você não tem permissão para isso.',
  notFound: 'Recurso não encontrado.',
  default: 'Ocorreu um erro. Tente novamente.'
}
