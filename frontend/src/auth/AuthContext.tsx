import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./auth.context";
import type { User, UserRole } from "./auth.types";
import {
  loginApi,
  registerApi,
  meApi,
  logoutApi,
} from "../api/auth.api";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Calculate isAuthenticated
  const isAuthenticated = !!token && !!user;

  // Attach token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
    }
  }, [token]);

  // Global 401 handler
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401) {
          await hardLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Hydrate user
  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await meApi();
        setUser(me);
      } catch {
        await hardLogout();
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    const res = await registerApi(name, email, password, role);
    setToken(res.token);
    setUser(res.user);
  };

  const hardLogout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common.Authorization;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      await hardLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        token, 
        loading, 
        isAuthenticated,
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}