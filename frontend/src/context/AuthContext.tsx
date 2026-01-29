import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiRequest } from "../api/http";

type Role = "student" | "instructor" | "admin";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const role = user?.role ?? null;
  const isAuthenticated = !!user;

  // 🔁 restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    apiRequest("/me")
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  async function login(email: string, password: string) {
    const res = await apiRequest("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", res.token);
    setUser(res.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
