import { Navigate, useRoutes } from "react-router";
import { adminRoutes } from "./admin/routes";
import HomePage from "./home/home-page";
import { menteeRoutes } from "./mentee/routes";
import { mentorRoutes } from "./mentor/routes";

export default function App() {
  return useRoutes([
    { path: "/", element: <HomePage /> },
    adminRoutes,
    mentorRoutes,
    menteeRoutes,
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
