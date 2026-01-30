/* eslint-disable react-refresh/only-export-components */


import { createContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "instructor";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "student" | "instructor"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await authApi.me();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "student" | "instructor"
  ) => {
    const res = await authApi.register({
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}