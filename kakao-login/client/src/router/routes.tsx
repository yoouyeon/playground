import type { RouteObject } from "react-router";
import { ProtectedRoute, PublicRoute } from "./guards";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../pages/login";

export const routes: RouteObject[] = [
  // 로그인한 사용자만 접근 가능
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  // 로그인하지 않은 사용자만 접근 가능
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Layout />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];
