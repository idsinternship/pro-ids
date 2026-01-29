import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../src/context/AuthContext";

export default function RequireInstructor({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login?error=signin_required"
        replace
      />
    );
  }

  if (user.role !== "INSTRUCTOR") {
    return (
      <Navigate
        to="/login?error=not_instructor"
        replace
      />
    );
  }

  return <>{children}</>;
}
