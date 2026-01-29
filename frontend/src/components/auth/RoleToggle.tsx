type Props = {
  value: "student" | "instructor";
  onChange: (v: "student" | "instructor") => void;
};

export default function RoleToggle({ value, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
      {[
        { key: "student", label: "🎓 Student" },
        { key: "instructor", label: "🧑‍🏫 Instructor" },
      ].map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key as any)}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 14,
            border:
              value === r.key
                ? "2px solid #2f66e6"
                : "1px solid #e5e7eb",
            background: value === r.key ? "#eef3ff" : "white",
            fontWeight: 600,
          }}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
