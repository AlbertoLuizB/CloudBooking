export  function Button({ 
  children, 
  onClick, 
  type = 'submit', 
  disabled, 
  loading,
  fullWidth = true,
  ...props 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px',
        background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1,
        ...props.style
      }}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}