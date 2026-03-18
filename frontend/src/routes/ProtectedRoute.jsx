import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export function PublicRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}


export function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return children
}


export function AdminRoute({ children }) {

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  



  if (!token) {
    return <Navigate to="/login" replace />
  }
  

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}