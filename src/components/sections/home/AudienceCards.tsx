import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SpotTile, type SpotTone } from "@/components/illustrations/spots";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { solutions } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

import { SectionHeading } from "../primitives";

/**
 * Bold, full-colour cards, one per audience, each with its own illustration on
 * a tilted tile. Light text only on the darkest fills.
 */
const CARD_TONE: Record<string, { card: string; tile: SpotTone; tilt: string; dark: boolean }> = {
  "hr-teams": { card: "bg-brand-800 text-white", tile: "cream", tilt: "-rotate-6", dark: true },
  employees: { card: "bg-marigold-400 text-ink-950", tile: "white", tilt: "rotate-3", dark: false },
  managers: { card: "bg-brand-600 text-white", tile: "blush", tilt: "-rotate-3", dark: true },
  "finance-payroll": { card: "bg-ink-900 text-white", tile: "marigold", tilt: "rotate-6", dark: true },
  "growing-businesses": { card: "bg-blush-200 text-ink-950", tile: "white", tilt: "-rotate-3", dark: false },
  enterprise: { card: "bg-cream-200 text-ink-950", tile: "white", tilt: "rotate-3", dark: false },
};

export function AudienceCards() {
  return (
    <section aria-labelledby="audience-heading" className="section-y overflow-hidden bg-background">
      <div className="container-site">
        <SectionHeading
          id="audience-heading"
          eyebrow="Who it's for"
          title="Built for everyone who touches HR"
          lead="The same platform, seen from each seat in the company."
        />
      </div>
      <Stagger className="container-site mt-12 sm:mt-16">
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {solutions.map((s) => {
            const tone = CARD_TONE[s.slug] ?? CARD_TONE["hr-teams"]!;
            return (
              <li key={s.slug} className="w-[78%] shrink-0 snap-start xs:w-[60%] sm:w-[45%] lg:w-auto">
                <StaggerItem className="h-full">
                  <Link
                    href={`/solutions/${s.slug}`}
                    className={cn(
                      "group relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl p-7 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2",
                      tone.card,
                    )}
                  >
                    <SpotTile
                      icon={s.icon}
                      size="xl"
                      tone={tone.tile}
                      className={cn(
                        "size-24 self-end shadow-float transition-transform duration-500 group-hover:rotate-0 motion-reduce:transition-none",
                        tone.tilt,
                      )}
                    />
                    <h3 className="relative mt-auto pt-8 font-display text-display-4 font-semibold">{s.label}</h3>
                    <p className={cn("relative mt-2 text-[0.9375rem] leading-relaxed", tone.dark ? "text-white/80" : "text-ink-700")}>
                      {s.short}
                    </p>
                    <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                      See how
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </StaggerItem>
              </li>
            );
          })}
        </ul>
      </Stagger>
    </section>
  );
}
