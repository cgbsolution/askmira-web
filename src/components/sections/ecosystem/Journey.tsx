import { ArrowRight, CircleCheck, Hammer } from "lucide-react";
import Link from "next/link";

import { SpotTile } from "@/components/illustrations/spots";
import { AppWindow } from "@/components/product/AppWindow";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appByKey, journey } from "@/lib/content/ecosystem";
import { journeyScreens } from "@/lib/content/screens";
import { cn } from "@/lib/utils";

import { ConnectionBadge } from "./ConnectionBadge";

const DOT = {
  live: "bg-success",
  partial: "bg-info",
  available: "bg-marigold-500",
  planned: "bg-ink-300",
} as const;

/**
 * The sales-to-budget-to-hiring journey, one sample company end to end. Each
 * step names the app that does it and says honestly how much is connected.
 */
export function Journey() {
  return (
    <Tabs defaultValue={(journey.find((j) => journeyScreens[j.id]) ?? journey[0]!).id} orientation="vertical" className="gap-6 lg:flex-row lg:gap-10">
      <TabsList
        aria-label="Steps of the journey"
        className="mask-fade-x -mx-4 flex h-auto w-[calc(100%+2rem)] shrink-0 justify-start gap-2 overflow-x-auto bg-transparent p-1 px-4 [scrollbar-width:none] sm:mx-0 sm:w-full sm:px-1 lg:w-80 lg:flex-col lg:items-stretch lg:gap-1 lg:overflow-visible lg:[mask-image:none]"
      >
        {journey.map((step, i) => {
          const app = appByKey(step.app);
          return (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className="group h-auto min-w-max flex-none items-center justify-start gap-3 rounded-2xl border border-transparent bg-white px-3 py-2.5 text-left whitespace-normal text-ink-700 ring-1 ring-cream-200 hover:bg-cream-50 hover:text-ink-950 data-[state=active]:bg-ink-950 data-[state=active]:text-white data-[state=active]:ring-ink-950 lg:min-w-0"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cream-100 text-xs font-bold text-ink-700 tabular-nums group-data-[state=active]:bg-marigold-500 group-data-[state=active]:text-ink-950">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="hidden text-xs font-normal text-ink-400 group-data-[state=active]:text-white/60 lg:block">
                  {app.name}
                </span>
              </span>
              <span aria-hidden className={cn("ml-auto hidden size-2 shrink-0 rounded-full lg:block", DOT[step.status])} />
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div className="min-w-0 flex-1">
        {journey.map((step, i) => {
          const app = appByKey(step.app);
          const nextStep = journey[i + 1];
          return (
            <TabsContent
              key={step.id}
              value={step.id}
              className="duration-500 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1"
            >
              <div className="rounded-[2rem] border border-cream-200 bg-white p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <SpotTile icon={app.icon} size="lg" />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-ink-400 uppercase">
                      Step {i + 1} of {journey.length} · {app.name}
                    </p>
                    <h3 className="font-display text-display-4 font-semibold text-ink-950">{step.title}</h3>
                  </div>
                  <ConnectionBadge status={step.status} className="ml-auto" />
                </div>
                <p className="mt-4 text-[0.9375rem] text-ink-700 sm:text-base">{step.summary}</p>

                {journeyScreens[step.id] ? (
                  <AppWindow screen={journeyScreens[step.id]!} className="mt-6" sizes="(min-width: 1280px) 760px, 100vw" />
                ) : (
                  <div className="mt-6 grid place-items-center rounded-xl py-10 border border-dashed border-cream-300 bg-cream-50 p-6 text-center text-sm text-ink-500">
                    No screen yet — {app.name}&apos;s link to AskMira is planned.
                  </div>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                      <CircleCheck className="size-4 text-success" aria-hidden /> Works today
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{step.today}</p>
                  </div>
                  {step.next && (
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                        <Hammer className="size-4 text-ink-400" aria-hidden /> Still to build
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{step.next}</p>
                    </div>
                  )}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-cream-200 pt-5 text-sm">
                  <Link href={app.href} className="font-semibold text-brand-800 underline underline-offset-4 hover:text-brand-700">
                    About {app.name}
                  </Link>
                  {nextStep && (
                    <span className="flex items-center gap-1.5 text-ink-500">
                      Next: {nextStep.title} <ArrowRight className="size-4" aria-hidden />
                    </span>
                  )}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}
