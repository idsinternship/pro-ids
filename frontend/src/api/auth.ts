import api from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "student" | "instructor";
}

export const login = async (data: LoginPayload) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const register = async (data: RegisterPayload) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/logout");
};

export const me = async () => {
  const res = await api.get("/me");
  return res.data;
};