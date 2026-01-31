import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCourse, type Course } from '../../api/courses.api'
import { enroll } from '../../api/enrollments.api'
import { useAuth } from '../../auth/useAuth'

export default function CourseDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    if (!id) return
    getCourse(Number(id))
      .then((res) => setCourse(res.data))
      .finally(() => setLoading(false))
  }, [id])

  const handleEnroll = async () => {
    if (!id) return
    setEnrolling(true)
    try {
      await enroll(Number(id))
      setEnrolled(true)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) return <CircularProgress />
  if (!course) return <Typography>Course not found</Typography>

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary">
        Instructor: {course.instructor_name}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        {course.description}
      </Typography>

      {user?.role === 'student' && (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            disabled={enrolled || enrolling}
            onClick={handleEnroll}
          >
            {enrolled ? 'Enrolled' : enrolling ? 'Enrolling…' : 'Enroll'}
          </Button>
        </Box>
      )}
    </Paper>
  )
}