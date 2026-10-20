import { MENTORS, type Mentor } from "./mentors";

export const CURRENT_MENTOR: Mentor =
  MENTORS.find((mentor) => mentor.id === "arjun-mehta") ?? MENTORS[0]!;

export type SessionStatus = "upcoming" | "completed" | "cancelled";

export type MentorSession = {
  id: string;
  learner: string;
  sessionType: string;
  dateTime: string;
  durationMins: number;
  amount: number;
  status: SessionStatus;
  joinable?: boolean;
};

export const MENTOR_SESSIONS: MentorSession[] = [
  {
    id: "s-1",
    learner: "Rahul Sharma",
    sessionType: "Career Guidance",
    dateTime: "2024-04-16T11:00:00",
    durationMins: 60,
    amount: 1500,
    status: "upcoming",
    joinable: true,
  },
  {
    id: "s-2",
    learner: "Neha Verma",
    sessionType: "Interview Prep",
    dateTime: "2024-04-17T14:00:00",
    durationMins: 60,
    amount: 1500,
    status: "upcoming",
  },
  {
    id: "s-3",
    learner: "Vikram Singh",
    sessionType: "Resume Review",
    dateTime: "2024-04-18T17:00:00",
    durationMins: 60,
    amount: 1000,
    status: "upcoming",
  },
  {
    id: "s-4",
    learner: "Ananya Patel",
    sessionType: "Career Guidance",
    dateTime: "2024-04-19T10:00:00",
    durationMins: 60,
    amount: 1500,
    status: "upcoming",
  },
  {
    id: "s-5",
    learner: "Rohit Kumar",
    sessionType: "Interview Prep",
    dateTime: "2024-04-20T16:00:00",
    durationMins: 60,
    amount: 1500,
    status: "upcoming",
  },
  {
    id: "s-6",
    learner: "Meera Nair",
    sessionType: "Career Guidance",
    dateTime: "2024-04-22T10:30:00",
    durationMins: 60,
    amount: 1500,
    status: "upcoming",
  },
  {
    id: "s-7",
    learner: "Aditya Rao",
    sessionType: "Resume Review",
    dateTime: "2024-04-12T15:00:00",
    durationMins: 60,
    amount: 1000,
    status: "completed",
  },
  {
    id: "s-8",
    learner: "Sana Khan",
    sessionType: "Interview Prep",
    dateTime: "2024-04-11T11:00:00",
    durationMins: 60,
    amount: 1500,
    status: "completed",
  },
  {
    id: "s-9",
    learner: "Kabir Joshi",
    sessionType: "Career Guidance",
    dateTime: "2024-04-10T18:00:00",
    durationMins: 60,
    amount: 1500,
    status: "completed",
  },
  {
    id: "s-10",
    learner: "Isha Menon",
    sessionType: "Career Guidance",
    dateTime: "2024-04-09T10:00:00",
    durationMins: 60,
    amount: 1500,
    status: "completed",
  },
  {
    id: "s-11",
    learner: "Dev Malhotra",
    sessionType: "Resume Review",
    dateTime: "2024-04-08T13:00:00",
    durationMins: 60,
    amount: 1000,
    status: "completed",
  },
  {
    id: "s-12",
    learner: "Tanvi Shah",
    sessionType: "Interview Prep",
    dateTime: "2024-04-06T16:00:00",
    durationMins: 60,
    amount: 1500,
    status: "completed",
  },
  {
    id: "s-13",
    learner: "Nikhil Das",
    sessionType: "Career Guidance",
    dateTime: "2024-04-04T12:00:00",
    durationMins: 60,
    amount: 1500,
    status: "completed",
  },
  {
    id: "s-14",
    learner: "Riya Kapoor",
    sessionType: "Interview Prep",
    dateTime: "2024-04-02T10:00:00",
    durationMins: 60,
    amount: 1500,
    status: "completed",
  },
  {
    id: "s-15",
    learner: "Yash Bansal",
    sessionType: "Career Guidance",
    dateTime: "2024-04-13T11:00:00",
    durationMins: 60,
    amount: 1500,
    status: "cancelled",
  },
  {
    id: "s-16",
    learner: "Pooja Iyer",
    sessionType: "Resume Review",
    dateTime: "2024-04-07T14:00:00",
    durationMins: 60,
    amount: 1000,
    status: "cancelled",
  },
  {
    id: "s-17",
    learner: "Siddharth Jain",
    sessionType: "Interview Prep",
    dateTime: "2024-04-03T17:00:00",
    durationMins: 60,
    amount: 1500,
    status: "cancelled",
  },
];

export const MENTOR_STATS = {
  totalBookings: { value: "32", change: "+12%" },
  totalEarnings: { value: "₹48,000", change: "+18%" },
  upcomingSessions: {
    value: String(
      MENTOR_SESSIONS.filter((s) => s.status === "upcoming").length,
    ),
  },
  averageRating: { value: "4.9", note: "Based on 86 reviews" },
};

export const EARNINGS_MONTHLY = [
  { month: "Nov", earnings: 8000 },
  { month: "Dec", earnings: 12500 },
  { month: "Jan", earnings: 16000 },
  { month: "Feb", earnings: 22000 },
  { month: "Mar", earnings: 30000 },
  { month: "Apr", earnings: 36000 },
];

export const EARNINGS_BREAKDOWN = [
  { name: "Career Guidance", value: 40, color: "var(--chart-2)" },
  { name: "Interview Prep", value: 25, color: "var(--chart-3)" },
  { name: "Resume Review", value: 20, color: "var(--chart-1)" },
  { name: "Others", value: 15, color: "var(--chart-5)" },
];

export const EARNINGS_STATS = [
  {
    key: "earnings",
    label: "Total Earnings",
    value: "₹48,000",
    change: "+18%",
  },
  { key: "sessions", label: "Total Sessions", value: "32", change: "+12%" },
  {
    key: "average",
    label: "Average Earnings",
    value: "₹1,500",
    note: "per session",
  },
  {
    key: "payout",
    label: "Pending Payout",
    value: "₹12,000",
    note: "Next payout on Apr 30",
  },
];
