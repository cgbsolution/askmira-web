import {
  BookOpenCheck,
  Check,
  CheckCircle2,
  CircleDashed,
  Download,
  FileText,
  Landmark,
  Paperclip,
  Receipt,
  TriangleAlert,
} from "lucide-react";

import { cn, formatINR } from "@/lib/utils";

import { MockCard, MockFrame, MockPanel, MockShell, Person, SampleTag, Status } from "./primitives";

const STEPS = ["Attendance locked", "Computed", "Review", "Approve", "Pay"] as const;

export function PayrollMock({ className }: { className?: string }) {
  const current = 2;
  return (
    <MockFrame label="Preview of an October payroll run at the review step: 248 employees, gross, deductions and net pay, statutory deductions and exceptions to review, with sample data" className={className}>
      <MockShell active="payroll">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold">Payroll · October 2026</p>
          <Status tone="info">Review</Status>
          <span className="ml-auto rounded-lg bg-brand-500 px-2.5 py-1.5 text-[10px] font-semibold text-white">Approve run</span>
        </div>
        <ol className="mt-3 flex items-center gap-1">
          {STEPS.map((s, i) => (
            <li key={s} className="flex min-w-0 flex-1 items-center gap-1">
              <span
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full text-[8px] font-bold",
                  i < current && "bg-success text-white",
                  i === current && "bg-ink-900 text-white",
                  i > current && "border border-cream-300 bg-white text-ink-300",
                )}
              >
                {i < current ? <Check className="size-2.5" /> : i + 1}
              </span>
              <span className={cn("hidden truncate text-[9px] @lg:block", i === current ? "font-semibold" : "text-ink-400")}>{s}</span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-cream-200" />}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid grid-cols-2 gap-2 @xl:grid-cols-4">
          {[
            ["Employees", "248"],
            ["Gross pay", formatINR(14862400)],
            ["Deductions", formatINR(1984210)],
            ["Net pay", formatINR(12878190)],
          ].map(([k = "", v]) => (
            <div key={k} className="rounded-xl border border-cream-200 bg-white p-2.5">
              <p className="text-[9px] text-ink-400">{k}</p>
              <p className="mt-0.5 truncate text-sm font-semibold tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 @2xl:grid-cols-2">
          <MockCard title="Statutory deductions">
            {[
              ["Provident Fund", 912600],
              ["ESI", 42310],
              ["Professional tax", 49400],
              ["TDS on salary", 979900],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-cream-100 py-1 text-[10px] last:border-0">
                <span className="text-ink-600">{k}</span>
                <span className="font-medium tabular-nums">{formatINR(v as number)}</span>
              </div>
            ))}
          </MockCard>
          <MockCard title="To review" action={<Status tone="warning">3</Status>}>
            {[
              ["Aditya Verma", "New joiner · 19 of 31 days"],
              ["Vikram Singh", "On notice · settlement next month"],
              ["Kavya Reddy", "Gross crossed the ESI wage limit"],
            ].map(([n = "", why]) => (
              <div key={n} className="flex items-center gap-2 py-1 text-[10px]">
                <Person name={n} size="xs" />
                <span className="min-w-0">
                  <span className="block font-medium">{n}</span>
                  <span className="block truncate text-[9px] text-ink-400">{why}</span>
                </span>
              </div>
            ))}
          </MockCard>
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function StatutoryMock({ className }: { className?: string }) {
  const rows = [
    { name: "PF · ECR file", due: "15 Nov", status: "Ready" as const },
    { name: "ESI contribution", due: "15 Nov", status: "Ready" as const },
    { name: "TDS challan", due: "7 Nov", status: "Ready" as const },
    { name: "Professional tax · 3 states", due: "As per state", status: "Ready" as const },
    { name: "Form 24Q · Q2", due: "31 Oct", status: "Filed" as const },
    { name: "Form 16", due: "15 Jun", status: "Upcoming" as const },
  ];
  const tone = { Ready: "success", Filed: "muted", Upcoming: "info" } as const;
  return (
    <MockPanel label="Preview of the statutory filings for October: PF ECR, ESI, TDS challan, professional tax, Form 24Q and Form 16 with due dates and status, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <Landmark className="size-4 text-brand-700" />
        <p className="text-xs font-semibold">Statutory · October 2026</p>
        <SampleTag className="ml-auto" />
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 border-b border-cream-100 px-4 py-2.5 text-[10px] last:border-0">
            <FileText className="size-3.5 shrink-0 text-ink-300" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-ink-800">{r.name}</span>
              <span className="block text-[9px] text-ink-400">Due {r.due}</span>
            </span>
            <Status tone={tone[r.status]}>{r.status}</Status>
            {r.status === "Ready" && <Download className="size-3.5 text-ink-400" />}
          </li>
        ))}
      </ul>
    </MockPanel>
  );
}

export function PayslipMock({ className }: { className?: string }) {
  const earnings = [
    ["Basic", 40000],
    ["House rent allowance", 20000],
    ["Special allowance", 18500],
  ] as const;
  const deductions = [
    ["Provident Fund", 1800],
    ["Professional tax", 200],
    ["Income tax (TDS)", 4350],
  ] as const;
  const gross = earnings.reduce((s, [, v]) => s + v, 0);
  const ded = deductions.reduce((s, [, v]) => s + v, 0);
  return (
    <MockPanel label="Preview of an October payslip with earnings, deductions and net pay, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold">Payslip · October 2026</p>
          <p className="text-[10px] text-ink-400">Meera Nair · DEMO004 · 31 paid days</p>
        </div>
        <SampleTag className="ml-auto" />
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 py-3 text-[10px]">
        {[
          ["Earnings", earnings, gross],
          ["Deductions", deductions, ded],
        ].map(([title, lines, total]) => (
          <div key={title as string}>
            <p className="mb-1 text-[9px] font-semibold tracking-wide text-ink-400 uppercase">{title as string}</p>
            {(lines as readonly (readonly [string, number])[]).map(([k, v]) => (
              <div key={k} className="flex justify-between py-0.5">
                <span className="truncate pr-2 text-ink-600">{k}</span>
                <span className="tabular-nums">{formatINR(v)}</span>
              </div>
            ))}
            <div className="mt-1 flex justify-between border-t border-cream-100 pt-1 font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{formatINR(total as number)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-cream-50 px-4 py-3">
        <div>
          <p className="text-[9px] text-ink-400">Net pay</p>
          <p className="text-lg font-semibold text-ink-950 tabular-nums">{formatINR(gross - ded)}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg border border-cream-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold">
          <Download className="size-3" /> PDF
        </span>
      </div>
    </MockPanel>
  );
}

export function BankFileMock({ className }: { className?: string }) {
  return (
    <MockPanel label="Preview of a salary bank file in HDFC format with checks passed, and a payroll journal ready for Tally, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <Landmark className="size-4 text-brand-700" />
        <p className="text-xs font-semibold">Bank file · October 2026</p>
        <SampleTag className="ml-auto" />
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 py-3 text-[10px]">
        <div>
          <p className="text-ink-400">Format</p>
          <p className="font-semibold">HDFC · NEFT</p>
        </div>
        <div>
          <p className="text-ink-400">Records</p>
          <p className="font-semibold">247 · 1 held</p>
        </div>
        <div>
          <p className="text-ink-400">Total</p>
          <p className="font-semibold tabular-nums">{formatINR(12805040)}</p>
        </div>
      </div>
      <ul className="space-y-1.5 px-4 pb-3 text-[10px]">
        {["Account numbers and IFSC checked", "Names shortened at a word boundary", "Held salary left out"].map((c) => (
          <li key={c} className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-success" /> {c}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2 border-t border-cream-100 px-4 py-3 text-[10px]">
        <span className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-2.5 py-1.5 font-semibold text-white">
          <Download className="size-3" /> HDFC_SAL_OCT2026.txt
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-cream-200 px-2.5 py-1.5 font-semibold">
          <BookOpenCheck className="size-3" /> Journal for Tally · 14 ledgers
        </span>
      </div>
    </MockPanel>
  );
}

export function ExpenseMock({ className }: { className?: string }) {
  const lines = [
    { what: "Cab · airport to client office", amount: 1240, note: "Receipt attached", warn: false },
    { what: "Hotel · 1 night, Pune", amount: 4800, note: "GST invoice captured", warn: false },
    { what: "Meals · 2 days", amount: 1950, note: "₹450 above the daily limit", warn: true },
  ];
  const total = lines.reduce((s, l) => s + l.amount, 0);
  return (
    <MockPanel label="Preview of an expense claim with receipts, a policy limit warning and its approval chain, with sample data" className={className}>
      <div className="flex items-center gap-3 border-b border-cream-100 px-4 py-3">
        <span className="grid size-8 place-items-center rounded-lg bg-marigold-50 text-marigold-800">
          <Receipt className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">Client visit — Pune</p>
          <p className="text-[10px] text-ink-400">Kavya Reddy · 3 items</p>
        </div>
        <SampleTag className="ml-auto" />
      </div>
      <ul>
        {lines.map((l) => (
          <li key={l.what} className="flex items-start gap-3 border-b border-cream-100 px-4 py-2.5 text-[10px]">
            <Paperclip className="mt-0.5 size-3 shrink-0 text-ink-300" />
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-ink-800">{l.what}</span>
              <span className={cn("flex items-center gap-1 text-[9px]", l.warn ? "text-marigold-800" : "text-ink-400")}>
                {l.warn && <TriangleAlert className="size-2.5" />}
                {l.note}
              </span>
            </span>
            <span className="font-semibold tabular-nums">{formatINR(l.amount)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between px-4 py-3 text-[10px]">
        <span className="text-ink-400">Total claimed</span>
        <span className="text-sm font-semibold tabular-nums">{formatINR(total)}</span>
      </div>
      <div className="flex items-center gap-2 bg-cream-50 px-4 py-3 text-[10px]">
        <span className="flex items-center gap-1 font-medium text-success-600">
          <CheckCircle2 className="size-3.5" /> Manager
        </span>
        <span className="h-px w-4 bg-cream-300" />
        <span className="flex items-center gap-1 font-medium text-ink-600">
          <CircleDashed className="size-3.5" /> Finance review
        </span>
        <span className="h-px w-4 bg-cream-300" />
        <span className="text-ink-400">Paid with salary</span>
      </div>
    </MockPanel>
  );
}
