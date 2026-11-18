import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  children?: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={36} className="animate-spin text-forest" />
          <p className="text-sm font-semibold text-gray-600">Verifying Farmer Session...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children ? <>{children}</> : null
}
