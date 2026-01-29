import AppLayout from "../layout/AppLayout";

const mockProgress = {
  overall: 42,
  courses: [
    {
      id: 1,
      title: "Fullstack Web Development with React",
      progress: 35,
    },
    {
      id: 2,
      title: "Introduction to Data Science",
      progress: 50,
    },
  ],
  quizzes: [
    {
      id: 1,
      title: "React Basics Quiz",
      score: "80%",
      date: "Jan 12, 2026",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      score: "76%",
      date: "Jan 18, 2026",
    },
  ],
};

export default function MyProgressPage() {
  return (
    <AppLayout title="My Progress">
      {/* HERO */}
      <div
        style={{
          background: "#2f66e6",
          color: "white",
          borderRadius: 20,
          padding: 32,
          marginBottom: 32,
        }}
      >
        <h2 style={{ marginBottom: 6 }}>Overall Progress</h2>
        <div style={{ fontSize: 36, fontWeight: 800 }}>
          {mockProgress.overall}%
        </div>

        <div
          style={{
            height: 10,
            background: "rgba(255,255,255,0.3)",
            borderRadius: 999,
            marginTop: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${mockProgress.overall}%`,
              height: "100%",
              background: "white",
            }}
          />
        </div>
      </div>

      {/* COURSES */}
      <h3 style={{ marginBottom: 12 }}>Course Progress</h3>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
        }}
      >
        {mockProgress.courses.map((course) => (
          <div
            key={course.id}
            style={{
              padding: "14px 0",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontWeight: 600 }}>{course.title}</span>
              <span style={{ color: "#2f66e6", fontWeight: 600 }}>
                {course.progress}%
              </span>
            </div>

            <div
              style={{
                height: 6,
                background: "#e5e7eb",
                borderRadius: 999,
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
          </div>
        ))}
      </div>

      {/* QUIZ HISTORY */}
      <h3 style={{ marginBottom: 12 }}>Quiz History</h3>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
        }}
      >
        {mockProgress.quizzes.map((quiz) => (
          <div
            key={quiz.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: 14,
            }}
          >
            <span>{quiz.title}</span>
            <span>{quiz.date}</span>
            <span style={{ fontWeight: 700 }}>{quiz.score}</span>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
