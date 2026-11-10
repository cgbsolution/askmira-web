import { DrawPath, Emph, Squiggle, WaveEdge } from "@/components/motion/Doodles";
import { SpotBank, SpotCalculator, SpotCalendarLock, SpotChecklist, SpotFileSend, SpotTile } from "@/components/illustrations/spots";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

import { SectionHeading } from "../primitives";

const STEPS = [
  { icon: SpotCalendarLock, title: "Lock attendance", body: "Regularisations decided, leave approved, the month frozen for payroll." },
  { icon: SpotCalculator, title: "Compute", body: "Salaries, arrears, loans and holds, with statutory deductions applied." },
  { icon: SpotChecklist, title: "Review and approve", body: "New joiners, leavers and unusual changes checked before approval." },
  { icon: SpotBank, title: "Pay", body: "A bank file in your bank's format; payslips published to employees." },
  { icon: SpotFileSend, title: "File and post", body: "ECR, ESI, PT and TDS challans, 24Q and Form 16; the journal to your books." },
];

export function PayrollBand() {
  return (
    <section aria-labelledby="payroll-band-heading" className="bg-deep relative isolate overflow-hidden text-white">
      <WaveEdge className="text-background" />
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="section-y container-site">
        <SectionHeading
          id="payroll-band-heading"
          tone="dark"
          eyebrow="India payroll"
          note="in this order, every month"
          title={<>A payroll month, <Emph tone="dark" underline={false}>the way it <Squiggle>should go</Squiggle></Emph></>}
          lead="Each step has to finish before the next can start — so mistakes surface while they are still cheap to fix."
        />

        {/* The month as a drawn route: one stop above each step. */}
        <div aria-hidden className="relative mt-14 hidden h-16 grid-cols-5 gap-4 lg:grid">
          <svg
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-y-0 left-[10%] h-full w-[80%] overflow-visible text-marigold-400"
          >
            <DrawPath d="M0 30C62 0 188 0 250 30S438 60 500 30S688 0 750 30S938 60 1000 30" strokeWidth={3} dashed duration={2.2} />
          </svg>
          {STEPS.map((s, i) => (
            <span
              key={s.title}
              className="relative z-10 grid size-11 place-items-center self-center justify-self-center rounded-full border-4 border-brand-900 bg-marigold-400 font-display text-lg font-bold text-ink-950 shadow-float"
            >
              {i + 1}
            </span>
          ))}
        </div>
        <Stagger className="relative mt-14 grid lg:mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <StaggerItem key={title}>
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                <SpotTile icon={Icon} size="lg" tone="cream" className="shadow-float" />
                <p className="mt-5 text-xs font-semibold tracking-[0.08em] text-marigold-300 uppercase">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="inverse">
            <Link href="/features/payroll">Explore payroll</Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/resources/guides/payroll-month-end-checklist-india">Read the month-end checklist</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
