import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

import { AuthLayout }         from '../components/AuthLayout'
import { AuthCard }           from '../components/card/AuthCard'
import { Input }              from '../components/Input'
import { PasswordInput }      from '../components/PasswordInput'
import { Button }             from '../components/Button'
import { ErrorMessage }       from '../components/ErrorMessage'
import { Link }               from '../components/Link'
import { ForgotPasswordModal } from '../components/modal/ForgotPasswordModal'

export default function LoginPage() {
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [errors, setErrors]         = useState({})
  const [globalError, setGlobalError] = useState('')
  const [showForgot, setShowForgot] = useState(false)

  const navigate  = useNavigate()
  const { login } = useAuthStore()

  const validar = () => {
    const e = {}
    if (!email)                                   e.email    = 'E-mail é obrigatório'
    else if (!email.includes('@'))                e.email    = 'E-mail inválido'
    if (!password)                                e.password = 'Senha é obrigatória'
    else if (password.length < 6)                 e.password = 'Senha muito curta'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError('')
    if (!validar()) return
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setGlobalError(err.message || 'Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Login"
        subtitle="Bem-vindo de volta!"
        footer={<p style={{ color: '#666' }}>Não tem conta? <Link to="/register">Cadastre-se</Link></p>}
      >
        <ErrorMessage message={globalError} />

        <form onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} error={errors.email} placeholder="seu@email.com" />

          <PasswordInput label="Senha" value={password}
            onChange={e => setPassword(e.target.value)} error={errors.password} />

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button type="button" onClick={() => setShowForgot(true)}
              style={{ background: 'none', border: 'none', color: '#667eea', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}>
              Esqueceu a senha?
            </button>
          </div>

          <Button loading={loading}>Entrar</Button>
        </form>
      </AuthCard>

      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
    </AuthLayout>
  )
}