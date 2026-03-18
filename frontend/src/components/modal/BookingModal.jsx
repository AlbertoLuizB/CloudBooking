import { useState } from 'react'
import { X } from 'lucide-react'
import { createBooking } from '../../services/api'

export default function BookingModal({ services, onClose, onSuccess }) {
  const [form, setForm] = useState({ service_id: '', start_time: '', end_time: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.service_id) return setError('Escolha um serviço')
    if (!form.start_time || !form.end_time) return setError('Preencha data e hora')

    const start = new Date(form.start_time)
    const end   = new Date(form.end_time)

    if (end <= start)    return setError('Término deve ser depois do início')
    if (start <= new Date()) return setError('Não pode reservar no passado')

    setLoading(true)
    try {
      await createBooking({
        service_id: form.service_id,
        start_time: start.toISOString(),
        end_time:   end.toISOString(),
      })
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao criar reserva')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">Nova reserva</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Serviço *</label>
            <select
              value={form.service_id}
              onChange={e => setForm({ ...form, service_id: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-slate-400 outline-none"
            >
              <option value="">Selecione...</option>
              {services.filter(s => s.is_active).map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Início *</label>
            <input
              type="datetime-local"
              value={form.start_time}
              onChange={e => setForm({ ...form, start_time: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-slate-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Término *</label>
            <input
              type="datetime-local"
              value={form.end_time}
              onChange={e => setForm({ ...form, end_time: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-slate-400 outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 disabled:opacity-50">
              {loading ? 'Criando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}