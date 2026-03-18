export function AppLogo({ dark = false }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5 mt-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg">
        <span className="font-bold text-lg text-white" style={{ fontFamily: 'Syne, sans-serif' }}>CB</span>
      </div>
      <div>
        <span
          className={`font-bold text-xl ${dark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          CloudBooking
        </span>
        <span className={`block text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          sistema de reservas
        </span>
      </div>
    </div>
  )
}