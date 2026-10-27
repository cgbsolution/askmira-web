import { CalendarCheck, Clock, MessagesSquare, Settings2, Upload } from "lucide-react";

import { DemoForm } from "@/components/forms/DemoForm";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/sections/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a demo",
  description: "Book a 30-minute walkthrough of AskMira, shaped around how your company runs HR and payroll today.",
  path: "/demo",
});

const EXPECT = [
  { icon: Clock, title: "30 minutes, on a video call", body: "Long enough to be useful, short enough to fit a busy week." },
  { icon: MessagesSquare, title: "Your questions first", body: "We start with how you run HR and payroll today." },
  { icon: Settings2, title: "The parts that fit", body: "Payroll, attendance, hiring — whatever matters to you, not a fixed script." },
  { icon: Upload, title: "A clear next step", body: "How setup works, how your data comes in, and a written quote." },
];

export default function DemoPage() {
  return (
    <section className="bg-deep relative isolate overflow-hidden pt-28 pb-20 text-white sm:pt-32 lg:pt-40 lg:pb-28">
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow tone="dark" icon={<CalendarCheck className="size-4" aria-hidden />}>
            Book a demo
          </Eyebrow>
          <h1 className="mt-5 font-display text-display-2 font-semibold">See AskMira with your own questions</h1>
          <p className="mt-5 text-lead text-white/75">
            Tell us a little about your company. We will set up a walkthrough around how you run HR and payroll today.
          </p>
          <ul className="mt-10 grid gap-6">
            {EXPECT.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-marigold-300">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-[0.9375rem] text-white/70">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}
