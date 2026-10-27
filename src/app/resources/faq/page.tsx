import { MessageCircleQuestion } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { faqGroups } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently asked questions",
  description: "Answers about getting started with AskMira, Indian payroll and compliance, security, AI and pricing.",
  path: "/resources/faq",
});

const anchor = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.items);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        eyebrowIcon={<MessageCircleQuestion className="size-4" aria-hidden />}
        title="Questions, answered plainly"
        lead="If yours is not here, ask us — in a demo or through the contact form."
        primary={{ label: "Ask a question", href: "/contact" }}
      >
        <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap justify-center gap-2">
          {faqGroups.map((g) => (
            <a
              key={g.title}
              href={`#${anchor(g.title)}`}
              className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-ink-700 outline-none hover:border-brand-300 hover:text-brand-800 focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </PageHero>
      <section className="section-y-sm bg-background" aria-label="Questions">
        <div className="container-site grid max-w-5xl gap-14">
          {faqGroups.map((g) => (
            <div key={g.title} id={anchor(g.title)} className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:gap-10">
              <h2 className="font-display text-display-4 font-semibold text-ink-950">{g.title}</h2>
              <FaqList items={g.items} withSchema={false} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
