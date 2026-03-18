// components/ServiceModal.jsx
import React, { useState } from 'react'
import { X, Users } from 'lucide-react'

export default function ServiceModal({ service, onClose, onSave }) {
  const isEdit = !!service
  
  const [form, setForm] = useState({
    name: service?.name || '',
    description: service?.description || '',
    capacity: service?.capacity || '',
    is_active: service?.is_active ?? true
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const validar = () => {
    const novosErros = {}
    
    if (!form.name) {
      novosErros.name = 'Nome é obrigatório'
    } else if (form.name.length < 2) {
      novosErros.name = 'Nome muito curto (mínimo 2)'
    } else if (form.name.length > 100) {
      novosErros.name = 'Nome muito longo (máximo 100)'
    }
    
    if (form.capacity && (form.capacity < 1 || !Number.isInteger(Number(form.capacity)))) {
      novosErros.capacity = 'Capacidade deve ser um número positivo'
    }
    
    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validar()) return
    
    setLoading(true)
    
    // Prepara os dados
    const dados = {
      name: form.name,
      description: form.description || null,
      capacity: form.capacity ? Number(form.capacity) : null,
      is_active: form.is_active
    }
    
    await onSave(dados, isEdit ? service.id : null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {isEdit ? 'Editar serviço' : 'Novo serviço'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nome do serviço <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: Sala de Reunião A"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm outline-none border ${
                errors.name ? 'border-rose-300' : 'border-slate-200 focus:border-slate-400'
              }`}
            />
            {errors.name && (
              <p className="text-xs mt-1 text-rose-600">{errors.name}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Descrição
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descreva o espaço, equipamentos..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none border border-slate-200 focus:border-slate-400 resize-none"
            />
          </div>

          {/* Capacidade */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Capacidade (pessoas)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Users size={16} className="text-slate-400" />
              </div>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Ex: 10"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none border ${
                  errors.capacity ? 'border-rose-300' : 'border-slate-200 focus:border-slate-400'
                }`}
              />
            </div>
            {errors.capacity && (
              <p className="text-xs mt-1 text-rose-600">{errors.capacity}</p>
            )}
          </div>

          {/* Checkbox ativo */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              id="is_active"
              className="w-4 h-4 rounded border-slate-300 text-emerald-600"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-slate-700 cursor-pointer">
              Serviço ativo (disponível para reservas)
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}