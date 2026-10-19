"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  PAYMENT_METHODS,
  formatPrice,
  getTotal,
  type Service,
} from "../../lib/booking";
import {
  StepConfirmed,
  StepReview,
  StepSchedule,
  StepService,
  type BookingSummary,
} from "./booking-steps";

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { step: 1, label: "Session Type" },
  { step: 2, label: "Date & Time" },
  { step: 3, label: "Payment" },
];

const NEXT: Record<Step, Step> = { 1: 2, 2: 3, 3: 4, 4: 4 };
const BACK: Record<Step, Step> = { 1: 1, 2: 1, 3: 2, 4: 1 };

const DEFAULT_METHOD = PAYMENT_METHODS[0]?.value ?? "upi";

function Stepper({ current }: { current: Step }) {
  return (
    <ol className="flex items-start">
      {STEPS.map(({ step, label }, index) => {
        const reached = current >= step;

        return (
          <li
            key={step}
            aria-current={current === step ? "step" : undefined}
            className="relative flex flex-1 flex-col items-center gap-1.5 text-center"
          >
            {index > 0 && (
              <span
                aria-hidden
                className={`absolute top-[11px] right-1/2 h-0.5 w-full ${
                  reached ? "bg-primary" : "bg-border"
                }`}
              />
            )}
            <span
              className={`relative flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                reached
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {current > step ? <CheckIcon className="size-3.5" /> : step}
            </span>
            <span
              className={`text-xs ${
                current === step
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function BookingCard({
  mentorName,
  availability,
  services,
}: {
  mentorName: string;
  availability: "this-week" | "weekends";
  services: Service[];
}) {
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [method, setMethod] = useState(DEFAULT_METHOD);

  const service = services.find((item) => item.id === serviceId);
  const sessionFee = service?.price ?? 0;

  const summary: BookingSummary | null =
    service && dateKey && time
      ? { serviceTitle: service.title, dateKey, time }
      : null;

  const canContinue =
    step === 1
      ? Boolean(service)
      : step === 2
        ? Boolean(dateKey && time)
        : true;

  function reset() {
    setStep(1);
    setServiceId(null);
    setDateKey(null);
    setTime(null);
    setMethod(DEFAULT_METHOD);
  }

  return (
    <div className="rounded-xl bg-primary/5 p-5 ring-1 ring-primary/15">
      {step < 4 && (
        <>
          <h2 className="text-lg font-bold">Book a Session</h2>
          <div className="mt-4">
            <Stepper current={step} />
          </div>
        </>
      )}

      <div className={step < 4 ? "mt-5" : undefined}>
        {step === 1 && (
          <StepService
            services={services}
            serviceId={serviceId}
            onServiceChange={setServiceId}
          />
        )}

        {step === 2 && (
          <StepSchedule
            availability={availability}
            dateKey={dateKey}
            time={time}
            onDateChange={(next) => {
              setDateKey(next);
              setTime(null);
            }}
            onTimeChange={setTime}
          />
        )}

        {step === 3 && summary && (
          <StepReview
            summary={summary}
            sessionFee={sessionFee}
            method={method}
            onMethodChange={setMethod}
          />
        )}

        {step === 4 && summary && (
          <StepConfirmed
            mentorName={mentorName}
            summary={summary}
            onReset={reset}
          />
        )}
      </div>

      {step < 4 && (
        <div className="mt-5 flex gap-2">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-10"
              onClick={() => setStep(BACK[step])}
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            size="lg"
            className="h-10 flex-1 text-base"
            disabled={!canContinue}
            onClick={() => setStep(NEXT[step])}
          >
            {step === 3
              ? `Pay ${formatPrice(getTotal(sessionFee))}`
              : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}
