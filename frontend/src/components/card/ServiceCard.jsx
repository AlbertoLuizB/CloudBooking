// components/ServiceCard.jsx
import React from 'react'
import { Users, Wifi, Coffee, Monitor, MapPin, Clock, Pencil, Trash2 } from 'lucide-react'

export  default function ServiceCard({ service, isAdmin, onEdit, onDelete }) {
  // Escolhe ícone baseado no nome (igual ao original)
  const getIcon = () => {
    const name = service.name.toLowerCase()
    if (name.includes('wifi') || name.includes('internet')) return <Wifi size={18} className="text-blue-600" />
    if (name.includes('café') || name.includes('coffee')) return <Coffee size={18} className="text-amber-600" />
    if (name.includes('monitor') || name.includes('projetor')) return <Monitor size={18} className="text-purple-600" />
    if (name.includes('sala') || name.includes('espaço')) return <MapPin size={18} className="text-emerald-600" />
    return <Clock size={18} className="text-slate-600" />
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden">
      {/* Faixa de status */}
      <div className={`h-2 ${service.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
      
      <div className="p-5">
        {/* Cabeçalho com ícone e nome */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              service.is_active ? 'bg-blue-50' : 'bg-slate-100'
            }`}>
              {getIcon()}
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-800">{service.name}</h3>
              {service.capacity && (
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Users size={11} />
                  {service.capacity} {service.capacity === 1 ? 'pessoa' : 'pessoas'}
                </p>
              )}
            </div>
          </div>
          
          {/* Badge de status */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            service.is_active 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {service.is_active ? 'Ativo' : 'Inativo'}
          </span>
        </div>

        {/* Descrição */}
        {service.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {service.description}
          </p>
        )}

        {/* Botões de ação (só admin) */}
        {isAdmin && (
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onEdit(service)}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Pencil size={12} /> Editar
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Tem certeza que quer remover "${service.name}"?`))
                  onDelete(service.id)
              }}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Trash2 size={12} /> Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  )
}