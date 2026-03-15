import { createBrowserRouter} from "react-router";
import Home from "./pages/dashboard/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Flags from "./pages/Flags";
import PublicRegister from "./pages/Register";
import ThankYou from "./pages/ThankYou";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <PublicRegister />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },

      {
        path: "settings",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Home />,
      },
      {
        path: "flags",
        element: <Flags />,
      },
    ],
  },
]);
