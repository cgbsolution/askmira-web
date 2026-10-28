import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { appByKey, CONNECTION_LABEL, journey, platformApps, type AppKey, type ConnectionStatus } from "@/lib/content/ecosystem";
import { cn } from "@/lib/utils";

import { ConnectionBadge } from "../ecosystem/ConnectionBadge";
import { SectionHeading } from "../primitives";

/** Six stages that summarise the eleven-step journey on /connected-platform. */
const STAGES: { title: string; steps: string[]; app: AppKey; label?: string }[] = [
  { title: "Forecast", steps: ["sales"], app: "saleinx" },
  { title: "Budget and approve", steps: ["budget", "workforce", "approval"], app: "hrms" },
  { title: "Recruit", steps: ["recruitment"], app: "anytimehire" },
  { title: "Onboard and equip", steps: ["onboarding", "procurement", "assets"], app: "hrms", label: "AskMira · ProcureFlow · CGB Helpdesk" },
  { title: "Spend and support", steps: ["expenses", "helpdesk"], app: "expense-genie", label: "Expense Genie · CGB Helpdesk" },
  { title: "Report", steps: ["reporting"], app: "mira" },
];

const DOT = {
  live: "bg-success",
  partial: "bg-info",
  available: "bg-marigold-500",
  planned: "bg-ink-300",
} as const;

export function ConnectedTeaser() {
  const apps = platformApps.filter((a) => a.key !== "hrms");
  return (
    <section aria-labelledby="connected-heading" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          id="connected-heading"
          eyebrow="Beyond HR"
          title="One HRMS, and the business around it"
          lead="AskMira connects to our apps for hiring, expenses and support today — and to sales and procurement next — so a decision to grow the team can be followed from forecast to first day."
        />

        <Stagger className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6">
          {STAGES.map((stage, i) => {
            const app = appByKey(stage.app);
            const steps = journey.filter((s) => stage.steps.includes(s.id));
            return (
              <StaggerItem key={stage.title}>
                <div className="relative flex h-full flex-col rounded-3xl border border-cream-200 bg-background p-5">
                  <span className="font-display text-2xl font-semibold text-brand-200 tabular-nums">0{i + 1}</span>
                  <h3 className="mt-2 text-base font-semibold text-ink-950">{stage.title}</h3>
                  <p className="mt-1 text-[0.8125rem] text-ink-500">{stage.label ?? app.name}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Connection status of each step">
                    {steps.map((s) => (
                      <li key={s.id} className="flex items-center gap-1 text-[0.6875rem] font-medium text-ink-600">
                        <span aria-hidden className={cn("size-2 rounded-full", DOT[s.status])} />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  {i < STAGES.length - 1 && (
                    <ArrowRight
                      aria-hidden
                      className="absolute top-1/2 -right-3 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-white p-0.5 text-ink-300 ring-1 ring-cream-200 lg:block"
                    />
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-ink-500">
          {(["live", "partial", "planned"] as ConnectionStatus[]).map((st) => (
            <li key={st} className="flex items-center gap-1.5">
              <span aria-hidden className={cn("size-2 rounded-full", DOT[st])} />
              {CONNECTION_LABEL[st]}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.key}
                href={app.href}
                className="group flex items-center gap-3 rounded-2xl border border-cream-200 p-4 transition-colors outline-none hover:border-cream-300 hover:bg-cream-50 focus-visible:ring-[3px] focus-visible:ring-ring/60"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blush-50 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink-900">{app.name}</span>
                  <span className="block truncate text-[0.8125rem] text-ink-500">{app.kind}</span>
                </span>
                <ConnectionBadge status={app.connection.status} size="sm" />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="deep">
            <Link href="/connected-platform">
              See how it all connects <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="soft">
            <Link href="/connected-platform#journey">Follow one hire end to end</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
