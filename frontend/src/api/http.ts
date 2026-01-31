import axios from 'axios'

const http = axios.create({
  baseURL: 'https://laughing-journey-r497r49g7gwrh54g5-8000.app.github.dev/api'
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default http