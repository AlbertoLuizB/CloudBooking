export default function MonthlySummaryCard({ confirmed, pending, cancelled, total }) {
  const items = [
    { label: 'Confirmadas', value: confirmed, color: 'bg-emerald-500' },
    { label: 'Pendentes', value: pending, color: 'bg-amber-500' },
    { label: 'Canceladas', value: cancelled, color: 'bg-rose-500' },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fadeUp">
      <h3 className="font-semibold text-sm text-slate-700 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
        Resumo do mês
      </h3>

      <div className="space-y-3">
        {items.map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={'w-2 h-2 rounded-full ' + color} />
              <span className="text-xs text-slate-600">{label}</span>
            </div>
            <span className="text-xs font-medium text-slate-700">{value}</span>
          </div>
        ))}

        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Total no mês</span>
          <span className="font-semibold text-slate-800">{total}</span>
        </div>
      </div>
    </div>
  )
}
