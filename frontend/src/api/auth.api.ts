import axios from "axios";

const API = "https://stunning-space-waddle-wrp4wxpqq5rc54r7-8000.app.github.dev/api";

export const loginApi = async (email: string, password: string) => {
  const { data } = await axios.post(`${API}/login`, { email, password });
  return data.data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
  role: "student" | "instructor"
) => {
  const { data } = await axios.post(`${API}/register`, {
    name,
    email,
    password,
    role,
  });
  return data.data;
};

export const meApi = async () => {
  const { data } = await axios.get(`${API}/me`);
  return data.data;
};

export const logoutApi = async () => {
  await axios.post(`${API}/logout`);
};