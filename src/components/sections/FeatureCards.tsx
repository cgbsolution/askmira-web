import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { featureBySlug } from "@/lib/content/features";
import type { Feature } from "@/lib/content/types";
import { cn } from "@/lib/utils";

import { IconChip } from "./primitives";

export function FeatureCard({ feature, className }: { feature: Feature; className?: string }) {
  const Icon = feature.icon;
  return (
    <Link
      href={`/features/${feature.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-cream-200 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 outline-none hover:-translate-y-1 hover:border-cream-300 hover:shadow-card focus-visible:ring-[3px] focus-visible:ring-ring/60 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <IconChip icon={Icon} accent={feature.accent} />
        <ArrowUpRight className="size-5 text-ink-300 transition-colors group-hover:text-brand-700" aria-hidden />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-ink-950">{feature.name}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{feature.short}</p>
    </Link>
  );
}

/** A grid of feature cards by slug, in the order given. */
export function FeatureCards({ slugs, className }: { slugs: string[]; className?: string }) {
  const items = slugs.map(featureBySlug).filter((f): f is Feature => Boolean(f));
  return (
    <Stagger className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((f) => (
        <StaggerItem key={f.slug}>
          <FeatureCard feature={f} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
