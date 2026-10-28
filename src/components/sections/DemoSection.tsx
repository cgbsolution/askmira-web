import { CheckCircle2 } from "lucide-react";

import { SpotCalendarClock, SpotChat, SpotDashboard, SpotTile } from "@/components/illustrations/spots";
import { DemoForm } from "@/components/forms/DemoForm";
import { Reveal } from "@/components/motion/Reveal";

const AGENDA = [
  { icon: SpotChat, text: "We start with how you run HR and payroll today." },
  { icon: SpotDashboard, text: "Then walk through the parts of AskMira that fit — not a fixed script." },
  { icon: SpotCalendarClock, text: "You leave with answers on setup, data import and pricing." },
];

/** The closing conversion section: the pitch on the left, the working form on the right. */
export function DemoSection({
  title = "See AskMira run your month",
  lead = "Tell us a little about your company and we will set up a walkthrough around it.",
  topic = "demo",
}: {
  title?: string;
  lead?: string;
  topic?: string;
}) {
  return (
    <section id="demo" aria-labelledby="demo-heading" className="section-y bg-background">
      <div className="container-site">
        <div className="bg-deep relative isolate overflow-hidden rounded-[2rem] px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal>
              <h2 id="demo-heading" className="font-display text-display-2 font-semibold">
                {title}
              </h2>
              <p className="mt-5 text-lead text-white/75">{lead}</p>
              <ul className="mt-9 grid gap-5">
                {AGENDA.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <SpotTile icon={Icon} size="md" tone="cream" />
                    <span className="pt-2 text-[0.9875rem] text-white/85">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-9 flex items-center gap-2 text-sm text-white/60">
                <CheckCircle2 className="size-4 text-marigold-400" aria-hidden />
                No public sign-up: every workspace is set up with you, by our team.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <DemoForm topic={topic} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
