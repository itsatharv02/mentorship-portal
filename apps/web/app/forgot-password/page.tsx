import type { Metadata } from "next";
import { AuthLayout } from "../../components/auth/auth-layout";
import { ForgotPasswordCard } from "../../components/auth/forgot-password-card";
import { FORGOT_HERO } from "../../components/auth/hero-content";

export const metadata: Metadata = {
  title: "Reset your password | Mentora",
  description:
    "Enter your email and we'll send you a link to reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout hero={FORGOT_HERO}>
      <ForgotPasswordCard />
    </AuthLayout>
  );
}
