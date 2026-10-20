import type { Metadata } from "next";
import { BecomeMentorHero } from "../../components/become-mentor/hero";
import { CtaSection } from "../../components/become-mentor/cta-section";

export const metadata: Metadata = {
  title: "Become a Mentor | Mentora",
  description:
    "Share your experience, build your personal brand and help learners grow their careers.",
};

export default function BecomeMentorPage() {
  return (
    <main>
      <BecomeMentorHero />
      <CtaSection />
    </main>
  );
}
