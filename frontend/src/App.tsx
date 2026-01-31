import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import StudentDashboard from './pages/student/StudentDashboard'
import MyCourses from './pages/student/MyCourses'
import InstructorDashboard from './pages/instructor/InstructorDashboard'

import CourseCatalog from './pages/courses/CourseCatalog'
import CourseDetails from './pages/courses/CourseDetails'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<CourseCatalog />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<MyCourses />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}