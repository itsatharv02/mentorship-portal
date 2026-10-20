import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SESSION_TYPES } from "../data/dashboard";

export function SessionTypeChart() {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="font-semibold">Bookings by Session Type</h2>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
        <div className="relative size-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SESSION_TYPES}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="100%"
                paddingAngle={2}
                stroke="none"
              >
                {SESSION_TYPES.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">320</span>
            <span className="text-xs text-muted-foreground">Bookings</span>
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          {SESSION_TYPES.map((entry) => (
            <li key={entry.name} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
              <span className="ml-auto pl-4 font-medium">{entry.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
