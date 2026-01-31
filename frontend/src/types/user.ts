export type UserRole = 'student' | 'instructor' | 'admin'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}