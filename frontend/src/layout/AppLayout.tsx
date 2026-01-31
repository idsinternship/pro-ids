import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const SIDEBAR_WIDTH = 240

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar width={SIDEBAR_WIDTH} />

      <Box sx={{ flexGrow: 1 }}>
        <Topbar sidebarWidth={SIDEBAR_WIDTH} />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}