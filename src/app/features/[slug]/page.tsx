import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PANEL_MOCKUPS, ProductMockup } from "@/components/product/registry";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { PageHero } from "@/components/sections/PageHero";
import { IconChip, MockStage, SectionHeading, type PanelTone } from "@/components/sections/primitives";
import { featureBySlug, features } from "@/lib/content/features";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  if (!feature) return {};
  return pageMetadata({ title: feature.seoTitle, description: feature.seoDescription, path: `/features/${slug}` });
}

const TONES: PanelTone[] = ["blush", "marigold", "cream"];

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  if (!feature) notFound();
  const Icon = feature.icon;
  const heroIsPanel = PANEL_MOCKUPS.has(feature.heroMockup);

  return (
    <>
      <PageHero
        eyebrow={feature.name}
        eyebrowIcon={<Icon className="size-4" aria-hidden />}
        title={feature.headline}
        lead={feature.intro}
        secondary={{ label: "How it works", href: "#how-it-works" }}
        tone={feature.accent === "marigold" ? "marigold" : "blush"}
        visual={
          heroIsPanel ? (
            <MockStage tone="white">
              <ProductMockup name={feature.heroMockup} className="mx-auto w-full max-w-md" />
            </MockStage>
          ) : (
            <ProductMockup name={feature.heroMockup} />
          )
        }
      />

      <section className="section-y-sm bg-background">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-6 rounded-[2rem] border border-marigold-100 bg-marigold-50 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:p-12">
              <h2 className="font-display text-display-3 font-semibold text-ink-950">{feature.whatIs.title}</h2>
              <div className="space-y-4 text-lead text-ink-700">
                {feature.whatIs.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="section-y bg-background" aria-label="How it works">
        <div className="container-site grid gap-20 lg:gap-28">
          {feature.blocks.map((block, i) => (
            <FeatureSplit
              key={block.title}
              eyebrow={block.eyebrow}
              title={block.title}
              body={block.body}
              points={block.points}
              mockup={block.mockup}
              reverse={i % 2 === 1}
              tone={TONES[i % TONES.length]}
            />
          ))}
        </div>
      </section>

      <section className="section-y-sm bg-white" aria-labelledby="highlights-heading">
        <div className="container-site">
          <h2 id="highlights-heading" className="sr-only">
            Also in {feature.name}
          </h2>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {feature.highlights.map(({ icon: HIcon, title, body }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-3xl border border-cream-200 bg-background p-6 sm:p-7">
                  <IconChip accent={feature.accent}>
                    <HIcon aria-hidden />
                  </IconChip>
                  <h3 className="mt-5 text-lg font-semibold text-ink-950">{title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="faq-heading">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="faq-heading" align="left" title="Questions about this" lead={`${feature.name} in AskMira, in a few short answers.`} />
          <FaqList items={feature.faqs} />
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="related-heading">
        <div className="container-site">
          <h2 id="related-heading" className="font-display text-display-4 font-semibold text-ink-950">
            Works hand in hand with
          </h2>
          <FeatureCards slugs={feature.related} className="mt-8" />
        </div>
      </section>

      <CtaBand title={`See ${feature.name.toLowerCase()} in AskMira`} />
    </>
  );
}
