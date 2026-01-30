import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function RequireInstructor() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "instructor") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}