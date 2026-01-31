import axios from 'axios'

const http = axios.create({
  baseURL: 'https://stunning-space-waddle-wrp4wxpqq5rc54r7-8000.app.github.dev/api'
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default http