// components/StatCard.jsx
import React from 'react'

export default function StatCard({ label, value, color = 'text-slate-800' }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}