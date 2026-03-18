import { Calendar } from 'lucide-react'
export default function PageHeader({ 
  title, 
  subtitle, 
  buttonText = 'Nova reserva',
  onButtonClick,
  showButton = true  
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500">{subtitle}</p>
      </div>
   
      {showButton && onButtonClick && (  //
        <button
          onClick={onButtonClick}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 flex items-center gap-2"
        >
          <Calendar size={16} />
          {buttonText}
        </button>
      )}
    </div>
  )
}