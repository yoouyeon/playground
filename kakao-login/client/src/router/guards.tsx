import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

// 1. 인증된 사용자만 접근할 수 있는 경로를 보호하는 가드
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// 2. 인증되지 않은 사용자만 접근할 수 있는 경로를 보호하는 가드
export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // 인증된 사용자는 홈 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

/**
 * 현재 경로를 state로 저장해서 로그인 후 원래 페이지로 돌아갈 수 있게 할 수도 있다고 함 (아직 안해봄)
 */
