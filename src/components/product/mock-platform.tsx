import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock,
  FileSignature,
  House,
  IndianRupee,
  LogIn,
  Mail,
  Receipt,
  SendHorizontal,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import { AskMiraMark } from "@/components/layout/Logo";

import { cn, formatINR } from "@/lib/utils";

import { MockCard, MockFrame, MockPanel, MockShell, Meter, Person, SampleTag, Status } from "./primitives";

const INBOX = [
  { icon: CalendarDays, type: "Leave", who: "Arjun Mehta", what: "3 days · 28–30 Oct" },
  { icon: Clock, type: "Attendance", who: "Meera Nair", what: "Missed punch-out · 14 Oct" },
  { icon: Receipt, type: "Expense", who: "Kavya Reddy", what: `Client visit · ${formatINR(7990)}` },
  { icon: UserRoundPen, type: "Profile", who: "Sneha Kulkarni", what: "Bank account change" },
];

export function WorkflowMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of the approvals inbox with leave, attendance, expense and profile requests, a two-level approval chain and an approval email, with sample data" className={className}>
      <MockShell active="approvals">
        <div className="grid gap-2 @2xl:grid-cols-[1.3fr_1fr]">
          <MockCard title="Approvals" action={<Status tone="secondary">4 waiting</Status>}>
            <ul className="-mx-1">
              {INBOX.map((r, i) => (
                <li
                  key={r.type}
                  className={cn("flex items-center gap-2 rounded-lg px-1 py-1.5 text-[10px]", i === 2 && "bg-blush-50")}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-cream-100 text-ink-600">
                    <r.icon className="size-3" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.who}</span>
                    <span className="block truncate text-[9px] text-ink-400">{r.what}</span>
                  </span>
                  <span className="hidden text-[9px] text-ink-400 @md:block">{r.type}</span>
                </li>
              ))}
            </ul>
          </MockCard>
          <div className="space-y-2">
            <MockCard title="Expense · approval chain">
              <ol className="space-y-2 text-[10px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-success" />
                  <span>
                    <span className="font-medium">Manager</span> · Rahul Iyer approved
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CircleDashed className="size-3.5 text-ink-500" />
                  <span>
                    <span className="font-medium">Finance</span> · waiting for Neha Joshi
                  </span>
                </li>
                <li className="flex items-center gap-2 text-ink-400">
                  <span className="size-3.5 rounded-full border-2 border-cream-300" />
                  Paid with October salary
                </li>
              </ol>
            </MockCard>
            <MockCard>
              <p className="flex items-center gap-1.5 text-[10px] font-semibold">
                <Mail className="size-3 text-brand-700" /> Approval email
              </p>
              <p className="mt-1 text-[9px] text-ink-500">Kavya Reddy&apos;s claim needs your approval.</p>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[9px] font-semibold text-white">Approve</span>
                <span className="rounded-md border border-cream-200 px-2.5 py-1 text-[9px] font-semibold">Reject</span>
              </div>
            </MockCard>
          </div>
        </div>
      </MockShell>
    </MockFrame>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-marigold-100 px-1 font-semibold text-marigold-900">{children}</span>;
}

export function DocumentMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of a letter template with fields filled from the employee record, and how many people have received and acknowledged it, with sample data" className={className}>
      <MockShell active="documents">
        <div className="grid gap-2 @2xl:grid-cols-[1.25fr_1fr]">
          <MockCard title="Template · Appointment letter" action={<Status tone="muted">v4</Status>}>
            <div className="space-y-2 rounded-lg bg-cream-50 p-3 text-[10px] leading-relaxed text-ink-700">
              <p>
                Dear <Field>first_name</Field>,
              </p>
              <p>
                We are pleased to appoint you as <Field>designation</Field> in the <Field>department</Field> team,
                effective <Field>date_of_joining</Field>, at <Field>location</Field>.
              </p>
              <p>
                Your annual cost to company will be <Field>ctc</Field>, as detailed in Annexure A.
              </p>
            </div>
          </MockCard>
          <div className="space-y-2">
            <MockCard title="Issued this week">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["Aditya Verma", "Lakshmi Rao", "Harsh Patel", "Ritika Shah"].map((n) => (
                    <Person key={n} name={n} size="xs" className="ring-2 ring-white" />
                  ))}
                </div>
                <span className="text-[10px] text-ink-500">12 letters</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px]">
                <span>Acknowledged</span>
                <span className="font-semibold tabular-nums">9 of 12</span>
              </div>
              <Meter value={75} tone="success" className="mt-1" />
            </MockCard>
            <MockCard>
              <p className="flex items-center gap-1.5 text-[10px] font-semibold">
                <FileSignature className="size-3 text-ink-500" /> Aadhaar eSign
              </p>
              <p className="mt-1 text-[9px] text-ink-400">In pilot · switched on per workspace</p>
            </MockCard>
          </div>
        </div>
      </MockShell>
    </MockFrame>
  );
}

/** Ask Mira answering a policy question with its source, then a personal one. */
export function MiraChatMock({ className }: { className?: string }) {
  return (
    <MockPanel label="Preview of Ask Mira answering a leave policy question with the policy section quoted, then the employee's own balance, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <AskMiraMark className="h-6" />
        <p className="text-xs font-semibold">Ask Mira</p>
        <SampleTag className="ml-auto" />
      </div>
      <div className="space-y-3 bg-cream-50/60 px-4 py-4 text-[11px]">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 px-3 py-2 text-white">
          How many earned leaves can I carry forward?
        </p>
        <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-cream-200 bg-white px-3 py-2.5 text-ink-700">
          <p>
            You can carry forward up to <strong className="text-ink-900">30 days</strong> of earned leave into the next
            year. Anything above that lapses on 31 March unless you encash it.
          </p>
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-cream-100 px-2 py-0.5 text-[9px] font-medium text-ink-600">
            <BookOpen className="size-2.5" /> Leave policy 2026 · section 4.2
          </p>
        </div>
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 px-3 py-2 text-white">
          And how many do I have now?
        </p>
        <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-cream-200 bg-white px-3 py-2.5 text-ink-700">
          <p>
            You have <strong className="text-ink-900">12 earned leaves</strong> left this year.
          </p>
          <div className="mt-2 rounded-lg bg-cream-50 p-2">
            <div className="flex justify-between text-[9px]">
              <span>Earned leave</span>
              <span className="font-semibold">12 of 18</span>
            </div>
            <Meter value={66} tone="brand" className="mt-1" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-cream-100 px-3 py-2.5">
        <span className="flex-1 rounded-lg border border-cream-200 px-2.5 py-1.5 text-[10px] text-ink-300">Ask a question</span>
        <span className="grid size-7 place-items-center rounded-lg bg-brand-500 text-white">
          <SendHorizontal className="size-3.5" />
        </span>
      </div>
    </MockPanel>
  );
}

export function MobileMock({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Preview of AskMira on a phone: punch in, leave balances and the latest payslip, with sample data"
      className={cn("mx-auto w-full max-w-[17rem] font-ui text-ink-900 select-none", className)}
    >
      <div aria-hidden className="rounded-[2.25rem] border-[7px] border-ink-900 bg-ink-900 shadow-float">
        <div className="overflow-hidden rounded-[1.75rem] bg-cream-50">
          <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-semibold">
            <span>9:24</span>
            <span className="h-4 w-16 rounded-full bg-ink-900" />
            <span>5G</span>
          </div>
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-ink-400">Monday, 26 October</p>
                <p className="font-display text-lg leading-tight font-semibold">Hi Meera</p>
              </div>
              <Person name="Meera Nair" size="sm" />
            </div>
            <div className="mt-3 rounded-2xl bg-ink-900 p-3 text-white">
              <p className="text-[9px] text-ink-300">General shift · 09:30–18:30</p>
              <p className="font-display text-xl font-semibold tabular-nums">09:24</p>
              <span className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-brand-500 py-2 text-[11px] font-semibold">
                <LogIn className="size-3.5" /> Punch in
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
              {[
                ["12", "Earned"],
                ["9", "Sick"],
                ["4", "Casual"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-cream-200 bg-white py-2">
                  <p className="text-sm font-semibold">{n}</p>
                  <p className="text-[8px] text-ink-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-cream-200 bg-white p-2.5">
              <span className="grid size-7 place-items-center rounded-lg bg-success-50 text-success-600">
                <IndianRupee className="size-3.5" />
              </span>
              <div className="min-w-0 text-[10px]">
                <p className="font-semibold">October payslip</p>
                <p className="text-[9px] text-ink-400">Ready to view</p>
              </div>
              <SampleTag className="ml-auto" />
            </div>
          </div>
          <div className="grid grid-cols-4 border-t border-cream-200 bg-white py-2 text-center text-[8px] text-ink-400">
            {[
              [House, "Home", true],
              [Clock, "Time", false],
              [IndianRupee, "Pay", false],
              [UserRound, "Me", false],
            ].map(([Icon, l, active]) => {
              const I = Icon as typeof House;
              return (
                <span key={l as string} className={cn("flex flex-col items-center gap-0.5", active && "font-semibold text-brand-600")}>
                  <I className="size-3.5" />
                  {l as string}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
