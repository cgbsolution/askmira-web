import { Building2, Eye, Landmark, Lock, Sparkles, type LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { IconChip, SectionHeading } from "@/components/sections/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About AskMira",
  description:
    "AskMira is an HR platform built for Indian companies, on a few principles: real numbers, unchangeable history, separated data and AI that shows its working.",
  path: "/about",
});

const PRINCIPLES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Eye,
    title: "Every number on screen is real",
    body: "If a module is not built yet, AskMira says so. It never fills a screen with sample figures that a customer might mistake for their own.",
  },
  {
    icon: Landmark,
    title: "History does not change",
    body: "A new statutory rate is a new dated version. Last year's payroll recomputes exactly as it was, and the audit log can only be added to.",
  },
  {
    icon: Lock,
    title: "Your data stays yours",
    body: "Each company's data is separated on every query, from the workspace in your sign-in — never from anything a browser sends.",
  },
  {
    icon: Sparkles,
    title: "AI shows its working",
    body: "No AI answer without its sources or its reasoning, no AI call without your admin's say-so, and a record of each one.",
  },
  {
    icon: Building2,
    title: "Built for how India works",
    body: "PF, ESI, professional tax, LWF and TDS; biometric devices on the shop floor; payroll bureaus working alongside HR.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="HR software for the way Indian companies actually work"
        lead="In most Indian companies, HR spends the month moving data between spreadsheets so that payroll can be right. AskMira is built to make that unnecessary — and to give the time back to people."
        secondary={{ label: "Contact us", href: "/contact" }}
      />

      <section className="section-y-sm bg-background" aria-labelledby="principles-heading">
        <div className="container-site">
          <SectionHeading
            id="principles-heading"
            eyebrow="What we hold ourselves to"
            title="The principles behind the product"
            lead="These are written into how AskMira is built and tested, not just into this page."
          />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem key={title} className={i === 0 ? "lg:col-span-2" : undefined}>
                <div className="h-full rounded-3xl border border-cream-200 bg-white p-7">
                  <IconChip accent={i === 0 ? "red" : i % 2 ? "marigold" : "ink"}>
                    <Icon aria-hidden />
                  </IconChip>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-950">{title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="family-heading">
        <div className="container-site">
          <div className="rounded-[2rem] bg-marigold-50 p-8 sm:p-12">
            <h2 id="family-heading" className="font-display text-display-3 font-semibold text-ink-950">
              Connected to the products around it
            </h2>
            <p className="mt-4 max-w-3xl text-lead text-ink-700">
              AskMira connects in one click to AnytimeHire for hiring, ExpenseGenie for expenses and CGB Helpdesk for IT
              tickets and assets — so a company already using them sees everything in one place, with one sign-in.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
