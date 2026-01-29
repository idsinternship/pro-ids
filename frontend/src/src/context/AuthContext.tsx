import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type UserRole = "STUDENT" | "INSTRUCTOR";

type User = {
  id: string;
  name: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  loginAsStudent: () => void;
  loginAsInstructor: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // MOCK LOGIN — replace later with backend
  function loginAsStudent() {
    setUser({
      id: "u_student",
      name: "Student User",
      role: "STUDENT",
    });
  }

  function loginAsInstructor() {
    setUser({
      id: "u_instructor",
      name: "Instructor User",
      role: "INSTRUCTOR",
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loginAsStudent, loginAsInstructor, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
