export type MentorReview = {
  id: string;
  author: string;
  rating: number;
  daysAgo: number;
  text: string;
  sessionType: string;
};

export const REVIEWS: MentorReview[] = [
  {
    id: "r-1",
    author: "Rohan Mehta",
    rating: 5,
    daysAgo: 14,
    sessionType: "Career Guidance",
    text: "Great session! Arjun was very clear and provided practical advice on system design and interview preparation. Highly recommended!",
  },
  {
    id: "r-2",
    author: "Priya Singh",
    rating: 5,
    daysAgo: 30,
    sessionType: "Interview Prep",
    text: "Very helpful and knowledgeable. The session gave me clarity on my career path and what skills to focus on next.",
  },
  {
    id: "r-3",
    author: "Vikram Singh",
    rating: 5,
    daysAgo: 45,
    sessionType: "Resume Review",
    text: "Good insights and real-world examples. Helped me a lot with my resume and interview prep.",
  },
  {
    id: "r-4",
    author: "Ananya Patel",
    rating: 4,
    daysAgo: 60,
    sessionType: "Career Guidance",
    text: "Solid advice on moving into a senior role. I'd have liked a little more time for questions.",
  },
  {
    id: "r-5",
    author: "Kabir Joshi",
    rating: 5,
    daysAgo: 75,
    sessionType: "Interview Prep",
    text: "The mock interview felt like the real thing. The feedback afterwards was specific and actionable.",
  },
  {
    id: "r-6",
    author: "Isha Menon",
    rating: 5,
    daysAgo: 90,
    sessionType: "Career Guidance",
    text: "Arjun helped me plan the next two years of my career. I came away with a clear roadmap.",
  },
  {
    id: "r-7",
    author: "Dev Malhotra",
    rating: 3,
    daysAgo: 120,
    sessionType: "Resume Review",
    text: "Useful tips, though the session ran a bit short for the amount of material we had to cover.",
  },
  {
    id: "r-8",
    author: "Tanvi Shah",
    rating: 5,
    daysAgo: 150,
    sessionType: "Interview Prep",
    text: "Patient, friendly and extremely well prepared. Worth every rupee.",
  },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, count: 78 },
  { stars: 4, count: 6 },
  { stars: 3, count: 2 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];
