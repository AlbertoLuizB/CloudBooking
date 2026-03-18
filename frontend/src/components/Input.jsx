export  function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder,
  ...props 
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#555'
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 15px',
          border: error ? '2px solid #ff4444' : '2px solid #e1e1e1',
          borderRadius: '10px',
          fontSize: '16px',
          outline: 'none',
          ...props.style
        }}
        {...props}
      />
      {error && (
        <p style={{ color: '#ff4444', fontSize: '14px', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  )
}