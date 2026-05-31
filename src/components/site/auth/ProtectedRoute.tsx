import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";



interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();  // ← user au lieu de admin

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ width: 36, height: 36, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}