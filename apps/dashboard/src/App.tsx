import { Navigate, Route, Routes } from "react-router";
import { AdminLayout } from "./layout/admin-layout";
import { MentorLayout } from "./layout/mentor-layout";
import { MenteeLayout } from "./layout/mentee-layout";
import BookingsPage from "./pages/bookings";
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import MentorAvailabilityPage from "./pages/mentor-availability";
import MentorBookingsPage from "./pages/mentor-bookings";
import MentorDashboardPage from "./pages/mentor-dashboard";
import MentorDetailsPage from "./pages/mentor-details";
import MentorEarningsPage from "./pages/mentor-earnings";
import MentorProfilePage from "./pages/mentor-profile";
import MentorReviewsPage from "./pages/mentor-reviews";
import MentorsPage from "./pages/mentors";
import MenteeBookingDetailsPage from "./pages/mentee-booking-details";
import MenteeBookingsPage from "./pages/mentee-bookings";
import MenteeDashboardPage from "./pages/mentee-dashboard";
import MenteeProfilePage from "./pages/mentee-profile";
import SettingsPage from "./pages/settings";
import UsersPage from "./pages/users";

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="mentors" element={<MentorsPage />} />
        <Route path="mentors/:id" element={<MentorDetailsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      <Route path="mentor" element={<MentorLayout />}>
        <Route index element={<MentorDashboardPage />} />
        <Route path="bookings" element={<MentorBookingsPage />} />
        <Route path="availability" element={<MentorAvailabilityPage />} />
        <Route path="earnings" element={<MentorEarningsPage />} />
        <Route path="reviews" element={<MentorReviewsPage />} />
        <Route path="profile" element={<MentorProfilePage />} />
        <Route path="*" element={<Navigate to="/mentor" replace />} />
      </Route>

      <Route path="mentee" element={<MenteeLayout />}>
        <Route index element={<MenteeDashboardPage />} />
        <Route path="bookings" element={<MenteeBookingsPage />} />
        <Route path="bookings/:id" element={<MenteeBookingDetailsPage />} />
        <Route path="profile" element={<MenteeProfilePage />} />
        <Route path="*" element={<Navigate to="/mentee" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
