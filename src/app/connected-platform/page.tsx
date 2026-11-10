import { CircleCheck } from "lucide-react";

import { SpotConnected } from "@/components/illustrations/spots";
import { Reveal } from "@/components/motion/Reveal";
import { AppWindow } from "@/components/product/AppWindow";
import { DemoSection } from "@/components/sections/DemoSection";
import { DarkHero } from "@/components/sections/DarkHero";
import { AppDetails } from "@/components/sections/ecosystem/AppDetails";
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
    "AskMiraa HRMS at the centre, connected to AnytimeHire for hiring, Expense Genie for expenses, CGB Helpdesk for IT support, Saleinx for sales and ProcureFlow for procurement. Real screens, and how each connection works.",
  path: "/connected-platform",
});

const TODAY = [
  "Approved headcount and cost per department, for the financial year",
  "New positions refused when they would go over budget",
  "What-if scenarios that cost extra headcount before anyone asks",
  "Requisitions with a CTC range, approved in order — then opened in AnytimeHire",
  "Payroll paid, Expense Genie spend and ProcureFlow purchasing beside each budget",
  "The Saleinx pipeline in the same view",
  "Ask Miraa answering “can we afford it?” from the budget",
];

export default function ConnectedPlatformPage() {
  return (
    <>
      <DarkHero
        eyebrow="The AskMiraa platform"
        eyebrowIcon={SpotConnected}
        title="Your HRMS, connected to the rest of the business"
        lead="AskMiraa runs people, attendance and payroll. Hiring, expenses, IT support, sales and procurement connect to it."
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
              Headcount budgets live in AskMiraa, next to the people who fill them — and the spend, purchasing and pipeline that decide them.
            </p>
            <div className="mt-8 grid gap-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <CircleCheck className="size-4 text-success-50" aria-hidden /> In AskMiraa
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
            title="What each app does, and how it joins AskMiraa"
            lead="AskMiraa is the record of who works here. Connected apps read people, departments and managers from it."
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
            eyebrow="Ask Miraa"
            title="Ask once, answered from the app that knows"
            lead="Miraa works as the person asking, with their permissions. It answers, and acts only when that person confirms."
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
            eyebrow="Connections"
            title="Every connection, and what it does"
            lead="Checked against each product's own code."
          />
          <div className="mt-12">
            <ConnectionMatrix />
          </div>
        </div>
      </section>

      <DemoSection
        title="See the platform with your own numbers"
        lead="Tell us which apps you run today. We will show you how they connect to AskMiraa."
      />
    </>
  );
}
