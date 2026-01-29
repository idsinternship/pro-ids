type Props = {
  title: string;
  course: string;
  date: string;
};

export default function CertificateCard({ title, course, date }: Props) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>🎓</div>

      <div style={{ fontWeight: 700, marginBottom: 4 }}>
        {title}
      </div>

      <div style={{ fontSize: 14, color: "#64748b" }}>
        {course}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#94a3b8",
          marginTop: 8,
        }}
      >
        Issued on {date}
      </div>

      <button
        style={{
          marginTop: 14,
          background: "#2f66e6",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
