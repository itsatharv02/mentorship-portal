import { CalendarCheckIcon } from "lucide-react";
import { AVAILABILITY_OPTIONS } from "../../lib/mentor-search";
import type { Mentor } from "../../lib/mentors";

export function AvailabilitySection({
  mentor,
  responseTime,
}: {
  mentor: Mentor;
  responseTime: string;
}) {
  const label = AVAILABILITY_OPTIONS.find(
    (option) => option.value === mentor.availability,
  )?.label;

  return (
    <section id="availability" className="scroll-mt-32 border-t py-8">
      <h2 className="text-xl font-bold">Availability</h2>
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-green-50 p-4 ring-1 ring-green-200">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
          <CalendarCheckIcon className="size-5" />
        </div>
        <div>
          <p className="font-semibold text-green-700">{label}</p>
          <p className="text-sm text-muted-foreground">{responseTime}</p>
        </div>
      </div>
    </section>
  );
}
