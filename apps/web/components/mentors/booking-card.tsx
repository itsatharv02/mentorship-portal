"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  DEFAULT_DURATION,
  DURATION_OPTIONS,
  formatPrice,
  getSessionPrice,
} from "../../lib/booking";

export function BookingCard({ price }: { price: number }) {
  const [duration, setDuration] = useState(DEFAULT_DURATION);

  const factor =
    DURATION_OPTIONS.find((option) => option.value === duration)?.factor ?? 1;

  return (
    <div className="rounded-xl bg-primary/5 p-5 ring-1 ring-primary/15">
      <h2 className="text-lg font-bold">Book a Session</h2>

      <p className="mt-4 text-3xl font-bold">
        {formatPrice(getSessionPrice(price, factor))}
      </p>
      <p className="text-sm text-muted-foreground">per session</p>

      <p className="mt-4 mb-1.5 text-sm font-medium">Select duration</p>
      <Select
        value={duration}
        onValueChange={(value) => {
          if (value) setDuration(value);
        }}
        items={DURATION_OPTIONS.map(({ value, label }) => ({ value, label }))}
      >
        <SelectTrigger
          className="h-10 w-full bg-background"
          aria-label="Select duration"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DURATION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="button" size="lg" className="mt-4 h-10 w-full text-base">
        Continue
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        You won&apos;t be charged yet
      </p>
    </div>
  );
}
