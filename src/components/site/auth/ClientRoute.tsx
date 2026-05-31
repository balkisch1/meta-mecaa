// src/components/site/auth/ClientRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ClientRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a tiny spinner

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "client") return <Navigate to="/" replace />;

  return <>{children}</>;
}