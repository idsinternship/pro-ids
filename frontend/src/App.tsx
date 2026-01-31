import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ================= STUDENT ================= */
import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import StudentCourseLessons from "./pages/student/CourseLessons";
import CourseQuiz from "./pages/student/CourseQuiz";
import Certificate from "./pages/student/Certificate";

/* ================= INSTRUCTOR ================= */
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import InstructorCourseLessons from "./pages/instructor/CourseLessons";
import CourseQuizBuilder from "./pages/instructor/CourseQuizBuilder";
import CourseAnalytics from "./pages/instructor/CourseAnalytics";

/* ================= PUBLIC COURSES ================= */
import CourseCatalog from "./pages/courses/CourseCatalog";
import CourseDetails from "./pages/courses/CourseDetails";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<CourseCatalog />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      {/* ================= AUTHENTICATED ================= */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          {/* -------- STUDENT ONLY -------- */}
          <Route element={<ProtectedRoute allow={["student"]} />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/courses" element={<MyCourses />} />

            <Route
              path="/courses/:courseId/lessons"
              element={<StudentCourseLessons />}
            />

            <Route
              path="/courses/:courseId/quiz"
              element={<CourseQuiz />}
            />

            <Route
              path="/courses/:courseId/certificate"
              element={<Certificate />}
            />
          </Route>

          {/* -------- INSTRUCTOR ONLY -------- */}
          <Route element={<ProtectedRoute allow={["instructor"]} />}>
            <Route path="/instructor" element={<InstructorDashboard />} />

            <Route
              path="/instructor/courses/new"
              element={<CreateCourse />}
            />

            <Route
              path="/instructor/courses/:courseId/lessons"
              element={<InstructorCourseLessons />}
            />

            <Route
              path="/instructor/courses/:courseId/quiz"
              element={<CourseQuizBuilder />}
            />

            <Route
              path="/instructor/courses/:courseId/analytics"
              element={<CourseAnalytics />}
            />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}