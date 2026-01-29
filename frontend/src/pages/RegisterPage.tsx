import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import RoleToggle from "../components/auth/RoleToggle";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"student" | "instructor">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameError = name && name.length < 2 ? "Name is too short" : "";
  const emailError =
    email && !email.includes("@") ? "Enter a valid email" : "";
  const passwordError =
    password && password.length < 6 ? "Min 6 characters" : "";

  const isValid =
    name && email && password && !nameError && !emailError && !passwordError;

  function handleSubmit() {
    if (!isValid) return;

    // TEMP: simulate successful registration
    navigate("/");
  }

  return (
    <AuthLayout
      title="Start Your Learning Journey."
      description="Join thousands of students and instructors. Master new skills with AI-powered personalized learning."
    >
      <h2 style={{ marginBottom: 8 }}>Create Account</h2>
      <p style={{ color: "#64748b", marginBottom: 24 }}>
        Please enter your details below.
      </p>

      <RoleToggle value={role} onChange={setRole} />

      <AuthInput
        label="Full Name"
        placeholder="John Doe"
        value={name}
        onChange={setName}
        error={nameError}
      />

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
        <PrimaryButton disabled={!isValid}>Create Account</PrimaryButton>
      </div>

      <p style={{ marginTop: 32, textAlign: "center", color: "#64748b" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#2f66e6", fontWeight: 600 }}>
          Log in here
        </Link>
      </p>
    </AuthLayout>
  );
}
