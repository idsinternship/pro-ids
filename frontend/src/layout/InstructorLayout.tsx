import { Outlet, NavLink } from "react-router-dom";

export default function InstructorLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: 260,
          background: "#fff",
          padding: 20,
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 32 }}>
          IDS Academy
        </div>

        <NavItem to="/instructor/overview" label="Overview" />
        <NavItem to="/instructor/courses" label="My Courses" />
        <NavItem to="/instructor/analytics" label="Analytics" />
        <NavItem to="/instructor/settings" label="Platform Settings" />
      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          background: "#f8fafc",
          padding: 32,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "block",
        padding: "12px 16px",
        borderRadius: 12,
        marginBottom: 8,
        fontWeight: 600,
        textDecoration: "none",
        background: isActive ? "#2f66e6" : "transparent",
        color: isActive ? "#fff" : "#0f172a",
      })}
    >
      {label}
    </NavLink>
  );
}
