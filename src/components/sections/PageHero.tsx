import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { SpotIcon } from "@/components/illustrations/spots";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Eyebrow, EyebrowSpot } from "./primitives";

/**
 * The opening of every inner page: cream, centred or split, with the
 * reference's illustrated-eyebrow → serif headline → two CTAs rhythm.
 */
export function PageHero({
  eyebrow,
  eyebrowIcon,
  title,
  lead,
  primary = { label: "Book a demo", href: "/demo" },
  secondary,
  layout = "center",
  tone = "cream",
  visual,
  children,
}: {
  eyebrow?: string;
  eyebrowIcon?: SpotIcon;
  title: React.ReactNode;
  lead?: React.ReactNode;
  primary?: { label: string; href: string } | null;
  secondary?: { label: string; href: string };
  layout?: "center" | "split";
  tone?: "cream" | "marigold" | "blush";
  visual?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const bg = {
    cream: "bg-background",
    marigold: "bg-gradient-to-b from-marigold-50 to-background",
    blush: "bg-gradient-to-b from-blush-50 to-background",
  }[tone];

  const text = (
    <>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow icon={eyebrowIcon && <EyebrowSpot icon={eyebrowIcon} />}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h1 className="mt-5 font-display text-display-1 font-semibold text-ink-950">{title}</h1>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className={cn("mt-6 text-lead text-ink-600", layout === "center" && "mx-auto max-w-2xl")}>{lead}</p>
        </Reveal>
      )}
      {(primary || secondary) && (
        <Reveal delay={0.15}>
          <div
            className={cn(
              "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center",
              layout === "center" && "justify-center",
            )}
          >
            {primary && (
              <Button asChild size="lg" variant="deep">
                <Link href={primary.href}>
                  {primary.label} <ArrowRight />
                </Link>
              </Button>
            )}
            {secondary && (
              <Button asChild size="lg" variant="soft">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </Reveal>
      )}
      {children}
    </>
  );

  return (
    <section className={cn("relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-44", bg)}>
      <div className="container-site relative">
        {layout === "center" ? (
          <>
            <div className="mx-auto max-w-4xl text-center">{text}</div>
            {visual && (
              <Reveal delay={0.2} y={40} amount={0.05} className="mx-auto mt-14 max-w-5xl sm:mt-16">
                {visual}
              </Reveal>
            )}
          </>
        ) : (
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="[&_h1]:text-display-2">{text}</div>
            {visual && (
              <Reveal delay={0.2} y={32} amount={0.05}>
                {visual}
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
