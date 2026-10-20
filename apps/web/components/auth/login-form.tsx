"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  hasErrors,
  validateEmail,
  validatePassword,
} from "../../lib/auth-validation";
import { AuthField } from "./auth-field";

type Field = "email" | "password";

export function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [message, setMessage] = useState<string | null>(null);

  const errors = {
    email: validateEmail(values.email),
    password: validatePassword(values.password, "login"),
  };

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function markTouched(field: Field) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (hasErrors(errors)) {
      setMessage(null);
      return;
    }

    setMessage("Looks good. Submitting is added in Step 7.");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <AuthField
        label="Email address"
        icon={MailIcon}
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={(event) => update("email", event.target.value)}
        onBlur={() => markTouched("email")}
        error={touched.email ? errors.email : null}
      />

      <AuthField
        label="Password"
        icon={LockIcon}
        type="password"
        autoComplete="current-password"
        value={values.password}
        onChange={(event) => update("password", event.target.value)}
        onBlur={() => markTouched("password")}
        error={touched.password ? errors.password : null}
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-xs font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" className="h-11 w-full text-base">
        Log in
      </Button>

      {message && (
        <p role="status" className="text-center text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </form>
  );
}
