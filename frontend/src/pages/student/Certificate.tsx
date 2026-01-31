import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompletionStatus, getCertificate } from '../../api/completion.api'

export default function Certificate() {
  const { courseId } = useParams()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (!courseId) return

    getCompletionStatus(Number(courseId))
      .then((res) => {
        setAllowed(res.data.completed)
      })
      .finally(() => setLoading(false))
  }, [courseId])

  const download = async () => {
    const res = await getCertificate(Number(courseId))
    const blob = new Blob([res.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'certificate.pdf'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) return <CircularProgress />

  if (!allowed) {
    return (
      <Typography>
        Complete the course to unlock your certificate.
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Certificate Ready 🎉
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={download}
      >
        Download Certificate
      </Button>
    </Box>
  )
}