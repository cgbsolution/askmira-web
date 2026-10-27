import { Award, CheckCircle2, ExternalLink, EyeOff, Heart, MessageCircle, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { MockCard, MockFrame, MockPanel, MockShell, Meter, Person, SampleTag, Status } from "./primitives";

const STAGES = [
  {
    name: "Applied",
    count: 24,
    people: [
      { n: "Ritika Shah", src: "Careers site" },
      { n: "Manoj Pillai", src: "Talent pool" },
    ],
  },
  {
    name: "Screening",
    count: 9,
    people: [
      { n: "Deepa Menon", src: "Referral" },
      { n: "Sameer Khan", src: "Careers site" },
    ],
  },
  { name: "Interview", count: 6, people: [{ n: "Lakshmi Rao", src: "Slot picked · Thu 11:00" }] },
  { name: "Offer", count: 2, people: [{ n: "Harsh Patel", src: "Offer sent · 2 days ago" }] },
] as const;

export function PipelineMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of a hiring pipeline for a Senior Accountant role, with candidates by stage, sources and interview slots, with sample data" className={className}>
      <MockShell active="hiring">
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-auto min-w-0">
            <p className="text-sm font-semibold">Senior Accountant</p>
            <p className="text-[10px] text-ink-400">Finance · Pune · 2 openings · approved</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border border-cream-200 bg-white px-2 py-1 text-[10px]">
            <ExternalLink className="size-3" /> Careers page
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 @2xl:grid-cols-4">
          {STAGES.map((s, i) => (
            <div key={s.name} className={cn("rounded-xl bg-cream-100/70 p-2", i > 1 && "hidden @2xl:block")}>
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[10px] font-semibold">{s.name}</p>
                <span className="rounded-full bg-white px-1.5 text-[9px] font-semibold text-ink-500">{s.count}</span>
              </div>
              <div className="space-y-1.5">
                {s.people.map((p) => (
                  <div key={p.n} className="rounded-lg border border-cream-200 bg-white p-2">
                    <div className="flex items-center gap-1.5">
                      <Person name={p.n} size="xs" />
                      <span className="truncate text-[10px] font-medium">{p.n}</span>
                    </div>
                    <p className="mt-1 truncate text-[9px] text-ink-400">{p.src}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function OnboardingMock({ className }: { className?: string }) {
  const groups = [
    { team: "HR", tasks: [["Offer letter signed", true], ["PF nomination", false]] },
    { team: "IT", tasks: [["Laptop assigned", true], ["Email account", true]] },
    { team: "Manager", tasks: [["Buddy assigned", true], ["First-week plan", false]] },
    { team: "Joiner", tasks: [["PAN and Aadhaar uploaded", true], ["Bank details", false]] },
  ] as const;
  return (
    <MockPanel label="Preview of a new joiner's onboarding plan with tasks for HR, IT, the manager and the joiner, with sample data" className={className}>
      <div className="flex items-center gap-3 border-b border-cream-100 px-4 py-3">
        <Person name="Aditya Verma" size="md" />
        <div className="min-w-0">
          <p className="text-xs font-semibold">Aditya Verma</p>
          <p className="text-[10px] text-ink-400">Software Engineer · starts Mon 2 Nov</p>
        </div>
        <SampleTag className="ml-auto" />
      </div>
      <div className="px-4 pt-3">
        <div className="flex justify-between text-[10px]">
          <span className="font-semibold">5 of 8 tasks done</span>
          <span className="text-ink-400">6 days to go</span>
        </div>
        <Meter value={62} tone="success" className="mt-1.5" />
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {groups.map((g) => (
          <div key={g.team} className="rounded-xl bg-cream-50 p-2.5">
            <p className="mb-1.5 text-[9px] font-semibold tracking-wide text-ink-400 uppercase">{g.team}</p>
            {g.tasks.map(([t, done]) => (
              <p key={t} className="flex items-center gap-1.5 py-0.5 text-[10px]">
                {done ? (
                  <CheckCircle2 className="size-3 shrink-0 text-success" />
                ) : (
                  <span className="size-3 shrink-0 rounded-full border-2 border-cream-300" />
                )}
                <span className={cn("truncate", done && "text-ink-400")}>{t}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
    </MockPanel>
  );
}

export function PerformanceMock({ className }: { className?: string }) {
  const dist = [
    { r: "1", v: 3 },
    { r: "2", v: 9 },
    { r: "3", v: 52 },
    { r: "4", v: 28 },
    { r: "5", v: 8 },
  ];
  return (
    <MockFrame label="Preview of a review cycle: self and manager review progress, rating distribution before calibration and team completion, with sample data" className={className}>
      <MockShell active="performance">
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-auto text-sm font-semibold">H2 2026 reviews</p>
          <Status tone="info">Manager review</Status>
        </div>
        <div className="mt-3 grid gap-2 @xl:grid-cols-3">
          {[
            ["Self review", 86, "success"],
            ["Manager review", 52, "ink"],
            ["Calibration", 0, "ink"],
          ].map(([k, v, t]) => (
            <div key={k as string} className="rounded-xl border border-cream-200 bg-white p-2.5">
              <div className="flex justify-between text-[10px]">
                <span className="font-medium">{k}</span>
                <span className="text-ink-400 tabular-nums">{v === 0 ? "Not started" : `${v}%`}</span>
              </div>
              <Meter value={v as number} tone={t as "success" | "ink"} className="mt-1.5" />
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 @2xl:grid-cols-[1.2fr_1fr]">
          <MockCard title="Rating distribution" action={<span className="text-[9px] text-ink-400">Before calibration</span>}>
            <div className="flex h-24 items-end gap-2">
              {dist.map((d) => (
                <div key={d.r} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[9px] text-ink-500 tabular-nums">{d.v}%</span>
                  <div
                    className={cn("w-full rounded-t-md", d.r === "3" ? "bg-brand-500" : "bg-blush-200")}
                    style={{ height: `${Math.max(3, Math.round(d.v * 1.2))}px` }}
                  />
                  <span className="text-[9px] text-ink-400">{d.r}</span>
                </div>
              ))}
            </div>
          </MockCard>
          <MockCard title="By team">
            {[
              ["Engineering", 64],
              ["Sales", 41],
              ["Finance", 78],
              ["Operations", 35],
            ].map(([t, v]) => (
              <div key={t} className="mb-1.5 last:mb-0">
                <div className="flex justify-between text-[10px]">
                  <span>{t}</span>
                  <span className="text-ink-400 tabular-nums">{v}%</span>
                </div>
                <Meter value={v as number} tone="marigold" className="mt-1" />
              </div>
            ))}
          </MockCard>
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function GoalsMock({ className }: { className?: string }) {
  const goals = [
    { g: "Ship design system v2", p: 70, due: "Dec" },
    { g: "Cut onboarding drop-off by 15%", p: 40, due: "Mar" },
    { g: "Mentor two junior designers", p: 100, due: "Done" },
  ];
  return (
    <MockPanel label="Preview of an employee's goals with progress and the next one-on-one with talking points, with sample data" className={className}>
      <div className="flex items-center gap-3 border-b border-cream-100 px-4 py-3">
        <Person name="Meera Nair" size="md" />
        <div>
          <p className="text-xs font-semibold">Meera Nair · Goals</p>
          <p className="text-[10px] text-ink-400">H2 2026 · 3 goals</p>
        </div>
        <SampleTag className="ml-auto" />
      </div>
      <div className="space-y-3 px-4 py-3">
        {goals.map((g) => (
          <div key={g.g}>
            <div className="flex justify-between gap-2 text-[10px]">
              <span className="truncate font-medium">{g.g}</span>
              <span className="shrink-0 text-ink-400">{g.due}</span>
            </div>
            <Meter value={g.p} tone={g.p === 100 ? "success" : "brand"} className="mt-1.5" />
          </div>
        ))}
      </div>
      <div className="m-4 mt-1 rounded-xl bg-marigold-50 p-3 text-[10px]">
        <p className="font-semibold text-marigold-900">One-on-one with Rahul · Thu 4:00 pm</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-marigold-900/80">
          <li>Design system adoption in mobile</li>
          <li>Conference talk proposal</li>
        </ul>
      </div>
    </MockPanel>
  );
}

export function EngagementMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of the culture feed with a shoutout, an awards nomination and a poll, with sample data" className={className}>
      <MockShell active="culture">
        <div className="grid gap-2 @2xl:grid-cols-[1.4fr_1fr]">
          <MockCard>
            <div className="flex items-center gap-2">
              <Person name="Rahul Iyer" size="sm" />
              <div className="min-w-0 text-[10px]">
                <p>
                  <span className="font-semibold">Rahul Iyer</span> gave a shoutout to{" "}
                  <span className="font-semibold">Meera Nair</span>
                </p>
                <p className="text-[9px] text-ink-400">Today at 10:15 · Everyone</p>
              </div>
            </div>
            <div className="mt-2 rounded-xl bg-gradient-to-br from-marigold-100 via-blush-100 to-brand-100 p-3">
              <p className="font-display text-sm leading-snug font-semibold text-ink-900">
                For turning the onboarding redesign around in a week — new joiners noticed.
              </p>
              <span className="mt-2 inline-block rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-semibold text-brand-800">
                Ownership · +50 points
              </span>
            </div>
            <div className="mt-2 flex gap-3 text-[10px] text-ink-500">
              <span className="flex items-center gap-1">
                <Heart className="size-3 fill-brand-500 text-brand-500" /> 24
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="size-3" /> 6
              </span>
            </div>
          </MockCard>
          <div className="space-y-2">
            <MockCard>
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-marigold-100 text-marigold-800">
                  <Award className="size-3.5" />
                </span>
                <div className="text-[10px]">
                  <p className="font-semibold">Star of the month</p>
                  <p className="text-[9px] text-ink-400">Nominations close Friday</p>
                </div>
              </div>
            </MockCard>
            <MockCard title="Poll · Team offsite">
              {[
                ["Coorg", 58],
                ["Goa", 42],
              ].map(([o, v]) => (
                <div key={o} className="mb-1.5 last:mb-0">
                  <div className="flex justify-between text-[10px]">
                    <span>{o}</span>
                    <span className="text-ink-400 tabular-nums">{v}%</span>
                  </div>
                  <Meter value={v as number} tone="marigold" className="mt-1" />
                </div>
              ))}
            </MockCard>
          </div>
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function SurveyMock({ className }: { className?: string }) {
  const questions = [
    ["I know what is expected of me at work", 4.3],
    ["My manager gives me useful feedback", 3.9],
    ["I would recommend working here", 4.0],
  ] as const;
  return (
    <MockPanel label="Preview of pulse survey results with response rate, average scores and a team hidden for anonymity, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <Sparkles className="size-4 text-marigold-600" />
        <p className="text-xs font-semibold">Pulse survey · October</p>
        <SampleTag className="ml-auto" />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold tabular-nums">72%</p>
          <p className="text-[10px] text-ink-400">responded · 178 of 248</p>
        </div>
        <div className="mt-3 space-y-2.5">
          {questions.map(([q, v]) => (
            <div key={q}>
              <div className="flex justify-between gap-2 text-[10px]">
                <span className="truncate">{q}</span>
                <span className="font-semibold tabular-nums">{v.toFixed(1)}</span>
              </div>
              <Meter value={(v / 5) * 100} tone="brand" className="mt-1" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-cream-100 p-4 text-[10px]">
        <div className="rounded-lg bg-cream-50 p-2">
          <p className="text-ink-400">Design</p>
          <p className="font-semibold">4.4 average</p>
        </div>
        <div className="rounded-lg bg-cream-50 p-2">
          <p className="text-ink-400">Facilities</p>
          <p className="flex items-center gap-1 font-medium text-ink-500">
            <EyeOff className="size-3" /> Hidden — too few answers
          </p>
        </div>
      </div>
    </MockPanel>
  );
}
