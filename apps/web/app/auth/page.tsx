import type { Metadata } from "next";
import { AuthLayout } from "../../components/auth/auth-layout";
import { LOGIN_HERO } from "../../components/auth/hero-content";
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
    <AuthLayout hero={LOGIN_HERO}>
      <AuthCard key={tab} initialTab={tab} />
    </AuthLayout>
  );
}
