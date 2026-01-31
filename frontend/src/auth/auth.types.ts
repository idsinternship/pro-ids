export type Role = 'student' | 'instructor'

export interface User {
  id: number
  name: string
  email: string
  role: Role
}

export interface JwtPayload {
  sub: string
  name: string
  email: string
  role: Role
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}