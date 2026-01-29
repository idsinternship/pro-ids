import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { apiRequest } from "../api/http";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name || !email || password.length < 6) return;

    setLoading(true);
    setError(null);

    try {
      await apiRequest("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });

      navigate("/login", { replace: true });
    } catch (e: any) {
      setError(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Start learning or teaching in minutes."
    >
      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: 12,
            borderRadius: 12,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <AuthInput label="Full Name" value={name} onChange={setName} />
      <AuthInput
        label="Email Address"
        value={email}
        onChange={setEmail}
      />
      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {/* ROLE SELECT */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600 }}>Account Type</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 8,
            borderRadius: 10,
          }}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>

      <div onClick={handleSubmit}>
        <PrimaryButton disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </PrimaryButton>
      </div>

      <p style={{ marginTop: 24, textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
