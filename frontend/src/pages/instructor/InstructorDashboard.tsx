import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getInstructorCourses,
  type Course,
} from '../../api/courses.api'

export default function InstructorDashboard() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInstructorCourses()
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <CircularProgress />

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h4">My Courses</Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/instructor/courses/new')}
        >
          Create Course
        </Button>
      </Box>

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
          <Card key={course.id}>
            <CardContent>
              <Typography variant="h6">
                {course.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {course.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}