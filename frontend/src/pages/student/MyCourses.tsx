import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyEnrollments } from '../../api/enrollments.api'

interface MyCourse {
  id: number
  title: string
  description: string
  instructor_name?: string
}

export default function MyCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<MyCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyEnrollments()
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (courses.length === 0) {
    return <Typography>You are not enrolled in any courses yet.</Typography>
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {courses.map((course) => (
        <Card
          key={course.id}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {course.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {course.description}
            </Typography>

            {course.instructor_name && (
              <Typography variant="caption" display="block" mt={1}>
                Instructor: {course.instructor_name}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}