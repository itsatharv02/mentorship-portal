export const STATS = [
  { key: "users", label: "Total Users", value: "1,248", change: "+12%" },
  { key: "mentors", label: "Total Mentors", value: "86", change: "+8%" },
  { key: "bookings", label: "Total Bookings", value: "320", change: "+24%" },
  {
    key: "revenue",
    label: "Total Revenue",
    value: "₹4,80,000",
    change: "+18%",
  },
];

export const BOOKINGS_OVERVIEW = Array.from({ length: 30 }, (_, index) => ({
  label: `Apr ${index + 1}`,
  bookings: Math.round(12 + index * 0.6 + Math.sin(index / 2.5) * 4),
}));

export const SESSION_TYPES = [
  { name: "Career Guidance", value: 40, color: "var(--chart-2)" },
  { name: "Interview Prep", value: 25, color: "var(--chart-3)" },
  { name: "Resume Review", value: 25, color: "var(--chart-1)" },
  { name: "Others", value: 15, color: "var(--chart-5)" },
];
