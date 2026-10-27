"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { TooltipContentProps } from "recharts";

import { cn } from "@/lib/utils";

/**
 * shadcn Chart for Recharts v3. A config maps each series key to a label and a
 * colour token; the container exposes them as `--color-<key>` so marks read
 * `fill="var(--color-hires)"` and never carry a hex value.
 */
export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center font-ui text-[11px] [&_.recharts-cartesian-axis-tick_text]:fill-ink-400 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-cream-200 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-cream-300 [&_.recharts-layer]:outline-hidden [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-cream-100 [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config).filter(([, item]) => item.color);
  if (!entries.length) return null;
  const css = `[data-chart=${id}] {\n${entries.map(([key, item]) => `  --color-${key}: ${item.color};`).join("\n")}\n}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel = false,
  valueFormatter,
}: Partial<TooltipContentProps<number, string>> & {
  className?: string;
  hideLabel?: boolean;
  valueFormatter?: (value: number) => string;
}) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;
  return (
    <div
      className={cn(
        "grid min-w-32 gap-1.5 rounded-xl border border-cream-200 bg-white px-3 py-2 font-ui text-xs shadow-card",
        className,
      )}
    >
      {!hideLabel && label !== undefined && <div className="font-semibold text-ink-900">{label}</div>}
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.name ?? "value");
        const itemConfig = config[key];
        const value = typeof item.value === "number" ? item.value : Number(item.value);
        return (
          <div key={key} className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: item.color ?? `var(--color-${key})` }} />
            <span className="text-ink-500">{itemConfig?.label ?? item.name}</span>
            <span className="ml-auto font-semibold text-ink-900 tabular-nums">
              {valueFormatter ? valueFormatter(value) : value.toLocaleString("en-IN")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent };
