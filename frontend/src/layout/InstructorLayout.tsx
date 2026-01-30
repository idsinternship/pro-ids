import { NavLink, Outlet } from "react-router-dom";

export default function InstructorLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDENAV */}
      <aside
        style={{
          width: 240,
          padding: 20,
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Instructor</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NavLink to="/instructor/overview">Overview</NavLink>

          <NavLink to="/instructor/courses">My Courses</NavLink>

          {/* ✅ THIS IS THE MISSING LINK */}
          <NavLink to="/instructor/courses/new">
            + Create Course
          </NavLink>

          <NavLink to="/instructor/analytics">Analytics</NavLink>

          <NavLink to="/instructor/settings">Settings</NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}