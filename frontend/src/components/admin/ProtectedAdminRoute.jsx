import { Navigate } from 'react-router-dom'
import { isAdminLoggedIn } from './adminAuth'

export default function ProtectedAdminRoute({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/page/admin" replace />
  }
  return children
}
