export default function InstructorSettingsPage() {
  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>
        Platform Settings
      </h1>

      <Section title="Profile">
        <Input label="Full Name" value="Instructor User" />
        <Input label="Email" value="instructor@example.com" />
      </Section>

      <Section title="Security">
        <Input label="Current Password" type="password" />
        <Input label="New Password" type="password" />
        <button
          style={{
            marginTop: 12,
            background: "#2f66e6",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Update Password
        </button>
      </Section>

      <Section title="Preferences">
        <Toggle label="Email notifications" />
        <Toggle label="Weekly performance reports" />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <h3 style={{ marginBottom: 16 }}>{title}</h3>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  type = "text",
}: {
  label: string;
  value?: string;
  type?: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 14 }}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          marginTop: 4,
        }}
      />
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        fontSize: 14,
      }}
    >
      <span>{label}</span>
      <input type="checkbox" defaultChecked />
    </div>
  );
}
