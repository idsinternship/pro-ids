import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getLessons,
  completeLesson,
  type Lesson,
} from '../../api/lessons.api'

export default function CourseLessons() {
  const { courseId } = useParams()
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    if (!courseId) return
    getLessons(Number(courseId)).then(res => setLessons(res.data))
  }, [courseId])

  const markComplete = async (lessonId: number) => {
    await completeLesson(lessonId)
    setLessons(prev =>
      prev.map(l =>
        l.id === lessonId ? { ...l, completed: true } : l
      )
    )
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Lessons
      </Typography>

      {lessons.map(lesson => (
        <Paper key={lesson.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">
            {lesson.title}
          </Typography>

          <Typography sx={{ my: 1 }}>
            {lesson.content}
          </Typography>

          {!lesson.completed && (
            <Button
              variant="contained"
              onClick={() => markComplete(lesson.id)}
            >
              Mark Complete
            </Button>
          )}

          {lesson.completed && (
            <Typography color="success.main">
              Completed
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  )
}