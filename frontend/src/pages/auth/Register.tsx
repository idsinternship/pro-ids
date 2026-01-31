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
import { register as registerApi } from '../../api/auth.api'
import { useAuth } from '../../auth/useAuth'
import type { AxiosError } from 'axios'

interface RegisterError {
  message?: string
}

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await registerApi({
        name,
        email,
        password,
        password_confirmation: confirm,
        role: 'student' // 🔥 REQUIRED BY BACKEND
      })

      const token: string | undefined = res.data?.token
      if (!token) throw new Error('Token missing')

      login(token)
      navigate('/student')
    } catch (err) {
      const axiosErr = err as AxiosError<RegisterError>
      setError(
        axiosErr.response?.data?.message ??
        'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}