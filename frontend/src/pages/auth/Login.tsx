import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { login as loginApi } from '../../api/auth.api'
import { useAuth } from '../../auth/useAuth'
import type { AxiosError } from 'axios'

interface LoginError {
  message?: string
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await loginApi({ email, password })
      const token: string | undefined = res.data?.token

      if (!token) {
        throw new Error('Token not returned')
      }

      login(token)
      navigate('/student')
    } catch (err) {
      const axiosErr = err as AxiosError<LoginError>
      setError(
        axiosErr.response?.data?.message ??
        'Invalid email or password'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}