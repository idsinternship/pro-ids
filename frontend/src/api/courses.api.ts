import http from './http'

export interface Course {
  id: number
  title: string
  description: string
  instructor_name?: string
}

export function getCourses() {
  return http.get<Course[]>('/courses')
}

export function getCourse(id: number) {
  return http.get<Course>(`/courses/${id}`)
}