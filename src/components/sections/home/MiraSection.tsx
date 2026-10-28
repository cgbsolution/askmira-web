import { SpotBook, SpotConnected, SpotToggle } from "@/components/illustrations/spots";
import { Reveal } from "@/components/motion/Reveal";
import { MiraChatMock } from "@/components/product/mock-platform";

import { ArrowLink, Eyebrow, IconChip, MockStage } from "../primitives";

const POINTS = [
  {
    icon: SpotBook,
    title: "Answers from your own policies",
    body: "Mira quotes the policy and section it used, so an answer can be checked in seconds.",
  },
  {
    icon: SpotConnected,
    title: "Works as you, across your apps",
    body: "It looks up people, leave and reports — and jobs, expense claims and tickets in connected apps — with exactly the asker's permissions.",
  },
  {
    icon: SpotToggle,
    title: "Off until you switch it on",
    body: "Your admin decides. Consent is checked, and every request is recorded in the AI Trust Center.",
  },
];

export function MiraSection() {
  return (
    <section aria-labelledby="mira-heading" className="section-y bg-background">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow tone="marigold">Ask Mira</Eyebrow>
            <h2 id="mira-heading" className="mt-4 font-display text-display-2 font-semibold text-ink-950">
              Ask a question. Get the answer, and where it came from.
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              Ask Mira is the HR companion in every employee&apos;s sidebar. It answers in plain language from your
              company&apos;s own documents and records — with guardrails your admin controls.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-6">
            {POINTS.map(({ icon: Icon, title, body }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <IconChip icon={Icon} accent={i === 1 ? "red" : "marigold"} />
                  <div>
                    <h3 className="text-lg font-semibold text-ink-950">{title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10">
            <ArrowLink href="/ai">How Ask Mira works</ArrowLink>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <MockStage tone="marigold">
            <MiraChatMock className="mx-auto w-full max-w-md" />
          </MockStage>
        </Reveal>
      </div>
    </section>
  );
}
