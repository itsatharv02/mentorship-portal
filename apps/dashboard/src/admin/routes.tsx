import { Navigate, type RouteObject } from "react-router";
import { AdminLayout } from "./layout/admin-layout";
import BookingsPage from "./pages/bookings";
import DashboardPage from "./pages/dashboard";
import MentorDetailsPage from "./pages/mentor-details";
import MentorsPage from "./pages/mentors";
import SettingsPage from "./pages/settings";
import UsersPage from "./pages/users";

export const adminRoutes: RouteObject = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <DashboardPage /> },
    { path: "mentors", element: <MentorsPage /> },
    { path: "mentors/:id", element: <MentorDetailsPage /> },
    { path: "users", element: <UsersPage /> },
    { path: "bookings", element: <BookingsPage /> },
    { path: "settings", element: <SettingsPage /> },
    { path: "*", element: <Navigate to="/admin" replace /> },
  ],
};
