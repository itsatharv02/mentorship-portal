"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

type Tab = "login" | "signup";

const TABS: { value: Tab; label: string }[] = [
  { value: "login", label: "Log in" },
  { value: "signup", label: "Sign up" },
];

const COPY: Record<
  Tab,
  {
    title: string;
    subtitle: string;
    switchText: string;
    switchLabel: string;
    switchTo: Tab;
  }
> = {
  login: {
    title: "Welcome back",
    subtitle: "Log in to your Mentora account",
    switchText: "Don't have an account?",
    switchLabel: "Sign up",
    switchTo: "signup",
  },
  signup: {
    title: "Create your account",
    subtitle: "Join Mentora and find your mentor",
    switchText: "Already have an account?",
    switchLabel: "Log in",
    switchTo: "login",
  },
};

export function AuthCard({ initialTab }: { initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const copy = COPY[tab];

  function changeTab(next: Tab) {
    setTab(next);
    window.history.replaceState(null, "", `/auth?tab=${next}`);
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8">
      <div
        role="tablist"
        aria-label="Log in or sign up"
        className="grid grid-cols-2 border-b"
      >
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`auth-tab-${value}`}
            aria-selected={tab === value}
            aria-controls="auth-panel"
            onClick={() => changeTab(value)}
            className={`-mb-px border-b-2 py-3 text-sm font-medium transition-colors ${
              tab === value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="auth-panel"
        aria-labelledby={`auth-tab-${tab}`}
        className="pt-8"
      >
        <h2 className="text-2xl font-bold tracking-tight">{copy.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{copy.subtitle}</p>

        <div className="mt-6">
          {tab === "login" ? <LoginForm /> : <SignupForm />}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {copy.switchText}{" "}
          <button
            type="button"
            onClick={() => changeTab(copy.switchTo)}
            className="font-medium text-primary hover:underline"
          >
            {copy.switchLabel}
          </button>
        </p>
      </div>
    </div>
  );
}
