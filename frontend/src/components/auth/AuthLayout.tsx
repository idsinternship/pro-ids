import type { ReactNode } from "react";
import "./auth-layout.css";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function AuthLayout({ title, description, children }: Props) {
  return (
    <div className="auth-root">
      <div className="auth-card">
        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="brand">
            <div className="logo">IDS</div>
            <span>Academy</span>
          </div>

          <h1>{title}</h1>
          <p>{description}</p>

          <div className="trusted">
            <div className="avatars">
              <span>👩🏽‍💻</span>
              <span>👨🏻‍🎓</span>
              <span>👩🏼‍🏫</span>
              <span>👨🏿‍💼</span>
              <span className="more">+2k</span>
            </div>
            <span>Trusted by 2,000+ ambitious learners</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">{children}</div>
      </div>
    </div>
  );
}
