import { ArrowRight, CheckCircle2, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { DashboardMock } from "@/components/product/mock-dashboard";
import { MiraChatMock } from "@/components/product/mock-platform";
import { MockPanel } from "@/components/product/primitives";
import { Button } from "@/components/ui/button";

const PROOF = ["Indian statutory payroll built in", "Works on any phone", "AI off until you switch it on"];

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
            href="/ai"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pr-3 pl-1 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors outline-none hover:border-white/30 hover:bg-white/15 focus-visible:ring-[3px] focus-visible:ring-white/40"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-marigold-500 px-2 py-0.5 text-xs font-semibold text-ink-950">
              <Sparkles className="size-3" aria-hidden /> New
            </span>
            Ask Mira answers from your own policies
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-7 max-w-5xl font-display text-display-1 font-semibold">
            From punch-in to payslip, <span className="text-gradient-brand">HR that runs on one&nbsp;record</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/75">
            AskMira brings employee records, attendance and leave, Indian statutory payroll and people analytics into one
            platform — and gives every employee one place to ask, apply and be recognised.
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
          <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-2 shadow-frame backdrop-blur-sm sm:p-3">
            <DashboardMock className="rounded-[1.25rem] border-0 shadow-none" />
          </div>

          <MockPanel
            label="Attendance for October is locked and ready for payroll"
            className="animate-float absolute top-[58%] -left-6 hidden w-60 [animation-delay:-2s] lg:block xl:-left-14"
          >
            <div className="flex items-center gap-3 p-3">
              <span className="grid size-9 place-items-center rounded-xl bg-success-50 text-success-600">
                <Lock className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold">October attendance locked</p>
                <p className="text-[10px] text-ink-400">248 people · ready for payroll</p>
              </div>
            </div>
          </MockPanel>

          <div className="animate-float absolute top-[34%] -right-4 hidden w-[19rem] lg:block xl:-right-16">
            <MiraChatMock />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
