import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div
      style={{
        background: "white",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: user.role === "INSTRUCTOR" ? "#7c3aed" : "#2563eb",
        }}
      >
        {user.role} MODE
      </div>

      <div style={{ position: "relative" }}>
        <div
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {user.name[0]}
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 44,
              background: "white",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              width: 180,
              padding: 8,
              zIndex: 50,
            }}
          >
            <div
              style={{
                padding: "8px 12px",
                fontSize: 14,
                color: "#64748b",
              }}
            >
              {user.name}
            </div>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 8,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
