"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { MonthlyRevenue } from "@/data/sales";
import { formatNaira } from "@/data/pricing";

export function RevenueChart({ data }: { data: MonthlyRevenue[] }) {
  return (
    <div className="rounded-xl2 border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
            Revenue vs expenses
          </p>
          <h3 className="mt-1 font-display text-base font-semibold text-ink">
            Last 6 months
          </h3>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-ink-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal" /> Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber" /> Expenses
          </span>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9D2C2" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#7996AB", fontSize: 12, fontFamily: "var(--font-plex-mono)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "#7996AB", fontSize: 11, fontFamily: "var(--font-plex-mono)" }}
              tickFormatter={(v: number) => `${Math.round(v / 1000000)}M`}
            />
            <Tooltip
              formatter={(value: number) => formatNaira(value)}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #D9D2C2",
                fontFamily: "var(--font-inter)",
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#1B6E5B" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="#E8A33D" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
