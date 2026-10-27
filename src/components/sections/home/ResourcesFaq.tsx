import { homeFaqs } from "@/lib/content/faq";
import { guides, productUpdates } from "@/lib/content/resources";

import { FaqList } from "../FaqList";
import { formatLongDate, GuideCard } from "../ResourceCard";
import { ArrowLink, SectionHeading } from "../primitives";

export function ResourcesFaq() {
  const latest = productUpdates[0];
  return (
    <section aria-labelledby="resources-heading" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          id="resources-heading"
          eyebrow="Resources"
          title="Practical help for Indian HR teams"
          lead="Guides you can use whether or not you choose AskMira, and what we have shipped lately."
        />
        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
        {latest && (
          <div className="mt-4 flex flex-col gap-3 rounded-3xl bg-marigold-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-marigold-800 uppercase">
                Latest update · {formatLongDate(latest.date)}
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-ink-950">{latest.title}</p>
            </div>
            <ArrowLink href="/resources/product-updates">All product updates</ArrowLink>
          </div>
        )}

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-display-3 font-semibold text-ink-950">Questions we hear often</h2>
            <p className="mt-4 text-lead text-ink-600">Short answers. More on the FAQ page, or ask us in a demo.</p>
            <ArrowLink href="/resources/faq" className="mt-6">
              Read the full FAQ
            </ArrowLink>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
