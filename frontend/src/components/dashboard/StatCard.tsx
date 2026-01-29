type Props = {
  icon: string;
  label: string;
  value: string | number;
  bg: string;
};

export default function StatCard({ icon, label, value, bg }: Props) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 20,
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {icon}
      </div>

      <div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
        <div style={{ color: "#64748b", fontSize: 14 }}>{label}</div>
      </div>
    </div>
  );
}
