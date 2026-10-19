import { mentors, type Mentor } from "./mentors";

export type Review = {
  id: string;
  author: string;
  timeAgo: string;
  rating: number;
  text: string;
};

export type MentorDetail = {
  location: string;
  bio: string;
  approach: string;
  languages: string[];
  sessionsConducted: number;
  links: { label: string; href: string }[];
  reviews: Review[];
  responseTime: string;
};

const CITIES = [
  "Bangalore, India",
  "Mumbai, India",
  "Delhi, India",
  "Hyderabad, India",
  "Pune, India",
  "Chennai, India",
];

const detailOverrides: Record<string, Partial<MentorDetail>> = {
  "arjun-mehta": {
    location: "Bangalore, India",
    bio: "I'm a Senior Software Engineer at Google with 8+ years of experience in building scalable products and working with global teams. I'm passionate about helping others grow in their careers, whether it's through technical guidance, interview preparation, or career planning.",
    approach:
      "I believe in practical, honest and personalized guidance. My goal is to help you gain clarity, build confidence and take actionable steps toward your career goals. I focus on real-world examples and provide structured feedback tailored to your background and aspirations.",
    languages: ["English", "Hindi"],
    sessionsConducted: 100,
    reviews: [
      {
        id: "arjun-1",
        author: "Rohan Mehta",
        timeAgo: "2 weeks ago",
        rating: 5,
        text: "Great session! Arjun was very clear and provided practical advice on system design and interview preparation. Highly recommended!",
      },
      {
        id: "arjun-2",
        author: "Priya Singh",
        timeAgo: "1 month ago",
        rating: 5,
        text: "Very helpful and knowledgeable. The session gave me clarity on my career path and what skills to focus on next.",
      },
    ],
  },
  "priya-sharma": {
    location: "Hyderabad, India",
    languages: ["English", "Hindi", "Telugu"],
    sessionsConducted: 90,
  },
};

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((mentor) => mentor.id === id);
}

export function getMentorDetail(mentor: Mentor): MentorDetail {
  const firstName = mentor.name.split(" ")[0] ?? mentor.name;
  const workplace = mentor.company ? ` at ${mentor.company}` : "";
  const mainSkill = (mentor.skills[0] ?? mentor.domain).toLowerCase();
  const position = mentors.findIndex((m) => m.id === mentor.id);

  const defaults: MentorDetail = {
    location: CITIES[Math.max(position, 0) % CITIES.length] ?? "India",
    bio: `I'm a ${mentor.role}${workplace} with ${mentor.experienceYears}+ years of experience in ${mentor.domain.toLowerCase()}. I enjoy helping others grow in their careers, whether it's through practical guidance, interview preparation, or career planning.`,
    approach:
      "I believe in practical, honest and personalized guidance. My goal is to help you gain clarity, build confidence and take actionable steps toward your career goals.",
    languages: ["English", "Hindi"],
    sessionsConducted: Math.round((mentor.reviews * 1.2) / 10) * 10,
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
    reviews: [
      {
        id: `${mentor.id}-1`,
        author: "Rohan Mehta",
        timeAgo: "2 weeks ago",
        rating: 5,
        text: `Great session! ${firstName} was very clear and gave practical advice on ${mainSkill}. Highly recommended!`,
      },
      {
        id: `${mentor.id}-2`,
        author: "Priya Singh",
        timeAgo: "1 month ago",
        rating: 5,
        text: "Very helpful and knowledgeable. The session gave me clarity on my career path and what skills to focus on next.",
      },
    ],
    responseTime: "Usually responds within a few hours",
  };

  return { ...defaults, ...detailOverrides[mentor.id] };
}

export function getSimilarMentors(mentor: Mentor, limit = 3): Mentor[] {
  return mentors
    .filter((other) => other.id !== mentor.id)
    .sort(
      (a, b) =>
        Number(b.domain === mentor.domain) -
          Number(a.domain === mentor.domain) || b.rating - a.rating,
    )
    .slice(0, limit);
}
