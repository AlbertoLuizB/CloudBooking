import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  return format(new Date(date), formatStr, { locale: ptBR })
}

export const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy '�s' HH:mm", { locale: ptBR })
}

export const formatTime = (date) => {
  return format(new Date(date), 'HH:mm', { locale: ptBR })
}

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { locale: ptBR, addSuffix: true })
}

export const formatDuration = (start, end) => {
  const diff = new Date(end) - new Date(start)
  const hours = Math.round((diff / 3_600_000) * 10) / 10
  return `${ hours}h`
}

export const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
