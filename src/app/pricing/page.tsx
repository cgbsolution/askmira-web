import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SpotHeadset, SpotTeam, SpotTile } from "@/components/illustrations/spots";

import { DemoSection } from "@/components/sections/DemoSection";
import { FaqList } from "@/components/sections/FaqList";
import { PricingHero } from "@/components/sections/pricing/PlanCards";
import { PlanComparison } from "@/components/sections/pricing/PlanComparison";
import { CheckList, Eyebrow, SectionHeading } from "@/components/sections/primitives";
import { Button } from "@/components/ui/button";
import { faqGroups } from "@/lib/content/faq";
import { CUSTOM_PLANS } from "@/lib/content/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "AskMiraa plans: Free for up to 20 employees, and Core, Premium and Ultimate from ₹4,999 a month for up to 50 employees, with a low price for each additional employee.",
  path: "/pricing",
});

const INCLUDED = [
  "Single sign-on, two-step verification and IP allowlists",
  "The insert-only audit log and role-based access",
  "Excel import of your existing employee data",
  "Help guides on every page",
  "Email and in-app notifications in your branding",
  "Setup support from our team",
];

const STEPS = [
  { title: "Pick a plan", body: "Start on Free, or choose the plan that covers what you run today. You can move up at any time." },
  { title: "Talk to us", body: "A short call to confirm your headcount, companies and the payroll rules you follow." },
  { title: "Your workspace, set up with you", body: "Our team creates the workspace and your first admin; you import your people." },
];

const CUSTOM_ICONS = [SpotTeam, SpotHeadset];

export default function PricingPage() {
  const pricingFaqs = [
    ...(faqGroups.find((g) => g.title === "Pricing")?.items ?? []),
    ...(faqGroups.find((g) => g.title === "Getting started")?.items.slice(0, 2) ?? []),
  ];
  return (
    <>
      <PricingHero />

      <section className="section-y-sm bg-background" aria-labelledby="custom-heading">
        <div className="container-site">
          <div className="bg-deep relative isolate grid gap-8 overflow-hidden rounded-[2rem] p-6 text-white sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-12">
            <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-50" />
            <div className="flex flex-col items-start">
              <Eyebrow tone="dark">Custom plans</Eyebrow>
              <h2 id="custom-heading" className="mt-5 font-display text-display-3 font-semibold">
                Need something different?
              </h2>
              <p className="mt-4 text-[0.9875rem] leading-relaxed text-white/75">
                Pricing on request, built around your headcount, sites and the modules you need.
              </p>
              <Button asChild size="lg" variant="inverse" className="mt-7">
                <Link href="#demo">
                  Talk to us <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CUSTOM_PLANS.map((p, i) => (
                <div key={p.name} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                  <SpotTile icon={CUSTOM_ICONS[i] ?? SpotTeam} size="md" tone={i === 0 ? "blush" : "marigold"} />
                  <h3 className="mt-5 text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{p.body}</p>
                  <p className="mt-4 text-sm font-semibold text-marigold-300">Pricing on request</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="compare" className="section-y-sm scroll-mt-24 bg-background" aria-labelledby="compare-heading">
        <div className="container-site">
          <SectionHeading
            id="compare-heading"
            eyebrow="Compare plans"
            title="Everything in each plan"
            lead="Each plan includes everything in the one before it."
          />
          <div className="mt-12">
            <PlanComparison />
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="included-heading">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-blush-100 bg-blush-50 p-8 sm:p-10">
            <h2 id="included-heading" className="font-display text-display-3 font-semibold text-ink-950">
              In every plan
            </h2>
            <CheckList items={INCLUDED} className="mt-7" />
          </div>
          <div className="rounded-[2rem] bg-ink-950 p-8 text-white sm:p-10">
            <h2 className="font-display text-display-3 font-semibold">How to get started</h2>
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
        title="Start with the right plan"
        lead="Tell us your headcount and which plan you are looking at. We will set up your workspace or a free trial with you."
        topic="pricing"
      />
    </>
  );
}
