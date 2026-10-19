"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import {
  CalendarPlusIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CompassIcon,
  FileTextIcon,
  MailIcon,
  MessageSquareIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  PAYMENT_METHODS,
  PLATFORM_FEE,
  SESSION_MINUTES,
  TIME_SLOTS,
  formatDateLong,
  formatPrice,
  getAvailableDays,
  getDayParts,
  getTotal,
  toDateKey,
  type Service,
} from "../../lib/booking";

export type BookingSummary = {
  serviceTitle: string;
  dateKey: string;
  time: string;
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "career-guidance": CompassIcon,
  "interview-prep": MessageSquareIcon,
  "resume-review": FileTextIcon,
};

function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-xl border bg-background p-3 transition-colors has-checked:border-primary has-checked:bg-primary/5 has-focus-visible:ring-3 has-focus-visible:ring-ring/50">
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <div className="min-w-0 flex-1">{children}</div>
      <span
        aria-hidden
        className="size-4 shrink-0 rounded-full border border-input bg-background group-has-checked:border-[5px] group-has-checked:border-primary"
      />
    </label>
  );
}

export function StepService({
  services,
  serviceId,
  onServiceChange,
}: {
  services: Service[];
  serviceId: string | null;
  onServiceChange: (id: string) => void;
}) {
  const name = useId();

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Choose Session Type</p>
      <div role="radiogroup" aria-label="Session type" className="space-y-2">
        {services.map((service) => {
          const Icon = SERVICE_ICONS[service.id] ?? CompassIcon;

          return (
            <RadioCard
              key={service.id}
              name={name}
              value={service.id}
              checked={serviceId === service.id}
              onChange={onServiceChange}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{service.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-bold">
                      {formatPrice(service.price)}
                    </span>{" "}
                    <span className="text-xs text-muted-foreground">
                      per session
                    </span>
                  </p>
                </div>
              </div>
            </RadioCard>
          );
        })}
      </div>
    </div>
  );
}

export function StepSchedule({
  availability,
  dateKey,
  time,
  onDateChange,
  onTimeChange,
}: {
  availability: "this-week" | "weekends";
  dateKey: string | null;
  time: string | null;
  onDateChange: (dateKey: string) => void;
  onTimeChange: (time: string) => void;
}) {
  const [todayKey] = useState(() => toDateKey(new Date()));
  const days = getAvailableDays(availability, todayKey);
  const scroller = useRef<HTMLDivElement>(null);

  function scrollDays(direction: 1 | -1) {
    scroller.current?.scrollBy({ left: direction * 180, behavior: "smooth" });
  }

  return (
    <div>
      <p className="text-sm font-medium">Select Date &amp; Time</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Choose a convenient time slot for your {SESSION_MINUTES} minute session
        (IST).
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium">Available Days</p>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Show earlier days"
            onClick={() => scrollDays(-1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Show later days"
            onClick={() => scrollDays(1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {days.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          No days are available right now.
        </p>
      ) : (
        <div
          ref={scroller}
          className="-mx-1 mt-2 flex snap-x gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {days.map((key) => {
            const { weekday, day, month } = getDayParts(key);
            const selected = key === dateKey;

            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => onDateChange(key)}
                className={`flex w-16 shrink-0 snap-start flex-col items-center rounded-xl border py-2 transition-colors ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background hover:border-primary/50"
                }`}
              >
                <span className="text-xs opacity-80">{weekday}</span>
                <span className="text-lg leading-tight font-bold">{day}</span>
                <span className="text-xs opacity-80">{month}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-sm font-medium">Available Slots</p>
      <p className="text-xs text-muted-foreground">
        {dateKey
          ? formatDateLong(dateKey)
          : "Select a day to see available times."}
      </p>

      {dateKey && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => (
            <Button
              key={slot}
              type="button"
              variant={time === slot ? "default" : "outline"}
              aria-pressed={time === slot}
              onClick={() => onTimeChange(slot)}
              className="h-9"
            >
              {slot}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function SessionDetails({ summary }: { summary: BookingSummary }) {
  const rows = [
    { label: "Session Type", value: summary.serviceTitle },
    {
      label: "Date & Time",
      value: `${formatDateLong(summary.dateKey)} at ${summary.time} (IST)`,
    },
    { label: "Duration", value: `${SESSION_MINUTES} minutes` },
    { label: "Mode", value: "Google Meet (online)" },
  ];

  return (
    <dl className="space-y-2 rounded-xl border bg-background p-3 text-sm">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between gap-4">
          <dt className="shrink-0 text-muted-foreground">{row.label}</dt>
          <dd className="text-right font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StepReview({
  summary,
  sessionFee,
  method,
  onMethodChange,
}: {
  summary: BookingSummary;
  sessionFee: number;
  method: string;
  onMethodChange: (value: string) => void;
}) {
  const name = useId();

  return (
    <div className="space-y-5">
      <section>
        <h3 className="mb-2 text-sm font-semibold">Session Details</h3>
        <SessionDetails summary={summary} />
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold">Payment Summary</h3>
        <dl className="space-y-2 rounded-xl border bg-background p-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Session Fee</dt>
            <dd className="font-medium">{formatPrice(sessionFee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Platform Fee</dt>
            <dd className="font-medium">{formatPrice(PLATFORM_FEE)}</dd>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <dt>Total Amount</dt>
            <dd>{formatPrice(getTotal(sessionFee))}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold">Payment Method</h3>
        <div
          role="radiogroup"
          aria-label="Payment method"
          className="space-y-2"
        >
          {PAYMENT_METHODS.map((option) => (
            <RadioCard
              key={option.value}
              name={name}
              value={option.value}
              checked={method === option.value}
              onChange={onMethodChange}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </RadioCard>
          ))}
        </div>
      </section>
    </div>
  );
}

export function StepConfirmed({
  mentorName,
  summary,
  onReset,
}: {
  mentorName: string;
  summary: BookingSummary;
  onReset: () => void;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckIcon className="size-7" />
      </span>
      <h2 className="mt-4 text-xl font-bold">Booking Confirmed!</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Your session with {mentorName} has been booked successfully.
      </p>

      <div className="mt-5 text-left">
        <SessionDetails summary={summary} />
      </div>

      <div className="mt-5 grid gap-2">
        <Button type="button" variant="outline" size="lg" className="h-10">
          <CalendarPlusIcon />
          Add to Calendar
        </Button>
        <Button type="button" size="lg" className="h-10">
          View Session Details
        </Button>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <MailIcon className="size-3.5" />A confirmation email has been sent to
        your email address.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm text-primary hover:underline"
      >
        Book another session
      </button>
    </div>
  );
}
