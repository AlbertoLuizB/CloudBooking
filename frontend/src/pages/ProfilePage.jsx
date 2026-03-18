// pages/ProfilePage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import {  Shield, Save, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

import useAuthStore from '../store/authStore'
import { updateUser } from '../services/api'
import { Input } from '../components/Input'

export default function ProfilePage() {
  const navigate = useNavigate() // 👈
  const { user, init } = useAuthStore()
  const [form, setForm] = useState({ full_name: user?.full_name || '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)

  const initials = (user?.full_name || user?.email || '?')[0].toUpperCase()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password && form.password.length < 8) return toast.error('Senha muito curta')
    if (form.password && form.password !== form.confirm) return toast.error('Senhas não conferem')

    const data = {}
    if (form.full_name !== user?.full_name) data.full_name = form.full_name
    if (form.password) data.password = form.password

    if (!Object.keys(data).length) return toast.error('Nada pra salvar')

    setLoading(true)
    try {
      await updateUser(user.id, data)
      toast.success('Perfil atualizado!')
      init()
      setForm({ full_name: user?.full_name || '', password: '', confirm: '' })
    } catch {
      toast.error('Erro ao atualizar')
    } finally {
      setLoading(false)
    }
  }

  const links = [
    { path: '/bookings', label: 'Minhas reservas' },
    { path: '/services', label: 'Ver serviços' },
    ...(user?.role === 'admin' ? [{ path: '/admin/users', label: 'Gerenciar usuários' }] : [])
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500">Meu perfil</p>
          <h1 className="text-3xl font-bold">Minha conta</h1>
        </div>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-sm text-slate-600 hover:text-slate-800"
        >
          Voltar <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <div className="bg-white border rounded-xl p-6 text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-slate-800 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              {initials}
            </div>
            <h2 className="font-bold">{user?.full_name || 'Usuário'}</h2>
            <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
            <span className={`mt-3 inline-block px-3 py-1 text-xs rounded-full ${
              user?.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <Shield size={11} className="inline mr-1" />
              {user?.role === 'admin' ? 'Admin' : 'Usuário'}
            </span>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Links</h3>
            {links.map(l => (
              <button
                key={l.path}
                onClick={() => navigate(l.path)}
                className="w-full flex justify-between p-2 hover:bg-slate-50 rounded-lg text-sm text-left"
              >
                {l.label} <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Editar informações</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nome" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} />
            <Input label="Email" value={user?.email || ''} disabled hint="Não pode ser alterado" />
            <Input type="password" label="Nova senha" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            <Input type="password" label="Confirmar senha" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} />

            <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-500">
              Mínimo 8 caracteres · Deixe em branco pra manter a atual
            </div>

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 flex items-center justify-center gap-2">
              <Save size={16} />{loading ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}