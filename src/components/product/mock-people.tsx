import {
  Check,
  Download,
  FileSpreadsheet,
  Filter,
  Lock,
  Minus,
  ScrollText,
  Search,
  TriangleAlert,
  Upload,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { MockCard, MockFrame, MockPanel, MockShell, Person, SampleTag, Status } from "./primitives";

const PEOPLE = [
  { name: "Meera Nair", code: "DEMO004", dept: "Design", loc: "Bengaluru HQ", status: "Active" },
  { name: "Arjun Mehta", code: "DEMO006", dept: "Sales", loc: "Mumbai", status: "On leave" },
  { name: "Sneha Kulkarni", code: "DEMO007", dept: "Finance", loc: "Pune", status: "Active" },
  { name: "Aditya Verma", code: "DEMO008", dept: "Engineering", loc: "Bengaluru HQ", status: "Probation" },
  { name: "Kavya Reddy", code: "DEMO011", dept: "Marketing", loc: "Gurugram", status: "Active" },
  { name: "Vikram Singh", code: "DEMO015", dept: "Operations", loc: "Pune Plant", status: "Notice" },
] as const;

const STATUS_TONE = {
  Active: "success",
  "On leave": "info",
  Probation: "warning",
  Notice: "muted",
} as const;

export function DirectoryMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of the people directory with search, filters and employee statuses, with sample data" className={className}>
      <MockShell active="people">
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-auto text-sm font-semibold">Directory</p>
          <span className="flex h-7 items-center gap-1 rounded-md border border-cream-200 bg-white px-2 text-[10px] text-ink-400">
            <Search className="size-3" /> Search 248 people
          </span>
          <span className="hidden h-7 items-center gap-1 rounded-md border border-cream-200 bg-white px-2 text-[10px] @lg:flex">
            <Filter className="size-3" /> Department
          </span>
          <span className="hidden h-7 items-center gap-1 rounded-md border border-cream-200 bg-white px-2 text-[10px] @lg:flex">
            <Download className="size-3" /> Export
          </span>
        </div>
        <div className="mt-2 overflow-hidden rounded-xl border border-cream-200 bg-white">
          <div className="grid grid-cols-[1.6fr_1fr_auto] gap-2 bg-cream-50 px-3 py-2 text-[9px] font-semibold tracking-wide text-ink-400 uppercase @lg:grid-cols-[1.6fr_1fr_1fr_auto]">
            <span>Employee</span>
            <span>Department</span>
            <span className="hidden @lg:block">Location</span>
            <span>Status</span>
          </div>
          {PEOPLE.map((p) => (
            <div
              key={p.code}
              className="grid grid-cols-[1.6fr_1fr_auto] items-center gap-2 border-t border-cream-100 px-3 py-2 text-[10px] @lg:grid-cols-[1.6fr_1fr_1fr_auto]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Person name={p.name} size="xs" />
                <span className="min-w-0">
                  <span className="block truncate font-medium text-ink-800">{p.name}</span>
                  <span className="block text-[9px] text-ink-400">{p.code}</span>
                </span>
              </span>
              <span className="truncate text-ink-600">{p.dept}</span>
              <span className="hidden truncate text-ink-600 @lg:block">{p.loc}</span>
              <Status tone={STATUS_TONE[p.status]}>{p.status}</Status>
            </div>
          ))}
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function ProfileMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of an employee profile with job details, masked statutory IDs and a pending bank change request, with sample data" className={className}>
      <MockShell active="people">
        <div className="grid gap-2 @xl:grid-cols-[0.8fr_1.4fr]">
          <MockCard>
            <div className="flex flex-col items-center text-center">
              <Person name="Meera Nair" size="lg" />
              <p className="mt-2 text-sm font-semibold">Meera Nair</p>
              <p className="text-[10px] text-ink-500">Product Designer · Design</p>
              <div className="mt-2 flex gap-1">
                <Status tone="success">Active</Status>
                <Status tone="muted">DEMO004</Status>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 border-t border-cream-100 pt-2 text-[10px]">
              {[
                ["Location", "Bengaluru HQ"],
                ["Reports to", "Rahul Iyer"],
                ["Joined", "12 Jun 2023"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-ink-400">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </MockCard>
          <div className="space-y-2">
            <div className="flex gap-1 overflow-hidden rounded-full bg-blush-100 p-0.5 text-[10px] font-medium">
              {["Overview", "Job", "Pay", "Documents", "Timeline"].map((t) => (
                <span
                  key={t}
                  className={cn("rounded-full px-2.5 py-1 text-blush-800", t === "Job" && "bg-white text-ink-900 shadow-soft")}
                >
                  {t}
                </span>
              ))}
            </div>
            <MockCard>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px]">
                {[
                  ["Employment type", "Full-time"],
                  ["Grade", "L3"],
                  ["Notice period", "60 days"],
                  ["Legal entity", "LE01"],
                  ["PAN", "•••••• 412F"],
                  ["UAN", "1012 •••• 7788"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-ink-400">{k}</p>
                    <p className="font-medium text-ink-800">{v}</p>
                  </div>
                ))}
              </div>
            </MockCard>
            <MockCard title="Change request" action={<Status tone="warning">Waiting for HR</Status>}>
              <p className="text-[10px] text-ink-500">Bank account</p>
              <div className="mt-1 flex items-center gap-2 text-[10px]">
                <span className="rounded bg-cream-100 px-1.5 py-0.5 text-ink-500 line-through">HDFC •• 4421</span>
                <span className="text-ink-300">→</span>
                <span className="rounded bg-success-50 px-1.5 py-0.5 font-medium text-success-600">ICICI •• 9083</span>
                <span className="ml-auto hidden gap-1 @md:flex">
                  <span className="rounded-md border border-cream-200 px-2 py-0.5">Reject</span>
                  <span className="rounded-md bg-brand-500 px-2 py-0.5 font-semibold text-white">Approve</span>
                </span>
              </div>
            </MockCard>
          </div>
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function ImportMock({ className }: { className?: string }) {
  return (
    <MockPanel label="Preview of an Excel import result: 208 of 212 rows added and 4 rows returned with reasons, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <span className="grid size-8 place-items-center rounded-lg bg-success-50 text-success-600">
          <FileSpreadsheet className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">employees_october.xlsx</p>
          <p className="text-[10px] text-ink-400">Add employees · Many from Excel</p>
        </div>
        <SampleTag className="ml-auto" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-cream-100 border-b border-cream-100 text-center">
        {[
          ["212", "rows read", "text-ink-900"],
          ["208", "added", "text-success-600"],
          ["4", "not added", "text-marigold-800"],
        ].map(([n, l, c]) => (
          <div key={l} className="py-3">
            <p className={cn("text-lg font-semibold tabular-nums", c)}>{n}</p>
            <p className="text-[10px] text-ink-400">{l}</p>
          </div>
        ))}
      </div>
      <ul className="space-y-1.5 p-4">
        {[
          ["Row 18", "Email already in use by another login"],
          ["Row 43", "Joining date is missing"],
          ["Row 77", "Reporting manager not found in this sheet or in AskMira"],
          ["Row 102", "'31-02-2024' is not a date (use DD-MM-YYYY)"],
        ].map(([row, msg]) => (
          <li key={row} className="flex items-start gap-2 text-[10px]">
            <TriangleAlert className="mt-px size-3 shrink-0 text-marigold-600" />
            <span className="font-semibold text-ink-800">{row}</span>
            <span className="text-ink-500">{msg}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 border-t border-cream-100 px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-2.5 py-1.5 text-[10px] font-semibold text-white">
          <Download className="size-3" /> Download rows not added
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-cream-200 px-2.5 py-1.5 text-[10px] font-semibold">
          <Upload className="size-3" /> Upload fixed rows
        </span>
      </div>
    </MockPanel>
  );
}

type Reach = "full" | "team" | "own" | "none";

const MATRIX: { area: string; reach: [Reach, Reach, Reach, Reach] }[] = [
  { area: "Employee records", reach: ["full", "full", "team", "own"] },
  { area: "Salaries and payslips", reach: ["full", "full", "none", "own"] },
  { area: "Payroll runs", reach: ["full", "full", "none", "none"] },
  { area: "Leave and attendance approvals", reach: ["full", "full", "team", "none"] },
  { area: "Workspace settings", reach: ["full", "none", "none", "none"] },
];

function ReachCell({ reach }: { reach: Reach }) {
  if (reach === "none") return <Minus className="mx-auto size-3 text-ink-200" />;
  if (reach === "full") return <Check className="mx-auto size-3.5 text-success" />;
  return (
    <span className="mx-auto block w-fit rounded-full bg-info-50 px-1.5 py-0.5 text-[9px] font-semibold text-info-600">
      {reach === "team" ? "Team" : "Own"}
    </span>
  );
}

export function AccessMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of who can see what: admin, HR sub-admin, manager and employee access by area" className={className}>
      <div className="p-3 @2xl:p-4">
        <p className="text-sm font-semibold">Who can see what</p>
        <p className="text-[10px] text-ink-400">Checked on the server for every screen and every API call.</p>
        <div className="mt-3 overflow-hidden rounded-xl border border-cream-200 bg-white">
          <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-1 bg-cream-50 px-3 py-2 text-center text-[9px] font-semibold tracking-wide text-ink-400 uppercase">
            <span className="text-left">Area</span>
            <span>Admin</span>
            <span>HR</span>
            <span>Manager</span>
            <span>Employee</span>
          </div>
          {MATRIX.map((row) => (
            <div key={row.area} className="grid grid-cols-[1.6fr_repeat(4,1fr)] items-center gap-1 border-t border-cream-100 px-3 py-2 text-[10px]">
              <span className="font-medium text-ink-700">{row.area}</span>
              {row.reach.map((r, i) => (
                <ReachCell key={i} reach={r} />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[9px] text-ink-400">Manager rights follow reporting lines and change when the team changes.</p>
      </div>
    </MockFrame>
  );
}

export function AuditMock({ className }: { className?: string }) {
  const rows = [
    { t: "09:41", who: "Priya Ramesh", what: "updated salary", on: "Arjun Mehta", detail: "Basic ₹42,000 → ₹45,000" },
    { t: "09:38", who: "Rahul Iyer", what: "approved leave", on: "Meera Nair", detail: "28–29 Oct · Earned" },
    { t: "09:30", who: "System", what: "locked attendance", on: "October 2026", detail: "1–31 Oct" },
    { t: "09:12", who: "Neha Joshi", what: "published policy", on: "Travel policy v3", detail: "Acknowledgement requested" },
  ];
  return (
    <MockPanel label="Preview of the insert-only audit log listing who changed what and when, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <ScrollText className="size-4 text-brand-700" />
        <p className="text-xs font-semibold">Audit log</p>
        <SampleTag className="ml-auto" />
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.t + r.what} className="flex items-start gap-3 border-b border-cream-100 px-4 py-2.5 text-[10px] last:border-0">
            <span className="w-8 shrink-0 text-ink-400 tabular-nums">{r.t}</span>
            <span className="min-w-0">
              <span className="font-semibold text-ink-800">{r.who}</span> <span className="text-ink-500">{r.what}</span>{" "}
              <span className="font-medium text-ink-800">{r.on}</span>
              <span className="block text-[9px] text-ink-400">{r.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-1.5 bg-cream-50 px-4 py-2 text-[9px] font-medium text-ink-500">
        <Lock className="size-3" /> Insert-only — entries cannot be edited or deleted
      </div>
    </MockPanel>
  );
}
