"use client";

import { m } from "motion/react";

import {
  SpotCalendar,
  SpotChart,
  SpotChecklist,
  SpotClock,
  SpotIdCard,
  SpotPayslip,
  SpotReceipt,
  SpotRecruit,
  SpotTarget,
  type SpotIcon,
} from "@/components/illustrations/spots";
import { cn } from "@/lib/utils";

/*
 * "One record per person": the employee record at the centre, the modules
 * round it on a slowly turning orbit, and little dots riding the connectors in
 * to the record — every module reads and writes the same place. Drawn in a
 * 600 × 600 box centred on 0,0; the bubbles are HTML so their labels stay crisp.
 */

type Module = { label: string; icon: SpotIcon; fill: string; tilt: string };

const MODULES: Module[] = [
  { label: "Payroll", icon: SpotPayslip, fill: "bg-marigold-300 [--spot-tile:var(--color-marigold-300)]", tilt: "6deg" },
  { label: "Attendance", icon: SpotClock, fill: "bg-white [--spot-tile:#fff]", tilt: "-5deg" },
  { label: "Leave", icon: SpotCalendar, fill: "bg-blush-200 [--spot-tile:var(--color-blush-200)]", tilt: "4deg" },
  { label: "Reviews", icon: SpotTarget, fill: "bg-success-50 [--spot-tile:var(--color-success-50)]", tilt: "-6deg" },
  { label: "Expenses", icon: SpotReceipt, fill: "bg-marigold-100 [--spot-tile:var(--color-marigold-100)]", tilt: "5deg" },
  { label: "Hiring", icon: SpotRecruit, fill: "bg-info-50 [--spot-tile:var(--color-info-50)]", tilt: "-4deg" },
  { label: "Onboarding", icon: SpotChecklist, fill: "bg-cream-200 [--spot-tile:var(--color-cream-200)]", tilt: "6deg" },
  { label: "Analytics", icon: SpotChart, fill: "bg-blush-100 [--spot-tile:var(--color-blush-100)]", tilt: "-5deg" },
];

const ORBIT = 228; // centre of each bubble, in the 600 box
const CORE = 98; // radius of the record in the middle
const BUBBLE = 62; // radius of a bubble
const pct = (v: number) => `${50 + (v / 600) * 100}%`;

export function OneRecordHub({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="One employee record in the middle, shared by payroll, attendance, leave, performance reviews, expenses, hiring, onboarding and analytics."
      className={cn("relative mx-auto aspect-square w-full max-w-[34rem]", className)}
    >
      {/* Outer ring of dots turning the other way. */}
      <div aria-hidden className="animate-spin-rev absolute inset-0">
        <svg viewBox="-300 -300 600 600" className="size-full overflow-visible">
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i * Math.PI) / 18;
            return (
              <circle
                key={i}
                cx={(288 * Math.cos(a)).toFixed(1)}
                cy={(288 * Math.sin(a)).toFixed(1)}
                r={i % 3 === 0 ? 4.5 : 2.5}
                className={i % 3 === 0 ? "fill-marigold-400" : "fill-cream-300"}
              />
            );
          })}
        </svg>
      </div>

      {/* The orbit itself, dashed, turning slowly. */}
      <div aria-hidden className="animate-spin-slow absolute inset-0">
        <svg viewBox="-300 -300 600 600" className="size-full overflow-visible">
          <circle r={ORBIT} fill="none" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" className="stroke-ink-300" />
        </svg>
      </div>

      {/* Connectors with marching dashes, and dots riding them in to the record. */}
      <svg aria-hidden viewBox="-300 -300 600 600" className="absolute inset-0 size-full overflow-visible">
        {MODULES.map((mod, i) => {
          const deg = i * 45 - 90;
          return (
            <g key={mod.label} transform={`rotate(${deg + 90})`}>
              <line
                x1="0"
                y1={-(CORE + 6)}
                x2="0"
                y2={-(ORBIT - BUBBLE - 6)}
                strokeWidth="3"
                strokeDasharray="6 10"
                strokeLinecap="round"
                className="animate-dash-flow stroke-marigold-500 [animation-direction:reverse]"
              />
              <circle
                r="5.5"
                className="animate-hub-travel fill-brand-700"
                style={
                  {
                    "--from": `${ORBIT - BUBBLE - 6}px`,
                    "--to": `${CORE + 8}px`,
                    animationDelay: `${-(i * 0.4)}s`,
                  } as React.CSSProperties
                }
              />
            </g>
          );
        })}
      </svg>

      {/* The record: maroon, with a soft pulse. */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: `${((CORE * 2) / 600) * 100}%`, aspectRatio: "1" }}
      >
        <span aria-hidden className="animate-ping-soft absolute inset-0 rounded-full bg-brand-600/50" />
        <m.div
          className="relative grid size-full place-items-center content-center gap-1 rounded-full border-[3px] border-ink-950 bg-brand-800 text-center text-white shadow-[5px_6px_0_var(--color-ink-950)]"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
        >
          <span className="grid size-11 place-items-center rounded-2xl bg-cream-25 p-1 [--spot-tile:var(--color-cream-25)] sm:size-14">
            <SpotIdCard className="size-full" />
          </span>
          <span className="font-display text-[clamp(0.8rem,2.6vw,1.2rem)] leading-none font-semibold">One record</span>
          <span className="font-hand text-[clamp(0.85rem,2.6vw,1.2rem)] leading-none font-bold text-marigold-300">
            per person
          </span>
        </m.div>
      </div>

      {/* The modules: they bloom in one by one, then bob. */}
      {MODULES.map((mod, i) => {
        const a = ((i * 45 - 90) * Math.PI) / 180;
        const Icon = mod.icon;
        return (
          <div
            key={mod.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: pct(ORBIT * Math.cos(a)),
              top: pct(ORBIT * Math.sin(a)),
              width: `${((BUBBLE * 2) / 600) * 100}%`,
              aspectRatio: "1",
            }}
          >
            <m.div
              className="size-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.25 + i * 0.08 }}
            >
              <div
                className={cn(
                  "animate-bob grid size-full place-items-center content-center gap-0.5 rounded-full border-[3px] border-ink-950 text-ink-950 shadow-[3px_4px_0_var(--color-ink-950)]",
                  mod.fill,
                )}
                style={{ "--bob-r": mod.tilt, animationDelay: `${-i * 0.6}s` } as React.CSSProperties}
              >
                <Icon className="size-8 sm:size-11" />
                <span className="text-[0.48rem] leading-none font-extrabold tracking-tight uppercase sm:text-[0.6rem] sm:tracking-normal">
                  {mod.label}
                </span>
              </div>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
