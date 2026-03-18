import { AppLogo } from "./AppLogo"

export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="animate-pulse space-y-4">
      <AppLogo></AppLogo>
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-5 gap-4">
          
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}