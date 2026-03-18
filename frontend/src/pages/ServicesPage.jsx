import { useState, useEffect } from 'react'
import { Search, Sparkles } from 'lucide-react'

import useAuthStore from '../store/authStore'
import { getServices, createService, updateService, deleteService } from '../services/api'
import { ServiceCard, ServiceModal, StatCard } from '../components'
import Loading from '../components/Loading'
export default function ServicesPage() {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)
  const [filter, setFilter] = useState(isAdmin ? 'all' : 'active')
  const [search, setSearch] = useState('')

  useEffect(() => { loadServices() }, [])

  const loadServices = async () => {
    try {
      const res = await getServices(false)
      setServices(res.data || [])
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (dados, id) => {
    try {
      id ? await updateService(id, dados) : await createService(dados)
      alert(id ? 'Serviço atualizado' : 'Serviço criado')
      await loadServices()
      setModalData(null)
    } catch (err) {
      alert('Erro ao salvar')
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteService(id)
      alert('Serviço removido!')
      await loadServices()
    } catch (err) {
      alert('Erro ao remover')
    }
  }

  const filtered = services
    .filter(s => !isAdmin ? s.is_active : filter === 'active' ? s.is_active : filter === 'inactive' ? !s.is_active : true)
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description?.toLowerCase().includes(search.toLowerCase()))
  if (loading) return <Loading />
  return (
    
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">{isAdmin ? 'Administre' : 'Espaços disponíveis'}</p>
          <h1 className="text-3xl font-bold">{isAdmin ? 'Gerenciar serviços' : 'Serviços'}</h1>
        </div>
        {isAdmin && (
          <button onClick={() => setModalData('new')} className="flex gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg">
            <Sparkles size={16} /> Novo serviço
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total" value={services.length} />
        <StatCard label="Ativos" value={services.filter(s => s.is_active).length} color="confirmed" />
        {isAdmin && <StatCard label="Inativos" value={services.filter(s => !s.is_active).length} color="cancelled" />}
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input className="w-full pl-9 pr-4 py-2 border rounded-lg" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {isAdmin ? (
          <select className="w-40 p-2 border rounded-lg" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        ) : (
          <div className="w-40 p-2 border rounded-lg bg-slate-50">Apenas ativos</div>
        )}
      </div>

      {loading ? (
        // <div className="grid grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-slate-100 rounded-lg animate-pulse" />)}</div>
        <Loading/>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center border rounded-lg">
          <p>Nenhum serviço encontrado</p>
          {isAdmin && !search && <button onClick={() => setModalData('new')} className="text-emerald-600 mt-2">Criar primeiro</button>}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(s => <ServiceCard key={s.id} service={s} isAdmin={isAdmin} onEdit={() => setModalData(s)} onDelete={handleDelete} />)}
        </div>
      )}

      {modalData && <ServiceModal service={modalData === 'new' ? null : modalData} onClose={() => setModalData(null)} onSave={handleSave} />}
    </div>
  )
}