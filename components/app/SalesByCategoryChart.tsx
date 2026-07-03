"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { CategorySales } from "@/data/sales";
import { formatNaira } from "@/data/pricing";

const barColors = ["#1B6E5B", "#E8A33D", "#2E9179", "#C67F1E"];

export function SalesByCategoryChart({ data }: { data: CategorySales[] }) {
  return (
    <div className="rounded-xl2 border border-line bg-white p-5 shadow-card sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
        This month
      </p>
      <h3 className="mt-1 font-display text-base font-semibold text-ink">
        Sales by category
      </h3>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9D2C2" vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#7996AB", fontSize: 11, fontFamily: "var(--font-plex-mono)" }}
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
              cursor={{ fill: "rgba(11,28,44,0.04)" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #D9D2C2",
                fontFamily: "var(--font-inter)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={entry.category} fill={barColors[i % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
