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

export function getInstructorCourses() {
  return http.get<Course[]>('/instructor/courses')
}

export function createCourse(data: {
  title: string
  description: string
}) {
  return http.post('/courses', data)
}