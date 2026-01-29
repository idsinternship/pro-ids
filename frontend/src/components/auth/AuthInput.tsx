import type { ReactNode } from "react";

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  rightLink?: ReactNode;
};

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  error,
  onChange,
  rightLink,
}: Props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <label style={{ fontSize: 12, letterSpacing: 1, color: "#64748b" }}>
          {label.toUpperCase()}
        </label>
        {rightLink}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          height: 54,
          borderRadius: 14,
          border: error ? "1px solid #ef4444" : "1px solid #e5e7eb",
          padding: "0 16px",
          fontSize: 15,
          outline: "none",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = "1px solid #2f66e6";
          e.currentTarget.style.boxShadow =
            "0 0 0 3px rgba(47,102,230,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      {error && (
        <div style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>
          {error}
        </div>
      )}
    </div>
  );
}
