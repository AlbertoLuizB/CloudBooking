import { AppLogo } from '../AppLogo'

export  function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      width: '100%',
      maxWidth: '450px',
      padding: '40px'
    }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <AppLogo />
      </div>
    
      
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: subtitle ? '10px' : '30px',
        textAlign: 'center'
      }}>
        {title}
      </h1>
      
      {subtitle && (
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          {subtitle}
        </p>
      )}
      
      {children}
      
      {footer && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {footer}
        </div>
      )}
    </div>
  )
}