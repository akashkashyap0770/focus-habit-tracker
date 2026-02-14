import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Landing, Login, Signup, DailyLog, History, Analytics } from "./pages";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const RedirectIfLoggedIn = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard/daily-log" replace />;
  return children;
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },

    {
      path: "/login",
      element: (
        <RedirectIfLoggedIn>
          <Login />
        </RedirectIfLoggedIn>
      ),
    },

    {
      path: "/signup",
      element: (
        <RedirectIfLoggedIn>
          <Signup />
        </RedirectIfLoggedIn>
      ),
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Landing />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="daily-log" replace />,
        },
        {
          path: "daily-log",
          element: <DailyLog />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/dashboard/daily-log" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}
