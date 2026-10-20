"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  PASSWORD_MIN_LENGTH,
  hasErrors,
  validateEmail,
  validateName,
  validatePassword,
} from "../../lib/auth-validation";
import { AuthField } from "./auth-field";

type Field = "firstName" | "lastName" | "email" | "password";

const EMPTY_VALUES: Record<Field, string> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const NOT_TOUCHED: Record<Field, boolean> = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

export function SignupForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState(NOT_TOUCHED);
  const [message, setMessage] = useState<string | null>(null);

  const errors: Record<Field, string | null> = {
    firstName: validateName(values.firstName, "First name"),
    lastName: validateName(values.lastName, "Last name"),
    email: validateEmail(values.email),
    password: validatePassword(values.password, "signup"),
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
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    if (hasErrors(errors)) {
      setMessage(null);
      return;
    }

    setMessage("Looks good. Submitting is added in Step 7.");
  }

  const showPasswordHint = !(touched.password && errors.password);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
        <AuthField
          label="First name"
          autoComplete="given-name"
          {...fieldProps("firstName")}
        />
        <AuthField
          label="Last name"
          autoComplete="family-name"
          {...fieldProps("lastName")}
        />
      </div>

      <AuthField
        label="Email address"
        icon={MailIcon}
        type="email"
        autoComplete="email"
        {...fieldProps("email")}
      />

      <div>
        <AuthField
          label="Password"
          icon={LockIcon}
          type="password"
          autoComplete="new-password"
          {...fieldProps("password")}
        />
        {showPasswordHint && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            At least {PASSWORD_MIN_LENGTH} characters, with a letter and a
            number.
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="h-11 w-full text-base">
        Create account
      </Button>

      {message && (
        <p role="status" className="text-center text-sm text-muted-foreground">
          {message}
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
