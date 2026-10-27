import { Fingerprint, Lock, MapPin, Wifi, WifiOff } from "lucide-react";

import { cn } from "@/lib/utils";

import { MockCard, MockFrame, MockPanel, MockShell, Person, SampleTag, Status } from "./primitives";

type Day = "P" | "H" | "L" | "late" | "miss" | "off" | "today" | "future";

/** October 2026 — the 1st is a Thursday. */
const OCTOBER: Day[] = (() => {
  const marks: Record<number, Day> = { 2: "H", 7: "late", 14: "miss", 19: "L", 20: "H", 26: "today" };
  return Array.from({ length: 31 }, (_, i) => {
    const date = i + 1;
    const weekday = (3 + i) % 7; // 0 = Monday … 6 = Sunday; the 1st is index 3 (Thursday)
    if (marks[date]) return marks[date];
    if (date > 26) return "future";
    if (weekday >= 5) return "off";
    return "P";
  });
})();

const DAY_STYLE: Record<Day, string> = {
  P: "bg-success-50 text-success-600",
  H: "bg-marigold-50 text-marigold-800",
  L: "bg-info-50 text-info-600",
  late: "bg-marigold-100 text-marigold-900",
  miss: "border border-dashed border-marigold-600 bg-white text-marigold-800",
  off: "bg-cream-100 text-ink-300",
  today: "bg-ink-900 text-white",
  future: "bg-white text-ink-300 border border-cream-100",
};

export function AttendanceMock({ className }: { className?: string }) {
  return (
    <MockFrame label="Preview of a monthly attendance calendar with present, leave, holiday, late and missed-punch days, and today's geofenced punch, with sample data" className={className}>
      <MockShell active="attendance">
        <div className="grid gap-2 @2xl:grid-cols-[1.5fr_1fr]">
          <MockCard title="October 2026" action={<span className="text-[9px] text-ink-400">Meera Nair</span>}>
            <div className="grid grid-cols-7 gap-1 text-center text-[8px] font-semibold text-ink-400 uppercase">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={`pad${i}`} />
              ))}
              {OCTOBER.map((d, i) => (
                <span
                  key={i}
                  className={cn("grid aspect-square place-items-center rounded-md text-[9px] font-semibold tabular-nums", DAY_STYLE[d])}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-[8px] text-ink-500">
              {[
                ["bg-success-50", "Present"],
                ["bg-info-50", "Leave"],
                ["bg-marigold-50", "Holiday"],
                ["bg-marigold-100", "Late"],
                ["border border-dashed border-marigold-600", "Missed punch"],
              ].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1">
                  <span className={cn("size-2 rounded-sm", c)} />
                  {l}
                </span>
              ))}
            </div>
          </MockCard>
          <div className="space-y-2">
            <MockCard title="Today">
              <div className="space-y-2 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-success" />
                  <span className="font-semibold">In · 09:24</span>
                  <span className="ml-auto flex items-center gap-1 text-[9px] text-ink-400">
                    <MapPin className="size-2.5" /> Bengaluru HQ
                  </span>
                </div>
                <div className="flex items-center gap-2 text-ink-400">
                  <span className="size-2 rounded-full border border-cream-300" />
                  Out · not yet
                </div>
                <p className="rounded-md bg-success-50 px-2 py-1 text-[9px] font-medium text-success-600">
                  Inside the office geofence (120 m)
                </p>
              </div>
            </MockCard>
            <MockCard title="Needs regularisation" action={<Status tone="warning">1</Status>}>
              <p className="text-[10px] font-medium">Wed, 14 Oct · missed punch-out</p>
              <p className="text-[9px] text-ink-400">Request sent to Rahul Iyer</p>
            </MockCard>
          </div>
        </div>
      </MockShell>
    </MockFrame>
  );
}

export function DevicesMock({ className }: { className?: string }) {
  const devices = [
    { name: "Reception", make: "eSSL", serial: "ESSL-K90-2231", seen: "1 min ago", punches: 142, ok: true },
    { name: "Plant gate", make: "ZKTeco", serial: "ZK-F22-0918", seen: "3 min ago", punches: 211, ok: true },
    { name: "Warehouse", make: "ZKTeco", serial: "ZK-F22-1104", seen: "3 h ago", punches: 37, ok: false },
  ];
  return (
    <MockPanel label="Preview of biometric devices with their last contact and punches today, and the monthly lock for payroll, with sample data" className={className}>
      <div className="flex items-center gap-2 border-b border-cream-100 px-4 py-3">
        <Fingerprint className="size-4 text-brand-700" />
        <p className="text-xs font-semibold">Devices</p>
        <SampleTag className="ml-auto" />
      </div>
      <ul>
        {devices.map((d) => (
          <li key={d.serial} className="flex items-center gap-3 border-b border-cream-100 px-4 py-2.5 text-[10px]">
            <span className={cn("grid size-7 place-items-center rounded-lg", d.ok ? "bg-success-50 text-success-600" : "bg-marigold-50 text-marigold-800")}>
              {d.ok ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-ink-800">
                {d.name} · {d.make}
              </span>
              <span className="block truncate text-[9px] text-ink-400">
                {d.serial} · heard {d.seen}
              </span>
            </span>
            <span className="ml-auto text-right">
              <span className="block font-semibold tabular-nums">{d.punches}</span>
              <span className="block text-[9px] text-ink-400">punches today</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2 bg-cream-50 px-4 py-3 text-[10px]">
        <span className="font-semibold">October 2026</span>
        <span className="text-ink-400">2 days still need regularisation</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-lg bg-ink-900 px-2.5 py-1.5 font-semibold text-white">
          <Lock className="size-3" /> Lock for payroll
        </span>
      </div>
    </MockPanel>
  );
}

export function LeaveMock({ className }: { className?: string }) {
  const week = [
    { d: "Mon 26", out: [] as string[] },
    { d: "Tue 27", out: ["Kavya Reddy"] },
    { d: "Wed 28", out: ["Arjun Mehta"] },
    { d: "Thu 29", out: ["Arjun Mehta", "Sneha Kulkarni"] },
    { d: "Fri 30", out: ["Arjun Mehta"] },
  ];
  return (
    <MockPanel label="Preview of a leave request awaiting a manager's approval, with the balance after and the team's week, with sample data" className={className}>
      <div className="flex items-center gap-3 border-b border-cream-100 px-4 py-3">
        <Person name="Arjun Mehta" size="md" />
        <div className="min-w-0">
          <p className="text-xs font-semibold">Arjun Mehta</p>
          <p className="text-[10px] text-ink-400">Earned leave · Wed 28 – Fri 30 Oct · 3 days</p>
        </div>
        <SampleTag className="ml-auto" />
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-3 text-[10px]">
        <div>
          <p className="text-ink-400">Reason</p>
          <p className="font-medium">Family function in Nashik</p>
        </div>
        <div>
          <p className="text-ink-400">Balance after</p>
          <p className="font-medium">9 of 18 days</p>
        </div>
      </div>
      <div className="mx-4 rounded-xl bg-cream-50 p-3">
        <p className="mb-2 text-[9px] font-semibold tracking-wide text-ink-400 uppercase">Team this week</p>
        <div className="grid grid-cols-5 gap-1.5">
          {week.map((w) => (
            <div key={w.d} className="text-center">
              <p className="text-[9px] text-ink-500">{w.d}</p>
              <div className="mt-1 flex min-h-6 justify-center -space-x-1.5">
                {w.out.map((n) => (
                  <Person key={n} name={n} size="xs" className="ring-2 ring-cream-50" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[9px] text-marigold-800">Sneha Kulkarni is also out on Thu 29 Oct.</p>
      </div>
      <div className="flex justify-end gap-2 px-4 py-3">
        <span className="rounded-lg border border-cream-200 px-3 py-1.5 text-[10px] font-semibold">Reject</span>
        <span className="rounded-lg bg-brand-500 px-3 py-1.5 text-[10px] font-semibold text-white">Approve</span>
      </div>
    </MockPanel>
  );
}
