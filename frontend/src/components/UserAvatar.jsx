export function UserAvatar({ name, email, role, size = 36 }) {
  const letter = name?.[0]?.toUpperCase() ?? email?.[0]?.toUpperCase() ?? '?'
  const isAdmin = role === 'admin'

  return (
    <div
      className={`rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
        isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
      }`}
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  )
}