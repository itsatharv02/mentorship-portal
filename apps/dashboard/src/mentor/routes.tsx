import { Navigate, type RouteObject } from "react-router";
import { MentorLayout } from "./layout/mentor-layout";
import MentorAvailabilityPage from "./pages/availability";
import MentorBookingsPage from "./pages/bookings";
import MentorDashboardPage from "./pages/dashboard";
import MentorEarningsPage from "./pages/earnings";
import MentorProfilePage from "./pages/profile";
import MentorReviewsPage from "./pages/reviews";

export const mentorRoutes: RouteObject = {
  path: "mentor",
  element: <MentorLayout />,
  children: [
    { index: true, element: <MentorDashboardPage /> },
    { path: "bookings", element: <MentorBookingsPage /> },
    { path: "availability", element: <MentorAvailabilityPage /> },
    { path: "earnings", element: <MentorEarningsPage /> },
    { path: "reviews", element: <MentorReviewsPage /> },
    { path: "profile", element: <MentorProfilePage /> },
    { path: "*", element: <Navigate to="/mentor" replace /> },
  ],
};
