import { Route, Routes } from "react-router";
import { AdminLayout } from "./layout/admin-layout";
import BookingsPage from "./pages/bookings";
import DashboardPage from "./pages/dashboard";
import MentorDetailsPage from "./pages/mentor-details";
import MentorsPage from "./pages/mentors";
import SettingsPage from "./pages/settings";
import UsersPage from "./pages/users";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="mentors" element={<MentorsPage />} />
        <Route path="mentors/:id" element={<MentorDetailsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
