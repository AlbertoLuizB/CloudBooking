export  function ErrorMessage({ message }) {
  if (!message) return null
  
  return (
    <div style={{
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  )
}