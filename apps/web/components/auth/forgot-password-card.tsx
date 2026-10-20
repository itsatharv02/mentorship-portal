"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MailCheckIcon, MailIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { validateEmail } from "../../lib/auth-validation";
import { AuthDivider } from "./auth-divider";
import { AuthField } from "./auth-field";

export function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [resent, setResent] = useState(false);

  const error = validateEmail(email);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (error) return;
    setSentTo(email.trim());
  }

  function changeEmail() {
    setSentTo(null);
    setResent(false);
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8">
      <Link href="/" className="text-xl font-bold text-primary">
        Mentora
      </Link>

      {sentTo === null ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <AuthField
              label="Email address"
              showLabel
              icon={MailIcon}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched(true)}
              error={touched ? error : null}
            />
            <Button type="submit" size="lg" className="h-11 w-full text-base">
              Send reset link
            </Button>
          </form>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheckIcon className="size-7" />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{sentTo}</span>,
            we&apos;ve sent a password reset link. It expires in 30 minutes.
          </p>

          <div className="mt-6 space-y-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 w-full"
              onClick={() => setResent(true)}
            >
              Resend link
            </Button>
            {resent && (
              <p role="status" className="text-sm text-muted-foreground">
                A new link is on its way.
              </p>
            )}
            <button
              type="button"
              onClick={changeEmail}
              className="text-sm text-primary hover:underline"
            >
              Use a different email
            </button>
          </div>
        </div>
      )}

      <AuthDivider label="or" className="mt-8" />
      <div className="mt-5 text-center">
        <Link
          href="/auth"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to log in
        </Link>
      </div>
    </div>
  );
}
