import { Navigate, type RouteObject } from "react-router";
import { MenteeLayout } from "./layout/mentee-layout";
import MenteeBookingDetailsPage from "./pages/booking-details";
import MenteeBookingsPage from "./pages/bookings";
import MenteeDashboardPage from "./pages/dashboard";
import MenteeProfilePage from "./pages/profile";

export const menteeRoutes: RouteObject = {
  path: "mentee",
  element: <MenteeLayout />,
  children: [
    { index: true, element: <MenteeDashboardPage /> },
    { path: "bookings", element: <MenteeBookingsPage /> },
    { path: "bookings/:id", element: <MenteeBookingDetailsPage /> },
    { path: "profile", element: <MenteeProfilePage /> },
    { path: "*", element: <Navigate to="/mentee" replace /> },
  ],
};
