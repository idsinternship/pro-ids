import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getLessons,
  createLesson,
  type Lesson,
} from '../../api/lessons.api'

export default function CourseLessons() {
  const { courseId } = useParams()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [order, setOrder] = useState(1)

  useEffect(() => {
    if (!courseId) return
    getLessons(Number(courseId)).then(res => setLessons(res.data))
  }, [courseId])

  const handleCreate = async () => {
    if (!courseId) return

    await createLesson(Number(courseId), {
      title,
      content,
      order,
    })

    const res = await getLessons(Number(courseId))
    setLessons(res.data)

    setTitle('')
    setContent('')
    setOrder(order + 1)
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Lessons
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Lesson title"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleCreate}>
          Add Lesson
        </Button>
      </Paper>

      <List>
        {lessons.map(lesson => (
          <ListItem key={lesson.id}>
            {lesson.order}. {lesson.title}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}