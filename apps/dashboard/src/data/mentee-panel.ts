import { MENTORS, type Mentor } from "./mentors";

export const CURRENT_MENTEE = {
  name: "Rohit Sharma",
  email: "rohit.sharma@gmail.com",
  location: "Bangalore, India",
  photo: "https://randomuser.me/api/portraits/men/41.jpg",
  bio: "I'm a software developer passionate about learning new skills and growing my career in tech. Looking to connect with experienced mentors for guidance and advice.",
  interests: [
    "Software Engineering",
    "System Design",
    "Career Growth",
    "Product Management",
  ],
  sessionMode: "google-meet",
  emailNotifications: true,
  reviewsGiven: 4,
};

export const SESSION_MODES = [
  { value: "google-meet", label: "Online (Google Meet)" },
  { value: "zoom", label: "Online (Zoom)" },
  { value: "phone", label: "Phone call" },
];

export type MenteeBookingStatus = "upcoming" | "completed" | "cancelled";

export type MenteeBooking = {
  id: string;
  mentor: Mentor;
  sessionType: string;
  dateTime: string;
  durationMins: number;
  fee: number;
  status: MenteeBookingStatus;
  joinable?: boolean;
};

function mentorById(id: string): Mentor {
  const mentor = MENTORS.find((item) => item.id === id);
  if (!mentor) throw new Error(`Unknown mentor: ${id}`);
  return mentor;
}

type RawBooking = Omit<MenteeBooking, "mentor"> & { mentorId: string };

const RAW_BOOKINGS: RawBooking[] = [
  {
    id: "m-1",
    mentorId: "arjun-mehta",
    sessionType: "Career Guidance",
    dateTime: "2024-04-16T11:00:00",
    durationMins: 60,
    fee: 1500,
    status: "upcoming",
    joinable: true,
  },
  {
    id: "m-2",
    mentorId: "priya-sharma",
    sessionType: "Interview Prep",
    dateTime: "2024-04-18T14:00:00",
    durationMins: 60,
    fee: 1200,
    status: "upcoming",
  },
  {
    id: "m-3",
    mentorId: "vikram-rao",
    sessionType: "Resume Review",
    dateTime: "2024-04-08T16:00:00",
    durationMins: 60,
    fee: 2200,
    status: "completed",
  },
  {
    id: "m-4",
    mentorId: "sneha-iyer",
    sessionType: "Career Guidance",
    dateTime: "2024-04-03T11:00:00",
    durationMins: 60,
    fee: 1500,
    status: "completed",
  },
  {
    id: "m-5",
    mentorId: "karan-malhotra",
    sessionType: "Interview Prep",
    dateTime: "2024-03-28T15:00:00",
    durationMins: 60,
    fee: 1000,
    status: "completed",
  },
  {
    id: "m-6",
    mentorId: "rahul-desai",
    sessionType: "Career Guidance",
    dateTime: "2024-03-20T10:00:00",
    durationMins: 60,
    fee: 1000,
    status: "completed",
  },
  {
    id: "m-7",
    mentorId: "neha-kapoor",
    sessionType: "Resume Review",
    dateTime: "2024-03-12T17:00:00",
    durationMins: 60,
    fee: 800,
    status: "completed",
  },
  {
    id: "m-8",
    mentorId: "divya-menon",
    sessionType: "Career Guidance",
    dateTime: "2024-04-10T12:00:00",
    durationMins: 60,
    fee: 400,
    status: "cancelled",
  },
];

export const MENTEE_BOOKINGS: MenteeBooking[] = RAW_BOOKINGS.map(
  ({ mentorId, ...booking }) => ({ ...booking, mentor: mentorById(mentorId) }),
);

export const RECOMMENDED = [
  { mentor: mentorById("karan-malhotra"), rating: 4.7, reviews: 52 },
  { mentor: mentorById("ananya-nair"), rating: 4.7, reviews: 41 },
  { mentor: mentorById("meera-joshi"), rating: 4.6, reviews: 29 },
];

export const SESSION_ABOUT: Record<string, string> = {
  "Career Guidance":
    "Get guidance on career growth, job search strategies, skill development and long-term planning.",
  "Interview Prep":
    "Practice technical and behavioral interview questions with realistic mock rounds and detailed feedback.",
  "Resume Review":
    "Get detailed feedback on your resume and LinkedIn profile so they stand out to recruiters.",
};

export const PREPARATION_TIPS = [
  "Write down your top three goals for this session.",
  "Prepare a short summary of your background and current role.",
  "Keep your resume or portfolio handy so you can share it.",
  "Test your camera, microphone and internet connection 10 minutes early.",
];
