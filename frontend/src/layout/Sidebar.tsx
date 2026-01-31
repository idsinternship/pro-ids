import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

interface Props {
  width: number
}

export default function Sidebar({ width }: Props) {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {user?.role === 'student' && (
          <>
            <ListItemButton onClick={() => navigate('/student')}>
              <ListItemText primary="Student Home" />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate('/student/courses')}
            >
              <ListItemText primary="My Courses" />
            </ListItemButton>
          </>
        )}

        {user?.role === 'instructor' && (
          <ListItemButton
            onClick={() => navigate('/instructor')}
          >
            <ListItemText primary="Instructor Panel" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  )
}