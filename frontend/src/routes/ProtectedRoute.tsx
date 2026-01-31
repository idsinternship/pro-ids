import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface Props {
  allow?: Array<"student" | "instructor">;
}

export default function ProtectedRoute({ allow }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-zinc-400">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allow && !allow.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}