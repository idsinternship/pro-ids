import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// STUDENT PAGES
import MyLearningPage from "../pages/MylearningPage";
import CourseCatalogPage from "../pages/CourseCatalogPage";
import MyProgressPage from "../pages/MyProgressPage";
import CertificatesPage from "../pages/CertificatesPage";
import CourseLessonPage from "../pages/CourseLessonPage";
import CertificateViewPage from "../pages/CertificateViewPage";

// INSTRUCTOR PAGES
import InstructorOverviewPage from "../pages/instructor/InstructorOverviewPage";
import InstructorCoursesPage from "../pages/instructor/InstructorCoursesPage";
import InstructorAnalyticsPage from "../pages/instructor/InstructorAnalyticsPage";
import InstructorSettingsPage from "../pages/instructor/InstructorSettingsPage";
import InstructorCreateEditCoursePage from "../pages/instructor/InstructorCreateEditCoursePage";


import RequireInstructor from "../guards/RequireInstructor";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ===================== */}
      {/* STUDENT ROUTES */}
      {/* ===================== */}

      <Route path="/" element={<MyLearningPage />} />
      <Route path="/catalog" element={<CourseCatalogPage />} />
      <Route path="/progress" element={<MyProgressPage />} />
      <Route path="/certificates" element={<CertificatesPage />} />

      {/* Lesson / Quiz Viewer */}
      <Route
        path="/course/:id/lesson/:lessonId"
        element={<CourseLessonPage />}
      />

      {/* Certificate Viewer (FIXED – no white page) */}
      <Route
        path="/student/certificates/:id"
        element={<CertificateViewPage />}
      />

      {/* ===================== */}
      {/* INSTRUCTOR ROUTES */}
      {/* ===================== */}

      <Route
        path="/instructor"
        element={
          <RequireInstructor>
            <Navigate to="/instructor/overview" replace />
          </RequireInstructor>
        }
      />

      <Route
        path="/instructor/overview"
        element={
          <RequireInstructor>
            <InstructorOverviewPage />
          </RequireInstructor>
        }
      />

      <Route
        path="/instructor/courses"
        element={
          <RequireInstructor>
            <InstructorCoursesPage />
          </RequireInstructor>
        }
      />

      <Route
        path="/instructor/analytics"
        element={
          <RequireInstructor>
            <InstructorAnalyticsPage />
          </RequireInstructor>
        }
      />

      <Route
        path="/instructor/settings"
        element={
          <RequireInstructor>
            <InstructorSettingsPage />
          </RequireInstructor>
        }
      />
              <Route
          path="/instructor/courses/new"
          element={
            <RequireInstructor>
              <InstructorCreateEditCoursePage />
            </RequireInstructor>
          }
        />

        <Route
          path="/instructor/courses/:id/edit"
          element={
            <RequireInstructor>
              <InstructorCreateEditCoursePage />
            </RequireInstructor>
          }
        />


      {/* ===================== */}
      {/* FALLBACK */}
      {/* ===================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
