export default function InstructorAnalyticsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>
        Analytics
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            height: 260,
          }}
        >
          <h3>Student Engagement</h3>
          <div
            style={{
              marginTop: 20,
              height: 160,
              background: "#f1f5f9",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
            }}
          >
            Line Chart Placeholder
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            height: 260,
          }}
        >
          <h3>Quiz Pass Rate</h3>
          <div
            style={{
              marginTop: 20,
              height: 160,
              background: "#f1f5f9",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            76%
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h3 style={{ marginBottom: 16 }}>Course Performance</h3>

        <TableRow
          title="Fullstack React"
          students={540}
          completion="84%"
        />
        <TableRow
          title="Advanced JavaScript"
          students={392}
          completion="78%"
        />
        <TableRow
          title="TypeScript"
          students={316}
          completion="91%"
        />
      </div>
    </div>
  );
}

function TableRow({
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
      <div>{title}</div>
      <div>{students}</div>
      <div>{completion}</div>
    </div>
  );
}
