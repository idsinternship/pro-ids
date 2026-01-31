import http from './http'

export interface QuizQuestion {
  id: number
  question: string
  options: {
    id: number
    text: string
  }[]
}

export interface Quiz {
  id: number
  title: string
  questions: QuizQuestion[]
}

export function getCourseQuiz(courseId: number) {
  return http.get<Quiz>(`/courses/${courseId}/quiz`)
}

export function submitQuiz(
  quizId: number,
  answers: Record<number, number>
) {
  return http.post(`/quizzes/${quizId}/submit`, {
    answers,
  })
}