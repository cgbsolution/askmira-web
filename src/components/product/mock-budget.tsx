import { BookOpen, Laptop, ShieldCheck, Sparkles, TrendingUp, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";

import { MockCard, MockFrame, MockPanel, MockShell, Meter, Status } from "./primitives";

/*
 * Budget intelligence for a department manager — a CONCEPT. Department budgets,
 * headcount and the hiring check exist in AskMira today; spend from Expense
 * Genie and ProcureFlow and the Saleinx forecast in one view do not. The frame
 * says "Concept preview" so nobody mistakes it for a shipped screen.
 *
 * One coherent sample: Sales West, FY 2026-27, seven months in (Apr–Oct).
 *   budget 3,80,00,000 · spent 1,98,00,000 · committed POs 18,40,000 · pending 6,20,000
 *   remaining = 3.80 Cr − 1.98 Cr − 18.4 L − 6.2 L = 1.574 Cr
 *   run rate 1.98 Cr / 7 = 28.29 L a month → Nov–Mar 1.414 Cr
 *   forecast = spent + committed + pending + 1.414 Cr = 3.64 Cr → headroom ≈ 16.0 L
 *   two hires from 1 Dec: 2 × 9.6 L × 4/12 = 6.4 L; recruiting 0.6 L; laptops 1.3 L; CRM seats 0.24 L
 *   plan this year 8.54 L → headroom after ≈ 7.46 L
 */

const LAKH = 100000;
const BUDGET = 380 * LAKH;
const SPENT = 198 * LAKH;
const COMMITTED = 18.4 * LAKH;
const PENDING = 6.2 * LAKH;
const REMAINING = BUDGET - SPENT - COMMITTED - PENDING;

/** ₹ in lakh or crore, the way Indian finance teams read it. */
function inr(value: number): string {
  if (value >= 100 * LAKH) return `₹${(value / (100 * LAKH)).toFixed(2)} Cr`;
  return `₹${(value / LAKH).toFixed(value % LAKH === 0 ? 0 : 1)} L`;
}

const EXPENSES = [
  { m: "Apr", v: 3.1 },
  { m: "May", v: 2.8 },
  { m: "Jun", v: 3.4 },
  { m: "Jul", v: 3.0 },
  { m: "Aug", v: 3.6 },
  { m: "Sep", v: 3.9 },
  { m: "Oct", v: 4.2 },
];

function ConceptTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-marigold-100 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-marigold-900 uppercase",
        className,
      )}
    >
      Concept preview · sample data
    </span>
  );
}

export function BudgetIntelligenceMock({ className }: { className?: string }) {
  const segments = [
    { label: "Spent", value: SPENT, tone: "bg-ink-800" },
    { label: "Committed POs", value: COMMITTED, tone: "bg-brand-500" },
    { label: "Pending requests", value: PENDING, tone: "bg-marigold-400" },
    { label: "Remaining", value: REMAINING, tone: "bg-cream-200" },
  ];
  const maxExpense = Math.max(...EXPENSES.map((e) => e.v));
  return (
    <MockFrame
      label="Concept preview of a manager's budget view for Sales West: budget, spend, commitments, remaining budget, headcount, hiring cost and expense trend, with sample data"
      className={className}
      tag={<ConceptTag className="ml-auto" />}
    >
      <MockShell active="payroll">
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-auto">
            <p className="text-sm font-semibold">Sales West · budget</p>
            <p className="text-[10px] text-ink-400">FY 2026-27 · 7 of 12 months · cost centre CC-SW</p>
          </div>
          <Status tone="success">On track</Status>
        </div>

        <div className="mt-3 rounded-xl border border-cream-200 bg-white p-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] text-ink-400">Annual budget</p>
            <p className="text-sm font-semibold tabular-nums">{inr(BUDGET)}</p>
          </div>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full">
            {segments.map((s) => (
              <span key={s.label} className={s.tone} style={{ width: `${(s.value / BUDGET) * 100}%` }} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 @xl:grid-cols-4">
            {segments.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-[10px]">
                <span className={cn("size-2 shrink-0 rounded-sm", s.tone)} />
                <span className="text-ink-500">{s.label}</span>
                <span className="ml-auto font-semibold tabular-nums">{inr(s.value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 grid gap-2 @lg:grid-cols-3">
          <MockCard title="Headcount">
            <p className="text-lg font-semibold tabular-nums">
              16 <span className="text-[11px] font-normal text-ink-400">of 18 approved</span>
            </p>
            <Meter value={(16 / 18) * 100} tone="ink" className="mt-1.5" />
            <p className="mt-1.5 text-[9px] text-ink-400">Planned: 18 by 1 December</p>
          </MockCard>
          <MockCard title="Forecast to March" action={<TrendingUp className="size-3 text-success" />}>
            <p className="text-lg font-semibold tabular-nums">{inr(SPENT + COMMITTED + PENDING + 141.4 * LAKH)}</p>
            <p className="text-[9px] text-ink-400">At the current run rate · {inr(16 * LAKH)} headroom</p>
            <p className="mt-1.5 text-[9px] text-ink-500">
              CRM pipeline: <span className="font-semibold text-success-600">+28%</span> vs plan
            </p>
          </MockCard>
          <MockCard title="Expenses by month">
            <div className="flex h-12 items-end gap-1">
              {EXPENSES.map((e, i) => (
                <span
                  key={e.m}
                  className={cn("flex-1 rounded-t-sm", i === EXPENSES.length - 1 ? "bg-brand-500" : "bg-blush-200")}
                  style={{ height: `${(e.v / maxExpense) * 100}%` }}
                />
              ))}
            </div>
            <p className="mt-1 text-[9px] text-ink-400">₹4.2 L in October · from Expense Genie</p>
          </MockCard>
        </div>

        <MockCard title="Plan: two Account Executives from 1 December" className="mt-2" action={<Status tone="info">Draft</Status>}>
          <div className="grid gap-x-4 gap-y-1 text-[10px] @xl:grid-cols-2">
            {[
              [UserPlus, "Salaries, Dec–Mar (2 × ₹9.6 L CTC)", 6.4],
              [Sparkles, "Recruiting (AnytimeHire)", 0.6],
              [Laptop, "2 laptops (ProcureFlow quote)", 1.3],
              [BookOpen, "2 CRM seats", 0.24],
            ].map(([Icon, label, v]) => {
              const I = Icon as typeof UserPlus;
              return (
                <div key={label as string} className="flex items-center gap-2 border-b border-cream-100 py-1">
                  <I className="size-3 text-ink-400" />
                  <span className="text-ink-600">{label as string}</span>
                  <span className="ml-auto font-medium tabular-nums">₹{(v as number).toFixed(2)} L</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="font-semibold">This year: ₹8.54 L</span>
            <span className="text-ink-400">·</span>
            <span className="text-success-600">Within budget, ≈ ₹7.5 L headroom left</span>
            <span className="ml-auto rounded-lg bg-brand-500 px-2.5 py-1 font-semibold text-white">Raise requisition</span>
          </div>
        </MockCard>
      </MockShell>
    </MockFrame>
  );
}

/** Mira explaining the decision — also a concept: Mira cannot read budgets yet. */
export function MiraBudgetMock({ className }: { className?: string }) {
  return (
    <MockPanel
      label="Concept preview of Ask Mira explaining whether a department can afford two hires and which approvals the requisition needs, with sample data"
      className={className}
    >
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <Sparkles className="size-4 text-marigold-600" />
        <p className="text-xs font-semibold">Ask Mira</p>
        <ConceptTag className="ml-auto" />
      </div>
      <div className="space-y-3 bg-cream-50/60 px-4 py-4 text-[11px]">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 px-3 py-2 text-white">
          Can Sales West afford two more Account Executives?
        </p>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-cream-200 bg-white px-3 py-2.5 text-ink-700">
          <p>
            Yes, this year. Two hires from 1 December cost about <strong className="text-ink-900">₹8.54 L</strong> to
            March, including recruiting and laptops. At your current run rate that leaves roughly{" "}
            <strong className="text-ink-900">₹7.5 L</strong> of headroom.
          </p>
          <p className="mt-2">Next year they add about ₹19.2 L in salaries, so the FY 2027-28 budget should include them.</p>
          <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-cream-50 p-2 text-[10px] text-ink-600">
            <ShieldCheck className="mt-px size-3 shrink-0 text-success" />
            You have 2 unfilled approved seats, so no new headcount approval is needed. The requisition still goes to HR
            and then Finance.
          </p>
        </div>
      </div>
    </MockPanel>
  );
}
