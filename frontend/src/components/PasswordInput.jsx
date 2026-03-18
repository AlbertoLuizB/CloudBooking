import { useState } from 'react'

export  function PasswordInput({ 
  label, 
  value, 
  onChange, 
  error, 
  placeholder = '********',
  ...props 
}) {
  const [show, setShow] = useState(false)

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
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
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
            paddingRight: '45px',
            ...props.style
          }}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px'
          }}
        >
  
        </button>
      </div>
      {error && (
        <p style={{ color: '#ff4444', fontSize: '14px', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  )
}