import { Database } from "lucide-react";

import { SpotDashboard } from "@/components/illustrations/spots";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { MacBook } from "@/components/product/AppWindow";
import { screens } from "@/lib/content/screens";
import { CtaBand } from "@/components/sections/CtaBand";
import { DarkHero } from "@/components/sections/DarkHero";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { IntegrationsCloud } from "@/components/sections/home/IntegrationsCloud";
import { SecurityGrid } from "@/components/sections/home/SecurityGrid";
import { Showcase } from "@/components/sections/home/Showcase";
import { SectionHeading } from "@/components/sections/primitives";
import { FEATURE_GROUPS, features } from "@/lib/content/features";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Platform overview",
  description:
    "How AskMira's twelve modules — core HR, attendance, payroll, talent, culture and more — work on one employee record.",
  path: "/platform",
});

const FLOWS = [
  { from: "Employee record", to: "Payroll", what: "salary structure, bank account, PAN and UAN" },
  { from: "Attendance", to: "Payroll", what: "payable and loss-of-pay days, once the month is locked" },
  { from: "Performance", to: "Salary master", what: "approved increments and promotions" },
  { from: "Expenses", to: "Payroll", what: "approved salary reimbursements" },
  { from: "Hiring", to: "Onboarding", what: "the accepted candidate's details" },
  { from: "Reporting lines", to: "Approvals", what: "who approves what, and who sees which team" },
];

export default function PlatformPage() {
  return (
    <>
      <DarkHero
        eyebrow="Platform overview"
        eyebrowIcon={SpotDashboard}
        title="One employee record. Every HR process."
        lead="AskMira is twelve modules built on a single record of each person — so attendance feeds payroll, reviews feed increments, and nothing is typed twice."
        secondary={{ label: "See all features", href: "#all-features" }}
        visual={
          <MacBook screen={screens.amHome} priority />
        }
      />

      <section className="section-y bg-background" aria-labelledby="flows-heading">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="flows-heading"
              align="left"
              eyebrow="How it fits together"
              title="Data moves between modules on its own, with a record of each step"
              lead="These are the hand-offs that usually happen by spreadsheet and email. In AskMira they are part of the product."
            />
          </div>
          <Reveal>
            <ul className="grid gap-3">
              {FLOWS.map((f) => (
                <li key={f.from + f.to} className="flex flex-col gap-2 rounded-2xl border border-cream-200 bg-white p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                  <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
                    <span className="rounded-full bg-blush-100 px-3 py-1 text-brand-800">{f.from}</span>
                    <span aria-hidden className="text-ink-300">→</span>
                    <span className="sr-only">feeds</span>
                    <span className="rounded-full bg-marigold-100 px-3 py-1 text-marigold-900">{f.to}</span>
                  </div>
                  <p className="text-[0.9375rem] text-ink-600">{f.what}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-500">
              <Database className="size-4" aria-hidden />
              Every hand-off is recorded in the audit log, in the same transaction as the change.
            </p>
          </Reveal>
        </div>
      </section>

      <Showcase />

      <section id="all-features" className="section-y bg-background" aria-labelledby="all-features-heading">
        <div className="container-site">
          <SectionHeading
            id="all-features-heading"
            eyebrow="All features"
            title="Twelve modules, switched on as you need them"
            lead="Modules are turned on per workspace. Start with what hurts most; the record underneath stays the same."
          />
          <div className="mt-14 grid gap-14">
            {FEATURE_GROUPS.map((group) => (
              <div key={group}>
                <h3 className="text-sm font-semibold tracking-[0.08em] text-ink-400 uppercase">{group}</h3>
                <FeatureCards slugs={features.filter((f) => f.group === group).map((f) => f.slug)} className="mt-5" />
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-[0.9375rem] text-ink-600">
            Looking at it from a role or company size instead?{" "}
            <Link href="/solutions/hr-teams" className="font-semibold text-brand-800 underline underline-offset-4">
              See solutions
            </Link>
            .
          </p>
        </div>
      </section>

      <IntegrationsCloud />
      <SecurityGrid />
      <CtaBand />
    </>
  );
}
