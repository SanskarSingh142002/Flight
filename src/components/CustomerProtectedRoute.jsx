import { Navigate } from 'react-router-dom'
import { useCustomerAuth } from '../context/CustomerAuthContext'

export default function CustomerProtectedRoute({ children }) {
  const { customerUser } = useCustomerAuth()

  if (!customerUser) return <Navigate to="/signin" replace />

  return children
}
