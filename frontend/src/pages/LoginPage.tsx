import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const emailError =
    email && !email.includes("@") ? "Enter a valid email address" : "";
  const passwordError =
    password && password.length < 6 ? "Password too short" : "";

  const isValid = !!email && !!password && !emailError && !passwordError;

  const params = new URLSearchParams(location.search);
  const routeError = params.get("error");

  async function handleSubmit() {
    if (!isValid || loading) return;

    setLoading(true);
    setApiError(null);

    try {
      await login(email, password);

      // Redirect based on backend role
      if (user?.role === "instructor") {
        navigate("/instructor/overview", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (e: any) {
      setApiError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back to Excellence."
      description="Dive back into your courses and pick up right where you left off."
    >
      {/* ROUTE ERRORS */}
      {routeError && (
        <div
          style={{
            background: "#fef3c7",
            color: "#92400e",
            padding: 12,
            borderRadius: 12,
            fontSize: 14,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {routeError === "signin_required" &&
            "Please sign in to continue."}
          {routeError === "not_instructor" &&
            "This area is restricted to instructors only."}
        </div>
      )}

      {/* API ERROR */}
      {apiError && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: 12,
            borderRadius: 12,
            fontSize: 14,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {apiError}
        </div>
      )}

      <h2 style={{ marginBottom: 8 }}>Sign In</h2>

      <AuthInput
        label="Email Address"
        placeholder="name@company.com"
        value={email}
        onChange={setEmail}
        error={emailError}
      />

      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={passwordError}
      />

      <div onClick={handleSubmit}>
        <PrimaryButton disabled={!isValid || loading}>
          {loading ? "Signing in..." : "Sign In"}
        </PrimaryButton>
      </div>

      <p style={{ marginTop: 32, textAlign: "center", color: "#64748b" }}>
        Don’t have an account?{" "}
        <Link
          to="/register"
          style={{ color: "#2f66e6", fontWeight: 600 }}
        >
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
}
