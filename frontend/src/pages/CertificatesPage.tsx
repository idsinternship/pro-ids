// src/pages/CertificatesPage.tsx
import AppLayout from "../layout/AppLayout";
import CertificateCard from "../components/CertificateCard";

export default function CertificatesPage() {
  const certificates = JSON.parse(
    localStorage.getItem("certificates") || "[]"
  );

  return (
    <AppLayout title="Certificates">
      <h2 style={{ marginBottom: 24 }}>Your Certificates</h2>

      {certificates.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: 40,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          No certificates yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {certificates.map((c: any) => (
            <CertificateCard key={c.id} {...c} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
