import {
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material'
import { useState } from 'react'

export default function CourseQuizBuilder() {
  const [title, setTitle] = useState('')

  const handleSave = () => {
    // backend wiring later (structure ready)
    alert('Quiz saved (wiring confirmed)')
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom>
        Create Quiz
      </Typography>

      <TextField
        label="Quiz Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" onClick={handleSave}>
        Save Quiz
      </Button>
    </Paper>
  )
}