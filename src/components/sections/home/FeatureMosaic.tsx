import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SpotCalendarClock, SpotChart, SpotIdCard, SpotPayslip, SpotTile } from "@/components/illustrations/spots";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PayslipMock } from "@/components/product/mock-pay";
import { featureBySlug } from "@/lib/content/features";
import type { Feature } from "@/lib/content/types";
import { cn } from "@/lib/utils";

import { IconChip, SectionHeading } from "../primitives";

type Tile = {
  slug: string;
  span: string;
  variant: "white" | "deep" | "marigold" | "blush" | "ink";
  extra?: React.ReactNode;
};

function Chips({ items, tone }: { items: string[]; tone: "light" | "dark" }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-1.5">
      {items.map((i) => (
        <li
          key={i}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            tone === "dark" ? "bg-white/10 text-white/85" : "bg-white text-ink-700 ring-1 ring-cream-200",
          )}
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

function Bars() {
  const heights = [38, 46, 41, 55, 52, 63, 60, 71, 68, 78, 84, 90];
  return (
    <div aria-hidden className="mt-6 flex h-20 items-end gap-1.5">
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn("flex-1 rounded-t-sm", i === heights.length - 1 ? "bg-marigold-400" : "bg-white/20")}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

const TILES: Tile[] = [
  {
    slug: "payroll",
    span: "md:col-span-2 lg:row-span-2",
    variant: "deep",
    extra: (
      <div className="mt-8 -mb-10 max-w-sm translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
        <PayslipMock />
      </div>
    ),
  },
  {
    slug: "attendance-leave",
    span: "md:col-span-2",
    variant: "marigold",
    extra: <Chips tone="light" items={["Web", "Phone", "eSSL", "ZKTeco", "Kiosk", "Geofence"]} />,
  },
  { slug: "employee-management", span: "", variant: "white" },
  { slug: "self-service", span: "", variant: "white" },
  { slug: "recruitment-onboarding", span: "", variant: "white" },
  { slug: "performance", span: "", variant: "white" },
  { slug: "analytics", span: "md:col-span-2", variant: "ink", extra: <Bars /> },
  { slug: "expenses", span: "", variant: "white" },
  { slug: "documents", span: "", variant: "white" },
  { slug: "workflows", span: "", variant: "white" },
  { slug: "engagement", span: "", variant: "white" },
  {
    slug: "access-control",
    span: "md:col-span-2",
    variant: "blush",
    extra: <Chips tone="light" items={["Admin", "HR sub-admin", "Manager", "Employee", "SSO", "SCIM", "Audit log"]} />,
  },
];

const VARIANT = {
  white: "border-cream-200 bg-white text-ink-950 hover:border-cream-300 hover:shadow-card",
  deep: "border-transparent bg-deep text-white",
  marigold: "border-marigold-100 bg-marigold-50 text-ink-950 hover:border-marigold-200",
  blush: "border-blush-100 bg-blush-50 text-ink-950 hover:border-blush-200",
  ink: "border-transparent bg-ink-900 text-white",
} as const;

function FeatureTile({ feature, tile }: { feature: Feature; tile: Tile }) {
  const dark = tile.variant === "deep" || tile.variant === "ink";
  const Icon = feature.icon;
  const large = tile.span !== "";
  return (
    <Link
      href={`/features/${feature.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-[box-shadow,border-color,transform] duration-300 outline-none hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-ring/60 motion-reduce:hover:translate-y-0 sm:p-7",
        VARIANT[tile.variant],
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <IconChip icon={Icon} accent={dark ? "ink" : feature.accent} size={large ? "xl" : "lg"} />
        <ArrowUpRight
          className={cn(
            "size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            dark ? "text-white/60" : "text-ink-300 group-hover:text-brand-700",
          )}
          aria-hidden
        />
      </div>
      <h3 className={cn("mt-5 font-display font-semibold", large ? "text-display-4" : "text-xl")}>{feature.name}</h3>
      <p className={cn("mt-2 text-[0.9375rem] leading-relaxed", dark ? "text-white/70" : "text-ink-600")}>
        {large ? feature.intro : feature.short}
      </p>
      {tile.extra}
    </Link>
  );
}

export function FeatureMosaic() {
  return (
    <section aria-labelledby="mosaic-heading" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          id="mosaic-heading"
          eyebrow="Features"
          title="Twelve modules. One employee record."
          lead="Each part of AskMira works on its own, and better together — because they all read and write the same record."
        />
        <Stagger className="mt-12 grid grid-flow-dense gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile) => {
            const feature = featureBySlug(tile.slug);
            if (!feature) return null;
            return (
              <StaggerItem key={tile.slug} className={tile.span}>
                <FeatureTile feature={feature} tile={tile} />
              </StaggerItem>
            );
          })}
          <StaggerItem className="md:col-span-2">
            <Link
              href="/platform"
              className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-dashed border-cream-300 p-6 transition-colors outline-none hover:border-brand-300 hover:bg-cream-50 focus-visible:ring-[3px] focus-visible:ring-ring/60 sm:p-7"
            >
              <div>
                <div aria-hidden className="flex items-end">
                  <SpotTile icon={SpotIdCard} size="lg" className="-rotate-6" />
                  <SpotTile icon={SpotCalendarClock} size="lg" tone="marigold" className="-ml-3 mb-3 rotate-3" />
                  <SpotTile icon={SpotPayslip} size="lg" tone="cream" className="-ml-3 -rotate-3" />
                  <SpotTile icon={SpotChart} size="lg" className="-ml-3 mb-2 rotate-6" />
                </div>
                <p className="mt-6 font-display text-display-4 font-semibold text-ink-950">
                  See how the modules fit together on one record
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-brand-800">
                Platform overview
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
