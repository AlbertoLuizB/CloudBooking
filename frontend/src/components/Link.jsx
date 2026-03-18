import { useNavigate } from 'react-router-dom'

export  function Link({ to, children, style, ...props }) {
  const navigate = useNavigate()
  
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault()
        navigate(to)
      }}
      style={{
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '600',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    >
      {children}
    </a>
  )
}