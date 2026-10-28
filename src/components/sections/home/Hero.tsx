import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { AppWindow, MacBook } from "@/components/product/AppWindow";
import { Button } from "@/components/ui/button";
import { screens, type Screen } from "@/lib/content/screens";
import { cn } from "@/lib/utils";

const PROOF = ["Indian statutory payroll built in", "Works on any phone", "AI off until you switch it on"];

/** A small window of a connected app, floating beside the laptop. */
function FloatingApp({ screen, label, className }: { screen: Screen; label: string; className?: string }) {
  return (
    <div className={cn("animate-float absolute hidden w-[17rem] lg:block xl:w-[19rem]", className)}>
      <AppWindow screen={screen} chrome="slim" sizes="320px" className="shadow-frame" />
      <span className="absolute -top-3 left-3 rounded-full bg-white px-2.5 py-1 font-sans text-[11px] font-semibold text-ink-900 shadow-card">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-deep relative isolate overflow-hidden text-white">
      {/* Light from below: the logo's red and marigold. */}
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-700/30 blur-3xl"
      />

      <div className="container-site relative pt-32 text-center sm:pt-36 lg:pt-44">
        <Reveal y={12}>
          <Link
            href="/connected-platform"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pr-3 pl-1 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors outline-none hover:border-white/30 hover:bg-white/15 focus-visible:ring-[3px] focus-visible:ring-white/40"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-marigold-500 px-2 py-0.5 text-xs font-semibold text-ink-950">
              New
            </span>
            One HRMS, connected to the business around it
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-7 max-w-5xl font-display text-display-1 font-semibold">
            From punch-in to payslip,{" "}
            <span className="text-marigold-400">
              HR that runs on{" "}
              <span className="relative inline-block">
                one&nbsp;record
                <svg
                  aria-hidden
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-brand-400 sm:-bottom-2 sm:h-3.5"
                >
                  <path
                    d="M4 10.5C48 4.5 104 3 196 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/75">
            AskMira brings employee records, attendance and leave, Indian statutory payroll and people analytics into one
            platform — and connects it to our apps for hiring, expenses and support, with sales and procurement next.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/demo">
                Book a demo <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            {PROOF.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-marigold-400" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25} y={48} amount={0.05} className="relative mx-auto mt-14 max-w-6xl pb-16 text-left sm:mt-16 sm:pb-24">
          <MacBook screen={screens.amHome} priority sizes="(min-width: 1280px) 1000px, 100vw" />

          <FloatingApp
            screen={screens.athPipeline}
            label="AnytimeHire"
            className="top-[40%] -left-8 [animation-delay:-2s] xl:-left-20"
          />
          <FloatingApp screen={screens.egDash} label="Expense Genie" className="top-[16%] -right-6 xl:-right-20" />
          <FloatingApp
            screen={screens.hdTickets}
            label="CGB Helpdesk"
            className="top-[62%] -right-2 [animation-delay:-4s] xl:-right-12"
          />
          <p className="mt-6 text-center text-xs text-white/50">
            Real screens from AskMira and the apps connected to it, in a demo workspace with sample data.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
