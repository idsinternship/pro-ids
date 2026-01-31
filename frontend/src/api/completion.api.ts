import http from './http'

export interface CourseCompletionStatus {
  course_id: number
  lessons_completed: number
  total_lessons: number
  quiz_completed: boolean
  completed: boolean
}

export function getCompletionStatus(courseId: number) {
  return http.get<CourseCompletionStatus>(
    `/courses/${courseId}/completion`
  )
}

export function getCertificate(courseId: number) {
  return http.get(
    `/courses/${courseId}/certificate`,
    { responseType: 'blob' }
  )
}