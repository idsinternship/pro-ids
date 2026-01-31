import http from './http'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: 'student' | 'instructor'
}

export const login = (data: LoginPayload) =>
  http.post('/login', data)

export const register = (data: RegisterPayload) =>
  http.post('/register', data)