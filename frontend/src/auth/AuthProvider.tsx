import { useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './AuthContext'
import type { AuthContextType, JwtPayload, User } from './auth.types'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const user: User | null = useMemo(() => {
    if (!token) return null

    try {
      const decoded = jwtDecode<JwtPayload>(token)
      return {
        id: Number(decoded.sub),
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      }
    } catch {
      return null
    }
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: !!token && !!user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}