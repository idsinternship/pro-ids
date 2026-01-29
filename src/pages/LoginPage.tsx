import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useAuth } from "../src/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAsStudent, loginAsInstructor } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError =
    email && !email.includes("@") ? "Enter a valid email address" : "";
  const passwordError =
    password && password.length < 6 ? "Password too short" : "";

  const isValid = email && password && !emailError && !passwordError;

  const params = new URLSearchParams(location.search);
  const error = params.get("error");

  function handleSubmit() {
    if (!isValid) return;

    // DEFAULT: login as student
    loginAsStudent();
    navigate("/");
  }

  function handleInstructorLogin() {
    loginAsInstructor();
    navigate("/instructor/overview");
  }

  return (
    <AuthLayout
      title="Welcome Back to Excellence."
      description="Dive back into your courses and pick up right where you left off. Your next big achievement is waiting."
    >
      {/* WARNING BANNER */}
      {error && (
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
          {error === "signin_required" &&
            "Please sign in to continue."}
          {error === "not_instructor" &&
            "This area is restricted to instructors only."}
        </div>
      )}

      <h2 style={{ marginBottom: 8 }}>Sign In</h2>
      <p style={{ color: "#64748b", marginBottom: 32 }}>
        Please enter your details below.
      </p>

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
        rightLink={
          <a href="#" style={{ fontSize: 12, color: "#2f66e6" }}>
            FORGOT?
          </a>
        }
      />

      <div onClick={handleSubmit}>
        <PrimaryButton disabled={!isValid}>
          Sign In
        </PrimaryButton>
      </div>

      {/* DEV INSTRUCTOR LOGIN */}
      <button
        onClick={handleInstructorLogin}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "12px",
          borderRadius: 12,
          background: "#7c3aed",
          color: "white",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
        }}
      >
        Login as Instructor (Dev)
      </button>

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
