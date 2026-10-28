import { CircleCheck, Hammer, Network } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { BudgetIntelligenceMock, MiraBudgetMock } from "@/components/product/mock-budget";
import { DemoSection } from "@/components/sections/DemoSection";
import { DarkHero } from "@/components/sections/DarkHero";
import { AppDetails } from "@/components/sections/ecosystem/AppDetails";
import { ConnectionLegend } from "@/components/sections/ecosystem/ConnectionBadge";
import { ConnectionMatrix } from "@/components/sections/ecosystem/ConnectionMatrix";
import { Journey } from "@/components/sections/ecosystem/Journey";
import { MiraAcross } from "@/components/sections/ecosystem/MiraAcross";
import { PlatformMap } from "@/components/sections/ecosystem/PlatformMap";
import { Eyebrow, SectionHeading } from "@/components/sections/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The connected platform",
  description:
    "AskMira HRMS at the centre, connected to AnytimeHire for hiring, Expense Genie for expenses and CGB Helpdesk for support — with Saleinx CRM and ProcureFlow procurement next. What is connected today, and what is planned.",
  path: "/connected-platform",
});

const TODAY = [
  "Department headcount budgets — approved positions and cost for the financial year",
  "New positions refused when they would exceed the approved budget",
  "What-if scenarios that cost extra headcount before anyone asks",
  "Requisitions with a CTC range, routed through approval chains",
  "Expense Genie's own budget-versus-actual by category",
];

const NEXT = [
  "Spend from Expense Genie and ProcureFlow in the same view, by department",
  "The Saleinx forecast beside the budget",
  "Ask Mira reading budgets to answer “can we afford it?”",
];

export default function ConnectedPlatformPage() {
  return (
    <>
      <DarkHero
        eyebrow="The AskMira platform"
        eyebrowIcon={<Network className="size-4" aria-hidden />}
        title="Your HRMS, connected to the rest of the business"
        lead="AskMira runs people, time and payroll. Around it sit our apps for hiring, expenses and support that already connect to it, and the sales and procurement apps we are connecting next — one sign-in, one employee record, and Ask Mira across all of it."
        secondary={{ label: "Follow one hire end to end", href: "#journey" }}
        visual={<PlatformMap />}
      />

      <section className="section-y-sm bg-background" aria-labelledby="status-heading">
        <div className="container-site">
          <Reveal className="rounded-[2rem] border border-cream-200 bg-white p-6 sm:p-8">
            <h2 id="status-heading" className="font-display text-display-4 font-semibold text-ink-950">
              How to read this page
            </h2>
            <p className="mt-2 max-w-3xl text-[0.9375rem] text-ink-600">
              Every connection below carries one of four labels. We checked each against the products&apos; own code, so
              you can see exactly what works today and what is still on the roadmap.
            </p>
            <ConnectionLegend className="mt-6" />
          </Reveal>
        </div>
      </section>

      <section id="journey" className="section-y scroll-mt-20 bg-background" aria-labelledby="journey-heading">
        <div className="container-site">
          <SectionHeading
            id="journey-heading"
            eyebrow="One hire, end to end"
            title="From a sales forecast to a new joiner's laptop"
            lead="Follow a sample regional sales team that needs two more people — through every app that touches the decision."
          />
          <div className="mt-12 sm:mt-14">
            <Journey />
          </div>
        </div>
      </section>

      <section className="section-y bg-ink-950 text-white" aria-labelledby="budget-heading">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <Eyebrow tone="dark">Budget intelligence</Eyebrow>
            <h2 id="budget-heading" className="mt-4 font-display text-display-2 font-semibold">
              Can we afford to grow? Answer it before you ask.
            </h2>
            <p className="mt-5 text-lead text-white/75">
              A manager sees the department&apos;s budget, what is spent and committed, the cost of two more people with
              their laptops, and whether it all still fits.
            </p>
            <div className="mt-8 grid gap-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <CircleCheck className="size-4 text-success-50" aria-hidden /> In AskMira today
                </p>
                <ul className="mt-3 grid gap-2 text-[0.9375rem] text-white/75">
                  {TODAY.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-marigold-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Hammer className="size-4 text-white/60" aria-hidden /> Shown here as a concept
                </p>
                <ul className="mt-3 grid gap-2 text-[0.9375rem] text-white/60">
                  {NEXT.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-white/30" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative min-w-0">
            <BudgetIntelligenceMock />
            <div className="mt-4 sm:ml-auto sm:max-w-md">
              <MiraBudgetMock />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="apps-heading">
        <div className="container-site">
          <SectionHeading
            id="apps-heading"
            eyebrow="The apps"
            title="What each app does, and how it joins the HRMS"
            lead="AskMira stays the source of truth for people. Each app adds its own job — and reads people, departments and managers from AskMira where it is connected."
          />
          <div className="mt-12 sm:mt-14">
            <AppDetails />
          </div>
        </div>
      </section>

      <section className="section-y bg-ink-950 text-white" aria-labelledby="mira-across-heading">
        <div className="container-site">
          <SectionHeading
            id="mira-across-heading"
            tone="dark"
            eyebrow="Ask Mira across the platform"
            title="One question, answered from whichever app holds the answer"
            lead="Mira works as the person asking, with their permissions. It answers and explains; approvals for hiring, purchases and spend always stay with people."
          />
          <MiraAcross tone="dark" className="mt-12 sm:mt-14" />
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="matrix-heading">
        <div className="container-site">
          <SectionHeading
            id="matrix-heading"
            eyebrow="Connection status"
            title="Every connection, and how far it is built"
            lead="The same labels as above, for each link between two apps — including the work still to do."
          />
          <div className="mt-12">
            <ConnectionMatrix />
          </div>
        </div>
      </section>

      <DemoSection
        title="See the platform with your own numbers"
        lead="Tell us which apps you run today. We will show you what connects now, and what is coming."
      />
    </>
  );
}
