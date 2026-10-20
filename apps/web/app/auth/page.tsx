import type { Metadata } from "next";
import { AuthHero } from "../../components/auth/auth-hero";
import { AuthCard } from "../../components/auth/auth-card";

export const metadata: Metadata = {
  title: "Log in or Sign up | Mentora",
  description: "Log in to your Mentora account or create a new one.",
};

type AuthPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const query = await searchParams;
  const tab = query.tab === "signup" ? "signup" : "login";

  return (
    <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <AuthHero />

      <section className="flex items-center justify-center px-4 py-12">
        <AuthCard key={tab} initialTab={tab} />
      </section>
    </main>
  );
}
