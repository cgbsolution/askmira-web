import { SpotMegaphone } from "@/components/illustrations/spots";

import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { formatLongDate } from "@/components/sections/ResourceCard";
import { Badge } from "@/components/ui/badge";
import { productUpdates } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product updates",
  description: "What the AskMira team has shipped recently, newest first.",
  path: "/resources/product-updates",
});

export default function ProductUpdatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product updates"
        eyebrowIcon={SpotMegaphone}
        title="What's new in AskMira"
        lead="The changes we have shipped lately, newest first."
        primary={null}
      />
      <section className="section-y-sm bg-background" aria-label="Updates">
        <div className="container-site max-w-4xl">
          <ol className="relative grid gap-6 border-l border-cream-300 pl-6 sm:pl-10">
            {productUpdates.map((u) => (
              <li key={u.title} className="relative">
                <span
                  aria-hidden
                  className="absolute top-2 -left-[1.95rem] size-3.5 rounded-full border-[3px] border-background bg-brand-500 ring-1 ring-brand-200 sm:-left-[2.95rem]"
                />
                <Reveal>
                  <div className="rounded-3xl border border-cream-200 bg-white p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <time dateTime={u.date} className="text-sm font-semibold text-ink-500">
                        {formatLongDate(u.date)}
                      </time>
                      {u.tags.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="mt-2 font-display text-display-4 font-semibold text-ink-950">{u.title}</h2>
                    <p className="mt-2 text-[0.9875rem] leading-relaxed text-ink-600">{u.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
