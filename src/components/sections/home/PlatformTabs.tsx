import Link from "next/link";

import { ProductMockup } from "@/components/product/registry";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MockupKey } from "@/lib/content/types";

import { ArrowLink, CheckList, MockStage, SectionHeading, type PanelTone } from "../primitives";

const SUITES: {
  value: string;
  label: string;
  title: string;
  lead: string;
  points: string[];
  href: string;
  mockup: MockupKey;
  tone: PanelTone;
}[] = [
  {
    value: "core",
    label: "Core HR",
    title: "Every employee, one trusted record",
    lead: "Profiles, documents and approvals on the record payroll, attendance and the org chart all read from.",
    points: [
      "Personal, job, bank and statutory details on one profile",
      "Change requests with approval, and a history of every edit",
      "Excel import that checks every row first",
      "Letters from your own templates, filed on the profile",
      "Org chart, positions, entities and locations",
    ],
    href: "/features/employee-management",
    mockup: "profile",
    tone: "blush",
  },
  {
    value: "time",
    label: "Attendance & leave",
    title: "Attendance that is settled before payroll",
    lead: "Punches from the web, phones and biometric devices, worked out every night and locked when the month is done.",
    points: [
      "Geofenced web and phone punch",
      "eSSL and ZKTeco biometric devices",
      "Shifts, rosters, overtime and timesheets",
      "Leave policies, holidays by location, comp-off",
      "A monthly lock before payroll reads it",
    ],
    href: "/features/attendance-leave",
    mockup: "attendance",
    tone: "marigold",
  },
  {
    value: "payroll",
    label: "Payroll",
    title: "Payroll with the statutory work done",
    lead: "A run you can follow step by step, from locked attendance to the bank file and the filings.",
    points: [
      "PF with ECR, ESI, professional tax and LWF",
      "TDS under both regimes, 24Q and Form 16",
      "Arrears, loans, holds and full and final",
      "Bank files for five major Indian banks",
      "Journals for Tally and Zoho Books",
    ],
    href: "/features/payroll",
    mockup: "payroll",
    tone: "cream",
  },
  {
    value: "talent",
    label: "Talent",
    title: "Hire, onboard and grow your people",
    lead: "One path from an approved requisition to a productive teammate — and the reviews that help them grow.",
    points: [
      "Careers site and candidate pipeline",
      "Interview slots candidates pick themselves",
      "Onboarding tasks for HR, IT and managers",
      "Goals, one-on-ones and review cycles",
      "Calibration, increments and promotions",
    ],
    href: "/features/recruitment-onboarding",
    mockup: "pipeline",
    tone: "blush",
  },
  {
    value: "culture",
    label: "Culture",
    title: "Recognition, and a voice for everyone",
    lead: "The part of HR employees choose to open — and the signal HR needs to act early.",
    points: [
      "Company feed, shoutouts and awards",
      "Reward points people can see grow",
      "Surveys and polls with anonymity that holds",
      "Your Voice: anonymous concerns, handled as cases",
      "Clubs and events",
    ],
    href: "/features/engagement",
    mockup: "engagement",
    tone: "marigold",
  },
];

export function PlatformTabs() {
  return (
    <section id="features" aria-labelledby="platform-heading" className="section-y bg-background">
      <div className="container-site">
        <SectionHeading
          id="platform-heading"
          eyebrow="The platform"
          title="Everything HR runs on, in one place"
          lead="Five suites on one employee record. Switch on the ones you need today and add the rest as you grow."
        />

        <Tabs defaultValue="core" className="mt-12 gap-10 sm:mt-14">
          <TabsList
            aria-label="Platform suites"
            className="mask-fade-x -mx-4 flex h-auto w-[calc(100%+2rem)] justify-start gap-2 overflow-x-auto bg-transparent p-1 px-4 [scrollbar-width:none] sm:mx-0 sm:w-full sm:px-1 lg:[mask-image:none]"
          >
            {SUITES.map((s) => (
              <TabsTrigger
                key={s.value}
                value={s.value}
                className="h-12 min-w-max flex-1 rounded-full bg-marigold-50 px-5 text-[0.9375rem] font-semibold text-ink-800 hover:bg-marigold-100 hover:text-ink-950 data-[state=active]:bg-brand-800 data-[state=active]:text-white data-[state=active]:shadow-card"
              >
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {SUITES.map((s) => (
            <TabsContent
              key={s.value}
              value={s.value}
              className="grid items-center gap-10 duration-500 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
            >
              <div>
                <h3 className="font-display text-display-3 font-semibold text-ink-950">{s.title}</h3>
                <p className="mt-4 text-lead text-ink-600">{s.lead}</p>
                <CheckList items={s.points} className="mt-7" />
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Button asChild variant="deep" size="lg">
                    <Link href="/demo">Book a demo</Link>
                  </Button>
                  <ArrowLink href={s.href}>Learn more</ArrowLink>
                </div>
              </div>
              <MockStage tone={s.tone}>
                <ProductMockup name={s.mockup} />
              </MockStage>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
