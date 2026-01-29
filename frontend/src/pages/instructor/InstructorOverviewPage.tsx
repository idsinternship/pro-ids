export default function InstructorOverviewPage() {
  return (
    <div>
      {/* PAGE TITLE */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Instructor Overview</h1>
        <p style={{ color: "#64748b" }}>
          Monitor your courses and student performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <StatCard title="Total Students" value="1,248" />
        <StatCard title="Completion Rate" value="82%" />
        <StatCard title="Pass Rate" value="76%" />
        <StatCard title="Revenue" value="$12,430" />
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 24,
        }}
      >
        {/* POPULAR COURSES */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Popular Courses</h3>

          <CourseRow
            title="Fullstack Web Development with React"
            students={540}
            completion="84%"
          />
          <CourseRow
            title="Advanced JavaScript Patterns"
            students={392}
            completion="78%"
          />
          <CourseRow
            title="Intro to TypeScript"
            students={316}
            completion="91%"
          />
        </div>

        {/* RECENT ACTIVITY */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Recent Activity</h3>

          <ActivityItem text="John Doe completed React Fundamentals Quiz" />
          <ActivityItem text="Sarah M. enrolled in Advanced JavaScript" />
          <ActivityItem text="Michael K. earned a course certificate" />
          <ActivityItem text="New review added to TypeScript course" />
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 14, color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>
        {value}
      </div>
    </div>
  );
}

function CourseRow({
  title,
  students,
  completion,
}: {
  title: string;
  students: number;
  completion: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #e5e7eb",
        fontSize: 14,
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ color: "#64748b" }}>{students} students</div>
      </div>

      <div style={{ fontWeight: 600 }}>{completion}</div>
    </div>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: "10px 0",
        borderBottom: "1px solid #e5e7eb",
        fontSize: 14,
        color: "#334155",
      }}
    >
      {text}
    </div>
  );
}
