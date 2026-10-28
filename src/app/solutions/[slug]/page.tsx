import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PANEL_MOCKUPS, ProductMockup } from "@/components/product/registry";
import { DemoSection } from "@/components/sections/DemoSection";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { PageHero } from "@/components/sections/PageHero";
import { IconChip, MockStage, type PanelTone, SectionHeading } from "@/components/sections/primitives";
import { featureBySlug } from "@/lib/content/features";
import { solutionBySlug, solutions } from "@/lib/content/solutions";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionBySlug(slug);
  if (!solution) return {};
  return pageMetadata({ title: solution.name, description: solution.seoDescription, path: `/solutions/${slug}` });
}

const TONES: PanelTone[] = ["marigold", "blush", "cream"];

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = solutionBySlug(slug);
  if (!solution) notFound();
  const heroIsPanel = PANEL_MOCKUPS.has(solution.heroMockup);

  return (
    <>
      <PageHero
        layout="split"
        tone="marigold"
        eyebrow={`For ${solution.label.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase())}`}
        eyebrowIcon={solution.icon}
        title={solution.headline}
        lead={solution.intro}
        secondary={{ label: "What changes", href: "#outcomes" }}
        visual={
          <MockStage tone="white">
            <ProductMockup name={solution.heroMockup} className={cn(heroIsPanel && "mx-auto w-full max-w-md")} />
          </MockStage>
        }
      />

      <section className="section-y-sm bg-background" aria-labelledby="pains-heading">
        <div className="container-site">
          <SectionHeading id="pains-heading" eyebrow="Sound familiar?" title="What gets in the way today" />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {solution.pains.map((pain, i) => (
              <StaggerItem key={pain.title}>
                <div className="h-full rounded-3xl border border-cream-200 bg-white p-7">
                  <IconChip icon={pain.icon} accent={i === 1 ? "marigold" : "red"} />
                  <h3 className="mt-5 text-lg font-semibold text-ink-950">{pain.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{pain.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="outcomes" className="section-y bg-background" aria-label="How AskMira helps">
        <div className="container-site grid gap-20 lg:gap-28">
          {solution.outcomes.map((o, i) => {
            const feature = featureBySlug(o.feature);
            return (
              <FeatureSplit
                key={o.title}
                eyebrow={o.eyebrow}
                title={o.title}
                body={o.body}
                points={o.points}
                mockup={o.mockup}
                reverse={i % 2 === 1}
                tone={TONES[i % TONES.length]}
                link={feature ? { href: `/features/${feature.slug}`, label: `More on ${feature.name.toLowerCase()}` } : undefined}
              />
            );
          })}
        </div>
      </section>

      <section className="section-y bg-ink-950 text-white" aria-labelledby="month-heading">
        <div className="container-site">
          <SectionHeading id="month-heading" tone="dark" eyebrow="In practice" title="What a month looks like" />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.month.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.05] p-7">
                  <span className="grid size-10 place-items-center rounded-full bg-marigold-500 text-sm font-bold text-ink-950">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="features-heading">
        <div className="container-site">
          <SectionHeading id="features-heading" eyebrow="The features behind it" title="Where to look first" />
          <FeatureCards slugs={solution.features} className="mt-12" />
          <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-sm font-medium text-ink-500">Also built for</span>
            {solutions
              .filter((s) => s.slug !== solution.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-ink-800 transition-colors outline-none hover:border-brand-300 hover:text-brand-800 focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {s.label}
                </Link>
              ))}
          </Reveal>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
