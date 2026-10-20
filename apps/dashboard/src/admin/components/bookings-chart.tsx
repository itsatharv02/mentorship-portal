import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BOOKINGS_OVERVIEW } from "../data/dashboard";
import { FilterSelect } from "../../shared/components/filter-select";

const RANGES = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
];

export function BookingsChart() {
  const [range, setRange] = useState("30");
  const data = BOOKINGS_OVERVIEW.slice(-Number(range));

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Bookings Overview</h2>
        <FilterSelect
          label="Last 30 days"
          value={range}
          options={RANGES}
          onChange={setRange}
        />
      </div>

      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20 }}>
            <defs>
              <linearGradient id="bookings-fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.25}
                />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="bookings"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#bookings-fill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
