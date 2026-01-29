import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className="avatar"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen((v) => !v)}
        >
          <img src="https://i.pravatar.cc/100?img=32" alt="avatar" />
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 48,
              width: 220,
              background: "white",
              borderRadius: 14,
              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              padding: 8,
              zIndex: 20,
            }}
          >
            <button
              onClick={() => {
                setShowPasswordModal(true);
                setOpen(false);
              }}
              style={menuItemStyle}
            >
              🔒 Change Password
            </button>

            <button style={{ ...menuItemStyle, color: "#ef4444" }}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </>
  );
}

const menuItemStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  background: "transparent",
  border: "none",
  textAlign: "left",
  fontSize: 14,
  cursor: "pointer",
};
