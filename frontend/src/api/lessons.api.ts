import http from './http'

export interface Lesson {
  id: number
  title: string
  content: string
  order: number
  completed?: boolean
}

export function getLessons(courseId: number) {
  return http.get<Lesson[]>(`/courses/${courseId}/lessons`)
}

export function createLesson(courseId: number, data: {
  title: string
  content: string
  order: number
}) {
  return http.post(`/courses/${courseId}/lessons`, data)
}

export function completeLesson(lessonId: number) {
  return http.post(`/lessons/${lessonId}/complete`)
}