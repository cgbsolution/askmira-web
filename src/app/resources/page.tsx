import { ArrowUpRight } from "lucide-react";

import { SpotBook, SpotNews, SpotQuestion, SpotQuote, SpotTile } from "@/components/illustrations/spots";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { formatLongDate, GuideCard } from "@/components/sections/ResourceCard";
import { ArrowLink, SectionHeading } from "@/components/sections/primitives";
import { Badge } from "@/components/ui/badge";
import { guides, productUpdates } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  description: "Practical guides for Indian HR and payroll teams, AskMira product updates, FAQs and customer stories.",
  path: "/resources",
});

const HUBS = [
  { icon: SpotNews, title: "Product updates", body: "What we have shipped recently, newest first.", href: "/resources/product-updates" },
  { icon: SpotQuestion, title: "FAQ", body: "Setup, payroll, security, AI and pricing questions.", href: "/resources/faq" },
  { icon: SpotQuote, title: "Customer stories", body: "How teams run HR on AskMira.", href: "/customers" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        eyebrowIcon={SpotBook}
        title="Practical help for Indian HR teams"
        lead="Guides that are useful whether or not you choose AskMira, a log of what we ship, and straight answers to common questions."
        primary={null}
      />

      <section id="guides" className="section-y-sm bg-background" aria-labelledby="guides-heading">
        <div className="container-site">
          <SectionHeading id="guides-heading" align="left" title="Guides" lead="Step-by-step, with the details that usually go missing." />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <StaggerItem key={g.slug}>
                <GuideCard guide={g} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="updates-heading">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="updates-heading" align="left" title="Recent updates" lead="The latest from the product." />
            <ArrowLink href="/resources/product-updates" className="mt-6">
              All product updates
            </ArrowLink>
          </div>
          <ol className="grid gap-3">
            {productUpdates.slice(0, 4).map((u) => (
              <li key={u.title} className="rounded-3xl border border-cream-200 bg-white p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <time dateTime={u.date} className="text-sm font-medium text-ink-500">
                    {formatLongDate(u.date)}
                  </time>
                  {u.tags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-950">{u.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{u.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-label="More resources">
        <div className="container-site">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {HUBS.map(({ icon: Icon, title, body, href }) => (
              <StaggerItem key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-3xl bg-marigold-50 p-7 transition-colors outline-none hover:bg-marigold-100 focus-visible:ring-[3px] focus-visible:ring-ring/60"
                >
                  <div className="flex items-center justify-between">
                    <SpotTile icon={Icon} size="lg" tone="white" />
                    <ArrowUpRight className="size-5 text-marigold-800/60 group-hover:text-marigold-900" aria-hidden />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-semibold text-ink-950">{title}</h2>
                  <p className="mt-2 text-[0.9375rem] text-ink-700">{body}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
