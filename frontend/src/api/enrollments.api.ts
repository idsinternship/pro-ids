import http from './http'

export function enroll(courseId: number) {
  return http.post(`/courses/${courseId}/enroll`)
}

export function unenroll(courseId: number) {
  return http.delete(`/courses/${courseId}/unenroll`)
}

export function getMyEnrollments() {
  return http.get('/my-enrollments')
}