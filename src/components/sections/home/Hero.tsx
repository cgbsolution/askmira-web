import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Emph, HandNote, Sparkle, Squiggle } from "@/components/motion/Doodles";
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

/** A rangoli-like ring of rays and dots that turns very slowly behind the laptop. */
function Sunburst() {
  const rays = Array.from({ length: 24 }, (_, i) => i * 15);
  const dots = Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6);
  return (
    <svg
      aria-hidden
      viewBox="-300 -300 600 600"
      className="animate-spin-slow pointer-events-none absolute top-[42%] left-1/2 -z-10 w-[130%] max-w-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
    >
      {rays.map((a) => (
        <path key={a} d="M0 -290L14 -180H-14Z" transform={`rotate(${a})`} className="fill-marigold-400" />
      ))}
      <circle r="170" fill="none" strokeWidth="3" strokeDasharray="3 14" strokeLinecap="round" className="stroke-marigold-300" />
      <circle r="120" fill="none" strokeWidth="2" className="stroke-brand-300" />
      {dots.map((a) => (
        <circle key={a} cx={(205 * Math.sin(a)).toFixed(1)} cy={(-205 * Math.cos(a)).toFixed(1)} r="9" className="fill-blush-200" />
      ))}
    </svg>
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

        <div className="relative mx-auto max-w-5xl">
          <Sparkle className="top-2 left-[4%] hidden text-marigold-400 sm:block" />
          <Sparkle className="top-[58%] right-[2%] hidden size-5 text-brand-400 sm:block" delay={-2} />
          <Sparkle className="-bottom-4 left-[14%] hidden size-4 text-blush-300 lg:block" delay={-3.5} />
          <div className="mt-8 flex justify-center sm:justify-start sm:pl-[12%]">
            <HandNote tone="dark">five suites, one record</HandNote>
          </div>
          <Reveal delay={0.05}>
            <h1 className="mt-2 font-display text-display-1 font-semibold">
              From punch-in to payslip,{" "}
              <br className="hidden sm:block" />
              <Emph tone="dark" underline={false}>
                HR that runs on <Squiggle>one&nbsp;record.</Squiggle>
              </Emph>
            </h1>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/75">
            AskMiraa brings employee records, attendance and leave, Indian statutory payroll and people analytics into one
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
          <Sunburst />
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
            Real screens from AskMiraa and the apps connected to it, in a demo workspace with sample data.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
