import {
  BookOpenIcon,
  CalendarClockIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import type { HeroContent, HeroFeature } from "./auth-hero";

const RESET_FEATURES: HeroFeature[] = [
  {
    icon: LockIcon,
    title: "Secure",
    description: "Your account stays protected",
    tone: "bg-blue-100 text-blue-600",
  },
  {
    icon: MailIcon,
    title: "Quick & easy",
    description: "Get a reset link in seconds",
    tone: "bg-green-100 text-green-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Back to learning",
    description: "Continue your mentorship journey",
    tone: "bg-purple-100 text-purple-600",
  },
];

export const LOGIN_HERO: HeroContent = {
  heading: (
    <>
      Learn from people who&apos;ve{" "}
      <span className="text-primary">been there.</span>
    </>
  ),
  description:
    "Get personalized guidance from experienced professionals to grow your career, skills and confidence.",
  features: [
    {
      icon: UsersIcon,
      title: "1:1 mentorship sessions",
      description: "Learn directly from industry experts",
      tone: "bg-blue-100 text-blue-600",
    },
    {
      icon: CalendarClockIcon,
      title: "Flexible scheduling",
      description: "Book sessions at your convenience",
      tone: "bg-green-100 text-green-600",
    },
    {
      icon: BookOpenIcon,
      title: "Practical, real-world advice",
      description: "Get insights that help you grow",
      tone: "bg-purple-100 text-purple-600",
    },
  ],
};

export const FORGOT_HERO: HeroContent = {
  heading: (
    <>
      Reset your <span className="text-primary">password</span>
    </>
  ),
  description:
    "No worries. Enter your email address and we'll send you a link to reset your password.",
  features: RESET_FEATURES,
};

export const RESET_HERO: HeroContent = {
  heading: (
    <>
      Create a new <span className="text-primary">password</span>
    </>
  ),
  description:
    "Choose a strong password you haven't used before to keep your account safe.",
  features: RESET_FEATURES,
};
