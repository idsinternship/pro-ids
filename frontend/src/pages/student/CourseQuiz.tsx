import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getCourseQuiz, submitQuiz } from '../../api/quizzes.api'
import type { Quiz } from '../../api/quizzes.api'

export default function CourseQuiz() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!courseId) return

    getCourseQuiz(Number(courseId))
      .then((res) => setQuiz(res.data))
      .finally(() => setLoading(false))
  }, [courseId])

  const handleChange = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleSubmit = async () => {
    if (!quiz) return
    setSubmitting(true)
    await submitQuiz(quiz.id, answers)
    navigate('/student')
  }

  if (loading) return <CircularProgress />
  if (!quiz) return <Typography>No quiz available</Typography>

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>

      {quiz.questions.map((q, idx) => (
        <Box key={q.id} sx={{ mt: 3 }}>
          <Typography variant="h6">
            {idx + 1}. {q.question}
          </Typography>

          <RadioGroup
            value={answers[q.id] ?? ''}
            onChange={(e) =>
              handleChange(q.id, Number(e.target.value))
            }
          >
            {q.options.map((opt) => (
              <FormControlLabel
                key={opt.id}
                value={opt.id}
                control={<Radio />}
                label={opt.text}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}

      <Button
        sx={{ mt: 4 }}
        variant="contained"
        disabled={submitting}
        onClick={handleSubmit}
      >
        Submit Quiz
      </Button>
    </Paper>
  )
}