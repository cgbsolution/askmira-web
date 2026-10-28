import { SpotCalendarClock, SpotChart, SpotHeart, SpotIdCard, SpotMedal, SpotPayslip, SpotReceipt, SpotRecruit, SpotRupee, type SpotIcon } from "@/components/illustrations/spots";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DemoSection } from "@/components/sections/DemoSection";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { CheckList, IconChip, SectionHeading } from "@/components/sections/primitives";
import { faqGroups } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "AskMira is quoted per workspace, on the modules you switch on and your number of employees. Every workspace includes security, self-service and support for setup.",
  path: "/pricing",
});

/** The modules a workspace can switch on — the same list as in Settings → Modules. */
const MODULES: { icon: SpotIcon; name: string; body: string }[] = [
  { icon: SpotIdCard, name: "Core HR", body: "Employee records, documents, org chart, onboarding and self-service." },
  { icon: SpotCalendarClock, name: "Leave & attendance", body: "Punch, shifts, overtime, timesheets, leave and holidays." },
  { icon: SpotPayslip, name: "Payroll", body: "Statutory payroll, payslips, bank files, filings and full and final." },
  { icon: SpotRecruit, name: "Hiring", body: "Requisitions, careers site, pipeline, interviews and offers." },
  { icon: SpotHeart, name: "Culture", body: "Feed, shoutouts, awards, surveys, polls, clubs and Your Voice." },
  { icon: SpotChart, name: "Analytics", body: "Dashboards and the report library across modules." },
  { icon: SpotRupee, name: "Benefits", body: "Benefits and stock options for employees." },
  { icon: SpotMedal, name: "Rewards", body: "Reward points that recognition adds up to." },
];

const INCLUDED = [
  "Single sign-on, two-step verification and IP allowlists",
  "The insert-only audit log and role-based access",
  "Employee self-service in any phone browser",
  "Help guides on every page",
  "Excel import of your existing employee data",
  "Email and in-app notifications in your branding",
];

const STEPS = [
  { title: "A 30-minute demo", body: "We learn how you run HR and payroll today, and show the parts of AskMira that fit." },
  { title: "Your quote, in writing", body: "Based on the modules you want and your number of employees." },
  { title: "Your workspace, set up with you", body: "Our team creates the workspace and your first admin; you import your people." },
];

export default function PricingPage() {
  const pricingFaqs = [
    ...(faqGroups.find((g) => g.title === "Pricing")?.items ?? []),
    ...(faqGroups.find((g) => g.title === "Getting started")?.items.slice(0, 3) ?? []),
  ];
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        eyebrowIcon={SpotReceipt}
        title="Pay for the HR you actually run"
        lead="AskMira is quoted per workspace, on the modules you switch on and your number of employees. Start with what hurts most and add modules later — the record underneath stays the same."
        primary={{ label: "Get a quote", href: "#demo" }}
        secondary={{ label: "See the modules", href: "#modules" }}
      />

      <section id="modules" className="section-y-sm bg-background" aria-labelledby="modules-heading">
        <div className="container-site">
          <SectionHeading
            id="modules-heading"
            eyebrow="Modules"
            title="Switch on what you need"
            lead="Each module is turned on per workspace, and can be added at any time."
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map(({ icon: Icon, name, body }, i) => (
              <StaggerItem key={name}>
                <div className="h-full rounded-3xl border border-cream-200 bg-white p-6">
                  <IconChip icon={Icon} accent={i % 3 === 0 ? "red" : i % 3 === 1 ? "marigold" : "blush"} />
                  <h3 className="mt-5 text-lg font-semibold text-ink-950">{name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="included-heading">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-marigold-100 bg-marigold-50 p-8 sm:p-10">
            <h2 id="included-heading" className="font-display text-display-3 font-semibold text-ink-950">
              In every workspace
            </h2>
            <CheckList items={INCLUDED} className="mt-7" />
          </div>
          <div className="rounded-[2rem] bg-ink-950 p-8 text-white sm:p-10">
            <h2 className="font-display text-display-3 font-semibold">How a quote works</h2>
            <ol className="mt-7 grid gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-marigold-500 text-sm font-bold text-ink-950">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-white/70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="pricing-faq-heading">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="pricing-faq-heading" align="left" title="Pricing questions" />
          <FaqList items={pricingFaqs} />
        </div>
      </section>

      <DemoSection
        title="Get a quote for your company"
        lead="Tell us your headcount and the modules you are interested in. We will come back with a walkthrough and a written quote."
        topic="pricing"
      />
    </>
  );
}
