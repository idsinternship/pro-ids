// src/components/CertificateCard.tsx
import { Link } from "react-router-dom";

type Props = {
  id: string;
  courseTitle: string;
  issuedAt: string;
};

export default function CertificateCard({
  id,
  courseTitle,
  issuedAt,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{courseTitle}</h3>
      <div style={{ color: "#64748b", fontSize: 14 }}>
        Issued on {issuedAt}
      </div>

      <Link to={`/student/certificates/${id}`}>
        <button
          style={{
            marginTop: 12,
            background: "#2f66e6",
            color: "white",
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            fontWeight: 600,
          }}
        >
          View Certificate
        </button>
      </Link>
    </div>
  );
}
