export default function StatCard({  label, value, color }) {
  const colors = {
    total: '#475569',
    confirmed: '#16a34a',
    pending: '#ca8a04',
    cancelled: '#dc2626',
    active: '#9333ea'
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-2" style={{ color: colors[color] || '#475569' }}>
    
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  )
}