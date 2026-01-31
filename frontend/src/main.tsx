
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
// Change this import to use AuthContext.tsx instead of AuthProvider.tsx
import { AuthProvider } from "./auth/AuthContext";

/* ===== GLOBAL STYLES ===== */
import "./index.css";
import "./theme/theme.css";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
