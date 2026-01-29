import AppLayout from "../layout/AppLayout";
import StatCard from "../components/dashboard/StatCard";

const mockCourses = [
  {
    id: 1,
    title: "Fullstack Web Development with React",
    progress: 35,
    completedLessons: 7,
    totalLessons: 20,
  },
  {
    id: 2,
    title: "Introduction to Data Science",
    progress: 0,
    completedLessons: 0,
    totalLessons: 12,
  },
];

export default function MyLearningPage() {
  return (
    <AppLayout title="My Learning">
      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        <StatCard
          icon="📚"
          label="Active Courses"
          value={mockCourses.length}
          bg="#e0edff"
        />
        <StatCard
          icon="🏆"
          label="Quizzes Passed"
          value={2}
          bg="#dcfce7"
        />
        <StatCard
          icon="⚡"
          label="Avg. Score"
          value="78%"
          bg="#f3e8ff"
        />
      </div>
      {/* UPCOMING QUIZZES */}
<div
  style={{
    background: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  }}
>
  <h3 style={{ marginBottom: 12 }}>Upcoming Quizzes</h3>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #e5e7eb",
      fontSize: 14,
    }}
  >
    <span>React Fundamentals Quiz</span>
    <span style={{ color: "#64748b" }}>Tomorrow</span>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      fontSize: 14,
    }}
  >
    <span>Hooks Deep Dive Quiz</span>
    <span style={{ color: "#64748b" }}>In 3 days</span>
  </div>
</div>


      {/* LEARNING PROGRESS */}
      <h3 style={{ marginBottom: 16 }}>My Learning Progress</h3>

      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        {mockCourses.map((course) => (
          <div
            key={course.id}
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 600 }}>{course.title}</div>
              <div
                style={{
                  color: "#2f66e6",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {course.progress}%
              </div>
            </div>

            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: "#e5e7eb",
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: `${course.progress}%`,
                  height: "100%",
                  background: "#2f66e6",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#64748b",
              }}
            >
              <span>
                Done: {course.completedLessons} / {course.totalLessons}
              </span>

              <span
                style={{
                  color: "#2f66e6",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Resume →
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
