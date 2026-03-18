import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

import {AuthLayout} from '../components/AuthLayout'
import {AuthCard} from '../components/card/AuthCard'
import {Input} from '../components/Input'
import {PasswordInput} from '../components/PasswordInput'
import {Button} from '../components/Button'
import {ErrorMessage} from '../components/ErrorMessage'
import {Link} from '../components/Link'

export default function RegisterPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  
  const navigate = useNavigate()
  const { register } = useAuthStore()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validarForm = () => {
    const novosErros = {}
    
    if (!form.nome) novosErros.nome = 'Nome é obrigatório'
    else if (form.nome.length < 3) novosErros.nome = 'Nome muito curto'
    
    if (!form.email) novosErros.email = 'E-mail é obrigatório'
    else if (!form.email.includes('@') || !form.email.includes('.')) novosErros.email = 'E-mail inválido'
    
    if (!form.password) novosErros.password = 'Senha é obrigatória'
    else if (form.password.length < 6) novosErros.password = 'Senha muito curta'
    
    if (form.password !== form.confirmPassword) novosErros.confirmPassword = 'As senhas não conferem'
    
    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError('')
    
    if (!validarForm()) return
    
    setLoading(true)
    
    try {
      await register({
        full_name: form.nome,
        email: form.email,
        password: form.password
      })
      alert('Conta criada! Faça o login.')
      navigate('/login')
    } catch (err) {
      setGlobalError(err.message || 'Deu ruim no cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard 
        title="Criar conta" 
        subtitle="Preencha os dados para se cadastrar"
        footer={
          <p style={{ color: '#666' }}>
            Já tem uma conta? <Link to="/login">Fazer login</Link>
          </p>
        }
      >
        <ErrorMessage message={globalError} />
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome completo"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            error={errors.nome}
            placeholder="Seu nome"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="seu@email.com"
          />

          <PasswordInput
            label="Senha"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <PasswordInput
            label="Confirmar senha"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button loading={loading}>
            Criar conta
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}