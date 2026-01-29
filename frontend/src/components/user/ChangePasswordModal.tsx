import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function ChangePasswordModal({ onClose }: Props) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: 420,
          background: "white",
          borderRadius: 18,
          padding: 28,
        }}
      >
        <h3 style={{ marginBottom: 6 }}>Change Password</h3>
        <p style={{ color: "#64748b", marginBottom: 24 }}>
          Enter your current password and a new one.
        </p>

        <input
          type="password"
          placeholder="Current password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="New password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 20,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#64748b",
              fontSize: 14,
            }}
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            style={{
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
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 46,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  padding: "0 14px",
  marginBottom: 14,
};
