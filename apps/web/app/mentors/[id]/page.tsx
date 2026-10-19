import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMentorById,
  getMentorDetail,
  getMentorServices,
  getSimilarMentors,
} from "../../../lib/mentor-details";
import { mentors } from "../../../lib/mentors";
import { ProfileHeader } from "../../../components/mentors/profile-header";
import { ProfileTabs } from "../../../components/mentors/profile-tabs";
import { AboutSection } from "../../../components/mentors/about-section";
import { ReviewsSection } from "../../../components/mentors/reviews-section";
import { BookingCard } from "../../../components/mentors/booking-card";
import { AvailabilitySection } from "../../../components/mentors/availability-section";
import {
  LanguagesCard,
  LinksCard,
  SimilarMentors,
} from "../../../components/mentors/sidebar-cards";
import { FaqsSection } from "../../../components/mentors/faqs-section";

type MentorPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mentors.map((mentor) => ({ id: mentor.id }));
}

export async function generateMetadata({
  params,
}: MentorPageProps): Promise<Metadata> {
  const { id } = await params;
  const mentor = getMentorById(id);

  if (!mentor) return { title: "Mentor not found - Mentora" };

  return {
    title: `${mentor.name} - ${mentor.role} | Mentora`,
    description: `Book a 1:1 session with ${mentor.name}${
      mentor.company ? ` from ${mentor.company}` : ""
    }.`,
  };
}

export default async function MentorPage({ params }: MentorPageProps) {
  const { id } = await params;
  const mentor = getMentorById(id);

  if (!mentor) notFound();

  const detail = getMentorDetail(mentor);
  const similar = getSimilarMentors(mentor);
  const services = getMentorServices(mentor);

  const tabs = [
    { id: "about", label: "About" },
    { id: "reviews", label: `Reviews (${mentor.reviews})` },
    { id: "availability", label: "Availability" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <ProfileHeader mentor={mentor} location={detail.location} />

          <div className="mt-8">
            <ProfileTabs tabs={tabs} />

            <div className="pt-6 lg:hidden">
              <BookingCard
                mentorName={mentor.name}
                availability={mentor.availability}
                services={services}
              />
            </div>

            <AboutSection mentor={mentor} detail={detail} />
            <ReviewsSection mentor={mentor} reviews={detail.reviews} />
            <AvailabilitySection
              mentor={mentor}
              responseTime={detail.responseTime}
            />
            <FaqsSection mentorName={mentor.name} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="hidden lg:block">
            <BookingCard
              mentorName={mentor.name}
              availability={mentor.availability}
              services={services}
            />
          </div>
          <LanguagesCard languages={detail.languages} />
          <LinksCard links={detail.links} />
          <SimilarMentors mentors={similar} />
        </aside>
      </div>
    </main>
  );
}
