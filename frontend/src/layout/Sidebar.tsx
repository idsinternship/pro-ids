import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="badge">IDS</div>
        <span>Academy</span>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          🏠 My Learning
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          🔍 Course Catalog
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          📈 My Progress
        </NavLink>

        <NavLink
          to="/certificates"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          🎓 Certificates
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">🔁 Switch to Instructor</div>
        <div className="nav-item logout">🚪 Logout Account</div>
      </div>
    </aside>
  );
}
