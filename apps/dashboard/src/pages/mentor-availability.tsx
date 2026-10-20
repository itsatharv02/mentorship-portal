import { useState } from "react";
import { CalendarIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { PageHeader } from "../components/page-header";
import { Switch } from "../components/switch";
import {
  DEFAULT_SCHEDULE,
  MAX_TIME,
  MIN_TIME,
  TIME_ZONES,
  type DaySchedule,
  type Slot,
} from "../data/mentor-availability";
import { formatMinutes } from "../lib/format";

const TIME_OPTIONS = Array.from(
  { length: (MAX_TIME - MIN_TIME) / 30 + 1 },
  (_, index) => {
    const minutes = MIN_TIME + index * 30;
    return { value: String(minutes), label: formatMinutes(minutes) };
  },
);

function TimeSelect({
  value,
  label,
  onChange,
}: {
  value: number;
  label: string;
  onChange: (minutes: number) => void;
}) {
  return (
    <Select
      value={String(value)}
      onValueChange={(next) => {
        if (next) onChange(Number(next));
      }}
      items={TIME_OPTIONS}
    >
      <SelectTrigger className="h-9 w-32 bg-background" aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {TIME_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function MentorAvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_SCHEDULE);
  const [timeZone, setTimeZone] = useState("ist");
  const [saved, setSaved] = useState(false);

  const hasInvalidSlot = schedule.some(
    (day) => day.enabled && day.slots.some((slot) => slot.end <= slot.start),
  );

  function updateDay(name: string, change: (day: DaySchedule) => DaySchedule) {
    setSchedule((current) =>
      current.map((day) => (day.name === name ? change(day) : day)),
    );
    setSaved(false);
  }

  function toggleDay(name: string, enabled: boolean) {
    updateDay(name, (day) => ({
      ...day,
      enabled,
      slots:
        enabled && day.slots.length === 0
          ? [{ id: crypto.randomUUID(), start: 540, end: 1020 }]
          : day.slots,
    }));
  }

  function addSlot(name: string) {
    updateDay(name, (day) => {
      const last = day.slots[day.slots.length - 1];
      const start = Math.min(last ? last.end : 540, MAX_TIME - 60);
      const end = Math.min(start + 120, MAX_TIME);
      return {
        ...day,
        slots: [...day.slots, { id: crypto.randomUUID(), start, end }],
      };
    });
  }

  function removeSlot(name: string, slotId: string) {
    updateDay(name, (day) => {
      const slots = day.slots.filter((slot) => slot.id !== slotId);
      return { ...day, slots, enabled: slots.length > 0 };
    });
  }

  function updateSlot(name: string, slotId: string, change: Partial<Slot>) {
    updateDay(name, (day) => ({
      ...day,
      slots: day.slots.map((slot) =>
        slot.id === slotId ? { ...slot, ...change } : slot,
      ),
    }));
  }

  return (
    <>
      <PageHeader
        title="Availability"
        subtitle="Set your available time slots for mentorship sessions."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Weekly Availability</h2>

          <div className="mt-2 divide-y">
            {schedule.map((day) => (
              <div
                key={day.name}
                className="flex flex-wrap items-center gap-x-4 gap-y-3 py-3"
              >
                <p className="w-24 text-sm font-medium">{day.name}</p>
                <Switch
                  checked={day.enabled}
                  onChange={(enabled) => toggleDay(day.name, enabled)}
                  label={`${day.name} availability`}
                />

                {day.enabled ? (
                  <div className="flex flex-1 flex-wrap items-center gap-3">
                    {day.slots.map((slot) => (
                      <div key={slot.id} className="flex items-center gap-2">
                        <TimeSelect
                          label={`${day.name} start time`}
                          value={slot.start}
                          onChange={(start) =>
                            updateSlot(day.name, slot.id, { start })
                          }
                        />
                        <span className="text-muted-foreground">-</span>
                        <TimeSelect
                          label={`${day.name} end time`}
                          value={slot.end}
                          onChange={(end) =>
                            updateSlot(day.name, slot.id, { end })
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${day.name} slot`}
                          onClick={() => removeSlot(day.name, slot.id)}
                        >
                          <Trash2Icon className="text-destructive" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={() => addSlot(day.name)}
                    >
                      <PlusIcon />
                      Add slot
                    </Button>
                  </div>
                ) : (
                  <p className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    Unavailable
                  </p>
                )}
              </div>
            ))}
          </div>

          {hasInvalidSlot && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              Each slot needs an end time after its start time.
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <Button
              type="button"
              size="lg"
              className="h-10"
              disabled={hasInvalidSlot}
              onClick={() => setSaved(true)}
            >
              Save Changes
            </Button>
            {saved && (
              <p role="status" className="text-sm text-green-600">
                Availability saved.
              </p>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border bg-primary/5 p-5 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-background text-primary">
              <CalendarIcon className="size-6" />
            </span>
            <h2 className="mt-3 font-semibold">Set your availability</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Let learners know when you&apos;re available for sessions. You can
              modify or block slots anytime.
            </p>
          </section>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Time Zone</h2>
            <div className="mt-3">
              <Select
                value={timeZone}
                onValueChange={(next) => {
                  if (next) setTimeZone(next);
                }}
                items={TIME_ZONES}
              >
                <SelectTrigger
                  className="h-10 w-full bg-background"
                  aria-label="Time zone"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIME_ZONES.map((zone) => (
                    <SelectItem key={zone.value} value={zone.value}>
                      {zone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              All times are in your local time zone.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
