import { CalendarDays, CheckCircle2, Inbox, LogIn, MapPin, Sparkles, UserPlus, UsersRound } from "lucide-react";

import { MockCard, MockFrame, MockShell, Meter, Person, StatTile, Status } from "./primitives";

/** The home page an HR admin lands on. */
export function DashboardMock({ className }: { className?: string }) {
  return (
    <MockFrame
      label="Preview of the AskMira home page for an HR admin: headcount, approvals waiting, punch-in card, payroll status and leave balances, with sample data"
      className={className}
    >
      <MockShell active="home">
        <div className="rounded-xl border border-cream-200 bg-gradient-to-r from-blush-50 via-white to-marigold-50 p-3 @2xl:p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Person name="Priya Ramesh" size="lg" className="hidden @md:flex" />
            <div className="min-w-0">
              <p className="text-[10px] text-ink-400">Monday, 26 October</p>
              <p className="font-display text-xl leading-tight font-semibold tracking-tight @2xl:text-2xl">
                Good morning, Priya
              </p>
              <p className="text-[11px] text-ink-500">3 approvals are waiting for you.</p>
            </div>
            <div className="ml-auto hidden gap-2 @xl:flex">
              <span className="rounded-lg border border-cream-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold">
                Apply leave
              </span>
              <span className="rounded-lg bg-marigold-500 px-2.5 py-1.5 text-[10px] font-semibold text-ink-950">
                Give a shoutout
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 @xl:grid-cols-4">
          <StatTile label="Headcount" value="248" hint="Active, on notice and on leave" icon={UsersRound} />
          <StatTile label="New hires" value="6" hint="Joined in the last 30 days" icon={UserPlus} />
          <StatTile label="On leave today" value="9" hint="People on approved leave" icon={CalendarDays} />
          <StatTile label="Awaiting approval" value="3" hint="In your approvals inbox" icon={Inbox} />
        </div>

        <div className="mt-3 grid gap-2 @3xl:grid-cols-[1.35fr_1fr]">
          <MockCard>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-semibold tracking-wide text-ink-400 uppercase">Monday, 26 October</p>
                <p className="font-display text-2xl leading-tight font-semibold tabular-nums">09:24:18 am</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="rounded-full border border-cream-200 px-1.5 py-0.5 text-[9px]">General shift · 09:30–18:30</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-1.5 text-[11px] font-semibold text-white">
                  <LogIn className="size-3" /> Punch in
                </span>
                <p className="mt-1 flex items-center justify-end gap-1 text-[9px] text-ink-400">
                  <MapPin className="size-2.5" /> Inside Bengaluru HQ
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[9px] text-ink-400">
              <span>
                Worked today <span className="text-sm font-semibold text-ink-900">0m</span> of 8h
              </span>
              <span>No punch yet</span>
            </div>
            <Meter value={4} tone="ink" className="mt-1" />
          </MockCard>

          <MockCard title="October payroll" action={<Status tone="info">In progress</Status>}>
            <ol className="space-y-1.5">
              {[
                { step: "Attendance locked", done: true },
                { step: "Salaries computed", done: true },
                { step: "Review 248 payslips", done: false },
                { step: "Approve and bank file", done: false },
              ].map(({ step, done }) => (
                <li key={step} className="flex items-center gap-2 text-[10px]">
                  {done ? (
                    <CheckCircle2 className="size-3.5 text-success" />
                  ) : (
                    <span className="size-3.5 rounded-full border-2 border-cream-300" />
                  )}
                  <span className={done ? "text-ink-500" : "font-medium text-ink-800"}>{step}</span>
                </li>
              ))}
            </ol>
          </MockCard>
        </div>

        <div className="mt-2 grid gap-2 @xl:grid-cols-3">
          <MockCard title="Leave balance">
            {[
              { type: "Earned leave", used: 12, of: 18 },
              { type: "Sick leave", used: 9, of: 12 },
              { type: "Casual leave", used: 4, of: 8 },
            ].map((l) => (
              <div key={l.type} className="mb-1.5 last:mb-0">
                <div className="flex justify-between text-[10px]">
                  <span>{l.type}</span>
                  <span className="text-ink-400">
                    <span className="font-semibold text-ink-800">{l.used}</span> of {l.of}
                  </span>
                </div>
                <Meter value={(l.used / l.of) * 100} tone="brand" className="mt-1" />
              </div>
            ))}
          </MockCard>
          <MockCard title="Who's out today" className="hidden @xl:block">
            <div className="space-y-1.5">
              {["Arjun Mehta", "Sneha Kulkarni", "Kavya Reddy"].map((n, i) => (
                <div key={n} className="flex items-center gap-2 text-[10px]">
                  <Person name={n} size="xs" />
                  <span className="truncate">{n}</span>
                  <span className="ml-auto text-ink-400">{["Earned", "Sick", "Comp-off"][i]}</span>
                </div>
              ))}
            </div>
          </MockCard>
          <MockCard title="Ask Mira" className="hidden @xl:block">
            <div className="rounded-lg bg-cream-50 p-2 text-[10px] text-ink-600">
              <Sparkles className="mb-1 size-3 text-marigold-600" />
              Who is on leave this week?
            </div>
            <p className="mt-1.5 text-[10px] text-ink-500">9 people today · Arjun, Sneha, Kavya and 6 more</p>
          </MockCard>
        </div>
      </MockShell>
    </MockFrame>
  );
}
