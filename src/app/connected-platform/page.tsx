import { CircleCheck, Hammer } from "lucide-react";

import { SpotConnected } from "@/components/illustrations/spots";
import { Reveal } from "@/components/motion/Reveal";
import { AppWindow } from "@/components/product/AppWindow";
import { DemoSection } from "@/components/sections/DemoSection";
import { DarkHero } from "@/components/sections/DarkHero";
import { AppDetails } from "@/components/sections/ecosystem/AppDetails";
import { ConnectionLegend } from "@/components/sections/ecosystem/ConnectionBadge";
import { ConnectionMatrix } from "@/components/sections/ecosystem/ConnectionMatrix";
import { Journey } from "@/components/sections/ecosystem/Journey";
import { MiraAcross } from "@/components/sections/ecosystem/MiraAcross";
import { Eyebrow, SectionHeading } from "@/components/sections/primitives";
import { ScreenTour } from "@/components/sections/screens/ScreenTour";
import { WindowStack } from "@/components/sections/screens/WindowStack";
import { screens } from "@/lib/content/screens";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The connected platform",
  description:
    "AskMira HRMS at the centre, connected to AnytimeHire for hiring, Expense Genie for expenses and CGB Helpdesk for IT support — with Saleinx CRM and ProcureFlow procurement next. Real screens, and what is connected today.",
  path: "/connected-platform",
});

const TODAY = [
  "Approved headcount and cost per department, for the financial year",
  "New positions refused when they would go over budget",
  "What-if scenarios that cost extra headcount before anyone asks",
  "Requisitions with a CTC range, approved in order",
];

const NEXT = [
  "Spend from Expense Genie and ProcureFlow in the same view",
  "The Saleinx sales forecast beside the budget",
  "Ask Mira answering “can we afford it?” from the budget",
];

export default function ConnectedPlatformPage() {
  return (
    <>
      <DarkHero
        eyebrow="The AskMira platform"
        eyebrowIcon={SpotConnected}
        title="Your HRMS, connected to the rest of the business"
        lead="AskMira runs people, attendance and payroll. Hiring, expenses and IT support already connect to it. Sales and procurement are next."
        secondary={{ label: "Follow one hire end to end", href: "#journey" }}
        visual={<WindowStack />}
      />

      <section className="section-y bg-cream-50" aria-labelledby="tour-heading">
        <div className="container-site">
          <SectionHeading
            id="tour-heading"
            eyebrow="Every app"
            title="Click through the real screens"
            lead="Pick an app, pick a screen, and tap the numbers to see what each part does."
          />
          <ScreenTour className="mt-12 sm:mt-14" />
        </div>
      </section>

      <section id="journey" className="section-y scroll-mt-20 bg-background" aria-labelledby="journey-heading">
        <div className="container-site">
          <SectionHeading
            id="journey-heading"
            eyebrow="One hire, end to end"
            title="From a sales forecast to a new joiner's laptop"
            lead="A sample sales team needs two more people. Here is every screen the decision passes through."
          />
          <ConnectionLegend className="mt-8 justify-center" />
          <div className="mt-10 sm:mt-12">
            <Journey />
          </div>
        </div>
      </section>

      <section className="section-y bg-ink-950 text-white" aria-labelledby="budget-heading">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <Eyebrow tone="dark">Budget</Eyebrow>
            <h2 id="budget-heading" className="mt-4 font-display text-display-2 font-semibold">
              Can we afford to grow?
            </h2>
            <p className="mt-5 text-lead text-white/75">
              Headcount budgets live in AskMira, next to the people who fill them.
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
                  <Hammer className="size-4 text-white/60" aria-hidden /> Next
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
          <Reveal delay={0.1} className="relative min-w-0 pb-10 sm:pb-24">
            <AppWindow screen={screens.amBudget} className="shadow-frame sm:mr-[12%]" sizes="(min-width: 1280px) 720px, 100vw" />
            <AppWindow
              screen={screens.amScenarios}
              chrome="slim"
              className="mt-4 shadow-frame sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:w-[58%]"
              sizes="(min-width: 1280px) 440px, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="apps-heading">
        <div className="container-site">
          <SectionHeading
            id="apps-heading"
            eyebrow="The apps"
            title="What each app does, and how it joins AskMira"
            lead="AskMira is the record of who works here. Connected apps read people, departments and managers from it."
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
            eyebrow="Ask Mira"
            title="Ask once, answered from the app that knows"
            lead="Mira works as the person asking, with their permissions. It answers; people still approve hiring, purchases and spend."
          />
          <div className="mx-auto mt-12 max-w-4xl sm:mt-14">
            <AppWindow screen={screens.amMira} className="shadow-frame" sizes="(min-width: 1024px) 900px, 100vw" />
          </div>
          <MiraAcross tone="dark" className="mt-12" />
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="matrix-heading">
        <div className="container-site">
          <SectionHeading
            id="matrix-heading"
            eyebrow="Connection status"
            title="Every connection, and how far it is built"
            lead="Checked against each product's own code."
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
