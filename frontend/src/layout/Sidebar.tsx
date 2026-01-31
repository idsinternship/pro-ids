import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface NavItem {
  label: string;
  path: string;
}

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const studentNav: NavItem[] = [
    { label: "Dashboard", path: "/" },
    { label: "My Courses", path: "/my-learning" },
  ];

  const instructorNav: NavItem[] = [
    { label: "Dashboard", path: "/" },
    { label: "Create Course", path: "/instructor/courses/create" },
    { label: "Analytics", path: "/instructor/analytics" },
  ];

  const navItems = user.role === "student" ? studentNav : instructorNav;

  return (
    <aside className="w-64 h-screen bg-black/70 backdrop-blur-xl border-r border-zinc-800 flex flex-col">
      <div className="p-6 text-2xl font-extrabold tracking-widest text-cyan-400">
        PRO•IDS
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              block px-4 py-3 rounded-xl text-sm font-medium transition
              ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }
            `
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 text-xs text-zinc-600 border-t border-zinc-800">
        Logged in as <span className="text-zinc-400">{user.role}</span>
      </div>
    </aside>
  );
}