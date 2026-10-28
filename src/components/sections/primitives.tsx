import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { SpotTile, type SpotIcon, type SpotTone } from "@/components/illustrations/spots";
import { Reveal } from "@/components/motion/Reveal";
import type { Accent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/*
 * Shared section pieces. One type scale and one spacing rhythm for every page:
 * eyebrow → display heading → lead, then content 48–64px below.
 */

export function Eyebrow({
  children,
  icon,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "light" | "dark" | "marigold";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold",
        tone === "light" && "bg-blush-100 text-brand-800",
        tone === "marigold" && "bg-marigold-100 text-marigold-900",
        tone === "dark" && "border border-white/15 bg-white/10 text-white",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
  as: Tag = "h2",
  id,
  className,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow && (typeof eyebrow === "string" ? <Eyebrow tone={tone === "dark" ? "dark" : "light"}>{eyebrow}</Eyebrow> : eyebrow)}
      <Tag
        id={id}
        className={cn(
          "font-display text-display-2 font-semibold",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p className={cn("text-lead", tone === "dark" ? "text-white/75" : "text-ink-600")}>{lead}</p>
      )}
    </Reveal>
  );
}

export function CheckList({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
              tone === "dark" ? "bg-marigold-500 text-ink-950" : "bg-brand-800 text-white",
            )}
          >
            <Check className="size-3" strokeWidth={3} aria-hidden />
          </span>
          <span className={cn("text-[0.9875rem] leading-relaxed", tone === "dark" ? "text-white/85" : "text-ink-700")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** "Learn more →" — an inline link with a sliding arrow. */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-sm text-[0.9375rem] font-semibold underline decoration-2 underline-offset-[6px] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        tone === "dark"
          ? "text-marigold-300 decoration-marigold-300/40 hover:text-marigold-200 hover:decoration-marigold-200"
          : "text-brand-800 decoration-brand-800/25 hover:text-brand-700 hover:decoration-brand-700",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

const ACCENT_TONE: Record<Accent, SpotTone> = {
  red: "blush",
  marigold: "marigold",
  blush: "cream",
  ink: "cream",
};

/** A small round spot that sits at the start of an eyebrow pill. */
export function EyebrowSpot({ icon }: { icon: SpotIcon }) {
  return <SpotTile icon={icon} size="xs" tone="white" className="-my-1 -ml-2 size-7 rounded-full p-1" />;
}

/** A spot illustration on its tile, toned by the item's accent. */
export function IconChip({
  icon,
  accent = "red",
  size = "lg",
  className,
}: {
  icon: SpotIcon;
  accent?: Accent;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  return <SpotTile icon={icon} size={size} tone={ACCENT_TONE[accent]} className={className} />;
}

const PANEL_TONE = {
  blush: "bg-blush-50 border-blush-100",
  marigold: "bg-marigold-50 border-marigold-100",
  cream: "bg-cream-100 border-cream-200",
  white: "bg-white border-cream-200",
} as const;

export type PanelTone = keyof typeof PANEL_TONE;

/** A soft tinted panel that holds a product preview. */
export function MockStage({
  tone = "blush",
  children,
  className,
}: {
  tone?: PanelTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border p-4 sm:p-8 lg:p-10", PANEL_TONE[tone], className)}>
      <div className="relative">{children}</div>
    </div>
  );
}
