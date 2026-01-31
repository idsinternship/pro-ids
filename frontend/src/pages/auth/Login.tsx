import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-wide">
          Welcome Back
        </h1>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <input
          className="w-full mb-3 p-3 rounded-lg bg-black/50 border border-zinc-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded-lg bg-black/50 border border-zinc-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full p-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition">
          Login
        </button>
      </form>
    </div>
  );
}