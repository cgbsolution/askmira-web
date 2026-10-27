"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

import { MockCard, MockFrame, MockShell } from "./primitives";

const HEADCOUNT = [
  { m: "Nov", headcount: 206 },
  { m: "Dec", headcount: 209 },
  { m: "Jan", headcount: 214 },
  { m: "Feb", headcount: 219 },
  { m: "Mar", headcount: 221 },
  { m: "Apr", headcount: 226 },
  { m: "May", headcount: 230 },
  { m: "Jun", headcount: 233 },
  { m: "Jul", headcount: 237 },
  { m: "Aug", headcount: 240 },
  { m: "Sep", headcount: 245 },
  { m: "Oct", headcount: 248 },
];

const MOVEMENT = [
  { m: "May", joiners: 7, leavers: 3 },
  { m: "Jun", joiners: 5, leavers: 2 },
  { m: "Jul", joiners: 6, leavers: 2 },
  { m: "Aug", joiners: 4, leavers: 1 },
  { m: "Sep", joiners: 8, leavers: 3 },
  { m: "Oct", joiners: 6, leavers: 3 },
];

const headcountConfig = { headcount: { label: "Headcount", color: "var(--color-brand-500)" } } satisfies ChartConfig;
const movementConfig = {
  joiners: { label: "Joiners", color: "var(--color-ink-800)" },
  leavers: { label: "Leavers", color: "var(--color-marigold-500)" },
} satisfies ChartConfig;

export function AnalyticsMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of people analytics: headcount growing from 206 to 248 over twelve months, joiners and leavers by month, and attrition and payroll cost tiles, with sample data" className={className}>
      <MockShell active="people">
        <div className="grid grid-cols-2 gap-2 @xl:grid-cols-4">
          {[
            ["Headcount", "248", "+42 in 12 months"],
            ["Attrition", "11.7%", "Annualised, last 6 months"],
            ["Avg. tenure", "3.1 yrs", "Across all entities"],
            ["Payroll cost", "₹1.49 Cr", "October gross"],
          ].map(([k, v, h]) => (
            <div key={k} className="rounded-xl border border-cream-200 bg-white p-2.5">
              <p className="text-[9px] text-ink-400">{k}</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums">{v}</p>
              <p className="truncate text-[9px] text-ink-400">{h}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 @2xl:grid-cols-[1.4fr_1fr]">
          <MockCard title="Headcount, last 12 months">
            <ChartContainer config={headcountConfig} className="aspect-[2.2/1] w-full">
              <AreaChart data={HEADCOUNT} margin={{ left: -24, right: 4, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="hc-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-headcount)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-headcount)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tickMargin={6} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} domain={[190, 260]} width={44} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area
                  dataKey="headcount"
                  type="monotone"
                  stroke="var(--color-headcount)"
                  strokeWidth={2}
                  fill="url(#hc-fill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          </MockCard>
          <MockCard title="Joiners and leavers">
            <ChartContainer config={movementConfig} className="aspect-[1.6/1] w-full">
              <BarChart data={MOVEMENT} margin={{ left: -28, right: 0, top: 6, bottom: 0 }} barGap={2}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tickMargin={6} />
                <YAxis tickLine={false} axisLine={false} width={40} allowDecimals={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="joiners" fill="var(--color-joiners)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="leavers" fill="var(--color-leavers)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ChartContainer>
            <div className="mt-1 flex gap-3 text-[9px] text-ink-500">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-sm bg-ink-800" /> Joiners
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-sm bg-marigold-500" /> Leavers
              </span>
            </div>
          </MockCard>
        </div>
      </MockShell>
    </MockFrame>
  );
}
