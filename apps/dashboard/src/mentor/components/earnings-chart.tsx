import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EARNINGS_MONTHLY } from "../data/panel";
import { formatINR } from "../../shared/lib/format";
import { FilterSelect } from "../../shared/components/filter-select";

const RANGES = [{ value: "3", label: "Last 3 months" }];

export function EarningsChart({
  variant,
  showTotal = false,
}: {
  variant: "bar" | "area";
  showTotal?: boolean;
}) {
  const [range, setRange] = useState("all");
  const months = range === "all" ? 6 : Number(range);
  const data = EARNINGS_MONTHLY.slice(-months);

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">Earnings Overview</h2>
          {showTotal && (
            <p className="mt-1 text-2xl font-bold">
              ₹48,000{" "}
              <span className="text-sm font-medium text-green-600">+18%</span>
            </p>
          )}
        </div>
        <FilterSelect
          label="Last 6 months"
          value={range}
          options={RANGES}
          onChange={setRange}
        />
      </div>

      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          {variant === "bar" ? (
            <BarChart data={data} margin={{ top: 8, right: 8, left: -12 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value: number) => `${value / 1000}K`}
              />
              <Tooltip formatter={(value) => formatINR(Number(value))} />
              <Bar
                dataKey="earnings"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -12 }}>
              <defs>
                <linearGradient id="earnings-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value: number) => `${value / 1000}K`}
              />
              <Tooltip formatter={(value) => formatINR(Number(value))} />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#earnings-fill)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
