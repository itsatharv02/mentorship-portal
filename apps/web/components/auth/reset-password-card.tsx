"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { CheckIcon, LockIcon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  PASSWORD_MIN_LENGTH,
  hasErrors,
  validateConfirmPassword,
  validatePassword,
} from "../../lib/auth-validation";
import { AuthField } from "./auth-field";

type Field = "password" | "confirm";

function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8">
      <Link href="/" className="text-xl font-bold text-primary">
        Mentora
      </Link>
      {children}
    </div>
  );
}

export function ResetPasswordCard({ token }: { token: string | null }) {
  const [values, setValues] = useState<Record<Field, string>>({
    password: "",
    confirm: "",
  });
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    password: false,
    confirm: false,
  });
  const [done, setDone] = useState(false);

  const errors: Record<Field, string | null> = {
    password: validatePassword(values.password, "signup"),
    confirm: validateConfirmPassword(values.password, values.confirm),
  };

  function fieldProps(field: Field) {
    return {
      value: values[field],
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setValues((current) => ({ ...current, [field]: event.target.value })),
      onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
      error: touched[field] ? errors[field] : null,
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ password: true, confirm: true });
    if (hasErrors(errors)) return;
    setDone(true);
  }

  if (token === null) {
    return (
      <CardShell>
        <div className="mt-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <TriangleAlertIcon className="size-7" />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            This link is invalid or has expired
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reset links can be used once and expire after 30 minutes. Request a
            new one to continue.
          </p>
          <Button
            render={<Link href="/forgot-password" />}
            nativeButton={false}
            size="lg"
            className="mt-6 h-11 w-full text-base"
          >
            Request a new link
          </Button>
          <Link
            href="/auth"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Back to log in
          </Link>
        </div>
      </CardShell>
    );
  }

  if (done) {
    return (
      <CardShell>
        <div className="mt-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckIcon className="size-7" />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            Password updated
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your password has been changed. You can now log in with your new
            password.
          </p>
          <Button
            render={<Link href="/auth" />}
            nativeButton={false}
            size="lg"
            className="mt-6 h-11 w-full text-base"
          >
            Go to log in
          </Button>
        </div>
      </CardShell>
    );
  }

  const showHint = !(touched.password && errors.password);

  return (
    <CardShell>
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Set a new password
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a strong password you haven&apos;t used before.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <AuthField
              label="New password"
              icon={LockIcon}
              type="password"
              autoComplete="new-password"
              {...fieldProps("password")}
            />
            {showHint && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                At least {PASSWORD_MIN_LENGTH} characters, with a letter and a
                number.
              </p>
            )}
          </div>

          <AuthField
            label="Confirm new password"
            icon={LockIcon}
            type="password"
            autoComplete="new-password"
            {...fieldProps("confirm")}
          />

          <Button type="submit" size="lg" className="h-11 w-full text-base">
            Reset password
          </Button>
        </form>
      </div>
    </CardShell>
  );
}
