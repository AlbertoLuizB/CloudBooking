import { useState } from 'react'
import { X } from 'lucide-react'

export function ForgotPasswordModal({ onClose }) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return setMessage('Digite um email válido')

    setLoading(true)
    setTimeout(() => {
      setMessage('Se o email existir, enviaremos instruções!')
      setLoading(false)
      setTimeout(onClose, 3000)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800">Recuperar senha</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-4">Digite seu email que enviaremos instruções</p>

        {message && <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-slate-400 text-sm"
          />
          <div className="flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-slate-800 text-white rounded-lg text-sm disabled:opacity-50">
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}