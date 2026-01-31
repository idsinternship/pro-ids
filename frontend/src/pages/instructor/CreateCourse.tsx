import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../../api/courses.api'

export default function CreateCourse() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    setSaving(true)
    try {
      await createCourse({ title, description })
      navigate('/instructor')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Create New Course
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? 'Creating…' : 'Create Course'}
        </Button>
      </Box>
    </Paper>
  )
}