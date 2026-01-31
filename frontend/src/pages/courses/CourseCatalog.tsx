import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { getCourses, type Course } from '../../api/courses.api'

export default function CourseCatalog() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <CircularProgress />
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
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
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

          <CardActions>
            {!isAuthenticated && (
              <Button onClick={() => navigate('/login')}>
                Login to Enroll
              </Button>
            )}

            {isAuthenticated && user?.role === 'student' && (
              <Button
                variant="contained"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                View Course
              </Button>
            )}

            {isAuthenticated && user?.role === 'instructor' && (
              <Button
                color="secondary"
                onClick={() =>
                  navigate(`/instructor/courses/${course.id}`)
                }
              >
                Manage
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}