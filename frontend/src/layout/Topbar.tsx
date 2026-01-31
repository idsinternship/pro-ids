import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

interface Props {
  sidebarWidth: number
}

export default function Topbar({ sidebarWidth }: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ ml: `${sidebarWidth}px` }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {user?.role === 'instructor' ? 'Instructor' : 'Student'} Dashboard
        </Typography>

        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}