import { useNavigate } from "react-router-dom";

export default function InstructorCoursesPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>My Courses</h1>
          <p style={{ color: "#64748b" }}>
            Manage and edit your published courses
          </p>
        </div>

        <button
          onClick={() => navigate("/instructor/courses/new")}
          style={{
            background: "#2f66e6",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: 12,
            fontWeight: 600,
          }}
        >
          + Create Course
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        <CourseCard
          id="course-1"
          title="Fullstack Web Development with React"
          students={540}
          lessons={18}
        />
        <CourseCard
          id="course-2"
          title="Advanced JavaScript Patterns"
          students={392}
          lessons={14}
        />
        <CourseCard
          id="course-3"
          title="Intro to TypeScript"
          students={316}
          lessons={10}
        />
      </div>
    </div>
  );
}

function CourseCard({
  id,
  title,
  students,
  lessons,
}: {
  id: string;
  title: string;
  students: number;
  lessons: number;
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{title}</h3>

      <div style={{ fontSize: 14, color: "#64748b", marginBottom: 16 }}>
        {students} students · {lessons} lessons
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() =>
            navigate(`/instructor/courses/${id}/edit`)
          }
          style={{
            flex: 1,
            background: "#e5e7eb",
            border: "none",
            padding: "10px 0",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Edit
        </button>

        <button
          style={{
            flex: 1,
            background: "#fee2e2",
            color: "#991b1b",
            border: "none",
            padding: "10px 0",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
