import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

import useAuthStore from '../store/authStore'
import { getUsers, deleteUser } from '../services/api'
import Loading from '../components/Loading'

export default function AdminUsersPage() {
  const currentUser = useAuthStore((s) => s.user)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const res = await getUsers()
      setUsers(res.data || [])
    } catch (error) {
      alert('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (user) => {
    if (!confirm(`Remover ${user.email}?`)) return
    try {
      await deleteUser(user.id)
      alert('Usuário removido!')
      loadUsers()
    } catch (err) {
      alert('Erro ao remover')
    }
  }

  const getInitials = (name, email) => {
    if (name) return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    return email?.[0]?.toUpperCase() || '?'
  }
  if (loading) return <Loading />
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <p className="text-sm text-slate-500 mt-1">Gerenciamento de contas</p>
      </div>

      {loading ? (
     <Loading />
      ) : (
        <div className="bg-white rounded-lg border divide-y">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                  user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {getInitials(user.full_name, user.email)}
                </div>
                <div>
                  <p className="font-medium">{user.full_name || '—'}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {user.role === 'admin' ? 'Admin' : 'Usuário'}
                </span>
                {currentUser?.id !== user.id && (
                  <button onClick={() => handleDelete(user)} className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}