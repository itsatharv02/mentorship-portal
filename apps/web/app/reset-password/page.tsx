import type { Metadata } from "next";
import { AuthLayout } from "../../components/auth/auth-layout";
import { RESET_HERO } from "../../components/auth/hero-content";
import { ResetPasswordCard } from "../../components/auth/reset-password-card";

export const metadata: Metadata = {
  title: "Set a new password | Mentora",
  description: "Choose a new password for your Mentora account.",
};

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const query = await searchParams;
  const rawToken = Array.isArray(query.token) ? query.token[0] : query.token;
  const token = rawToken?.trim() || null;

  return (
    <AuthLayout hero={RESET_HERO}>
      <ResetPasswordCard token={token} />
    </AuthLayout>
  );
}
