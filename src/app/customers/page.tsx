import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { StoryCard, type CustomerStory } from "@/components/sections/StoryCard";
import { CheckList, SectionHeading } from "@/components/sections/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Customer stories",
  description: "How HR teams run HR, attendance and payroll on AskMira — published with each customer's approval.",
  path: "/customers",
});

/**
 * Approved customer stories go here. Until there is one, the page shows a
 * clearly labelled example so the layout can be reviewed — never an invented
 * customer presented as real.
 */
const STORIES: CustomerStory[] = [];

const EXAMPLE: CustomerStory = {
  company: "[Customer name]",
  industry: "[Industry]",
  size: "[Headcount]",
  quote: "[The customer's own words, approved by them before publishing.]",
  person: "[Name]",
  role: "[Role, company]",
  results: [
    { value: "[—]", label: "[Measured result]" },
    { value: "[—]", label: "[Measured result]" },
    { value: "[—]", label: "[Measured result]" },
  ],
  placeholder: true,
};

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer stories"
        eyebrowIcon={<Quote className="size-4" aria-hidden />}
        title="Stories from HR teams on AskMira"
        lead="We are onboarding our first customers now. Their stories will appear here in their own words, with their numbers, and only with their permission."
      />

      <section className="section-y-sm bg-background" aria-labelledby="stories-heading">
        <div className="container-site">
          <h2 id="stories-heading" className="sr-only">
            Stories
          </h2>
          {STORIES.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {STORIES.map((s) => (
                <StoryCard key={s.company} story={s} />
              ))}
            </div>
          ) : (
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <Reveal className="pt-4">
                <StoryCard story={EXAMPLE} />
              </Reveal>
              <Reveal delay={0.1}>
                <SectionHeading
                  align="left"
                  as="h3"
                  title="What every story will include"
                  lead="We would rather show you an empty page than a made-up customer."
                />
                <CheckList
                  className="mt-8"
                  items={[
                    "The company's name and logo, with their written approval",
                    "A quote from a named person, in their own words",
                    "Results they measured themselves, with the period they cover",
                    "Which AskMira modules they use, and what they replaced",
                  ]}
                />
              </Reveal>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Could your team be one of the first stories?"
        lead="Book a demo and tell us what you want HR to stop spending its month on."
      />
    </>
  );
}
