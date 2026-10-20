"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type Status = "idle" | "loading" | "success";

export function MentorCta() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleBecomeMentor() {
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckIcon className="size-6" />
        </span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            You&apos;re now a mentor!
          </h2>
          <p className="mt-1 text-muted-foreground">
            Your mentor account is ready. Complete your profile so learners can
            find you.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button type="button" size="lg" className="h-11 px-6 text-base">
              Complete your profile
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-base"
              nativeButton={false}
              render={<Link href="/" />}
            >
              Back to home
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Switch back to a learner account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">
        Ready to start mentoring?
      </h2>
      <p className="mt-1 text-muted-foreground">
        It only takes one click to switch to a mentor account. You can always
        switch back later.
      </p>
      <Button
        type="button"
        size="lg"
        className="mt-6 h-11 px-6 text-base"
        disabled={status === "loading"}
        onClick={handleBecomeMentor}
      >
        {status === "loading" ? (
          <>
            <LoaderCircleIcon className="animate-spin" />
            Switching...
          </>
        ) : (
          <>
            Become a Mentor
            <ArrowRightIcon data-icon="inline-end" />
          </>
        )}
      </Button>
    </div>
  );
}
