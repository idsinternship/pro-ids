import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-wide">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}

        <input
          className="w-full mb-3 p-3 rounded-lg bg-black/50 border border-zinc-700 focus:outline-none"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <div className="flex gap-3 mb-6">
          {(["student", "instructor"] as const).map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 p-3 rounded-lg border ${
                role === r
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-zinc-700"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="w-full p-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition">
          Register
        </button>
      </form>
    </div>
  );
}