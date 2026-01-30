import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// AUTH
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// STUDENT
import StudentLayout from "../layout/StudentLayout";
import MyLearningPage from "../pages/MylearningPage";
import CourseCatalogPage from "../pages/CourseCatalogPage";
import MyProgressPage from "../pages/MyProgressPage";
import CertificatesPage from "../pages/CertificatesPage";
import CourseLessonPage from "../pages/CourseLessonPage";
import CertificateViewPage from "../pages/CertificateViewPage";

// INSTRUCTOR
import InstructorLayout from "../layout/InstructorLayout";
import InstructorOverviewPage from "../pages/instructor/InstructorOverviewPage";
import InstructorCoursesPage from "../pages/instructor/InstructorCoursesPage";
import InstructorAnalyticsPage from "../pages/instructor/InstructorAnalyticsPage";
import InstructorSettingsPage from "../pages/instructor/InstructorSettingsPage";
import InstructorCreateEditCoursePage from "../pages/instructor/InstructorCreateEditCoursePage";

export default function AppRoutes() {
  const { user, loading } = useAuth();

  const isAuthenticated = !!user;
  const role = user?.role;

  // ⛔ CRITICAL: wait for /me to resolve
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* AUTH */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* STUDENT */}
      {isAuthenticated && role === "student" && (
        <Route element={<StudentLayout />}>
          <Route path="/" element={<MyLearningPage />} />
          <Route path="/catalog" element={<CourseCatalogPage />} />
          <Route path="/progress" element={<MyProgressPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route
            path="/course/:id/lesson/:lessonId"
            element={<CourseLessonPage />}
          />
          <Route
            path="/student/certificates/:id"
            element={<CertificateViewPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}

      {/* INSTRUCTOR */}
      {isAuthenticated && role === "instructor" && (
        <Route element={<InstructorLayout />}>
          <Route
            path="/instructor/overview"
            element={<InstructorOverviewPage />}
          />
          <Route
            path="/instructor/courses"
            element={<InstructorCoursesPage />}
          />
          <Route
            path="/instructor/courses/new"
            element={<InstructorCreateEditCoursePage />}
          />
          <Route
            path="/instructor/courses/:id/edit"
            element={<InstructorCreateEditCoursePage />}
          />
          <Route
            path="/instructor/analytics"
            element={<InstructorAnalyticsPage />}
          />
          <Route
            path="/instructor/settings"
            element={<InstructorSettingsPage />}
          />
          <Route
            path="*"
            element={<Navigate to="/instructor/overview" replace />}
          />
        </Route>
      )}
    </Routes>
  );
}