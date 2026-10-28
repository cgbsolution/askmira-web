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
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="section-y container-site">
        <SectionHeading
          id="payroll-band-heading"
          tone="dark"
          eyebrow="India payroll"
          title="A payroll month, the way it should go"
          lead="Each step has to finish before the next can start — so mistakes surface while they are still cheap to fix."
        />
        <Stagger className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div aria-hidden className="absolute top-14 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-white/0 via-white/30 to-white/0 lg:block" />
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
