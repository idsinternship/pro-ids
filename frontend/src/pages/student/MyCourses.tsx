import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyEnrollments } from '../../api/enrollments.api'

interface MyCourse {
  id: number
  title: string
  completed: boolean
}

export default function MyCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<MyCourse[]>([])

  useEffect(() => {
    getMyEnrollments().then((res) => setCourses(res.data))
  }, [])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}>
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent>
              <Typography variant="h6">
                {course.title}
              </Typography>

              {course.completed && (
                <Chip
                  sx={{ mt: 1 }}
                  color="success"
                  label="Completed"
                />
              )}
            </CardContent>

            <CardActions>
              <Button
                onClick={() =>
                  navigate(`/courses/${course.id}/lessons`)
                }
              >
                Lessons
              </Button>

              <Button
                onClick={() =>
                  navigate(`/courses/${course.id}/quiz`)
                }
              >
                Quiz
              </Button>

              {course.completed && (
                <Button
                  color="success"
                  onClick={() =>
                    navigate(`/courses/${course.id}/certificate`)
                  }
                >
                  Certificate
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}