import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-black/60 backdrop-blur-xl border-b border-zinc-800">
      <div className="text-xl font-bold tracking-wider text-cyan-400">
        PRO•IDS
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">
            {user.name} · {user.role}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}