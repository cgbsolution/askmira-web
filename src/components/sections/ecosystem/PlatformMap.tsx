import Link from "next/link";

import { appByKey, type AppKey, type ConnectionStatus } from "@/lib/content/ecosystem";
import { cn } from "@/lib/utils";

import { ConnectionBadge } from "./ConnectionBadge";

const LEFT: AppKey[] = ["anytimehire", "expense-genie", "helpdesk"];
const RIGHT: AppKey[] = ["saleinx", "procureflow", "mira"];

/** The line from an app to the HRMS: solid when connected, dashed when planned. */
function line(status: ConnectionStatus) {
  return status === "planned" ? "border-dashed border-white/25" : "border-solid border-marigold-400/70";
}

function AppNode({ appKey, side }: { appKey: AppKey; side: "left" | "right" }) {
  const app = appByKey(appKey);
  const Icon = app.icon;
  return (
    <Link
      href={app.href}
      className="group relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left text-white transition-colors outline-none hover:border-white/25 hover:bg-white/[0.1] focus-visible:ring-[3px] focus-visible:ring-white/40"
    >
      {/* Connector to the hub, on wide screens only. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden w-10 border-t-2 lg:block xl:w-14",
          side === "left" ? "left-full" : "right-full",
          line(app.connection.status),
        )}
      />
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-marigold-300">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{app.name}</span>
        <span className="block text-[0.8125rem] text-white/60">{app.kind}</span>
        <ConnectionBadge status={app.connection.status} size="sm" className="mt-2" />
      </span>
    </Link>
  );
}

/**
 * The HRMS at the centre, the business apps around it. Lines show what is
 * connected (solid) and what is planned (dashed).
 */
export function PlatformMap() {
  const hrms = appByKey("hrms");
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-10 xl:gap-14">
      <div className="grid gap-3">
        {LEFT.map((k) => (
          <AppNode key={k} appKey={k} side="left" />
        ))}
      </div>

      <Link
        href={hrms.href}
        className="relative order-first rounded-3xl bg-white p-6 text-left text-ink-950 shadow-frame transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-white/50 motion-reduce:hover:translate-y-0 lg:order-none lg:p-7"
      >
        <span className="inline-flex rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold text-brand-800">The core</span>
        <p className="mt-4 font-display text-display-4 font-semibold">{hrms.name}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{hrms.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {["One employee record", "One sign-in", "Department budgets", "Approval chains"].map((t) => (
            <li key={t} className="rounded-full bg-cream-100 px-2.5 py-1 text-xs font-semibold text-ink-700">
              {t}
            </li>
          ))}
        </ul>
      </Link>

      <div className="grid gap-3">
        {RIGHT.map((k) => (
          <AppNode key={k} appKey={k} side="right" />
        ))}
      </div>
    </div>
  );
}
