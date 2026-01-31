import { useAuth } from "./useAuth";

export default function DebugAuth() {
  const auth = useAuth();
  
  console.log("Auth state:", {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    isAuthenticated: auth.isAuthenticated
  });
  
  return (
    <div style={{ padding: "20px", background: "#000", color: "#fff" }}>
      <h2>Auth Debug Info</h2>
      <pre>{JSON.stringify({
        user: auth.user,
        token: auth.token ? `${auth.token.substring(0, 20)}...` : "null",
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated
      }, null, 2)}</pre>
    </div>
  );
}