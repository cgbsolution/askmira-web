import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { SpotIcon } from "@/components/illustrations/spots";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

import { Eyebrow, EyebrowSpot } from "./primitives";

/** The deep-red hero used by the platform-level pages, with a visual below. */
export function DarkHero({
  eyebrow,
  eyebrowIcon,
  title,
  lead,
  secondary,
  visual,
}: {
  eyebrow: string;
  eyebrowIcon?: SpotIcon;
  title: React.ReactNode;
  lead: React.ReactNode;
  secondary?: { label: string; href: string };
  visual?: React.ReactNode;
}) {
  return (
    <section className="bg-deep relative isolate overflow-hidden text-white">
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[65%]" />
      <div className="container-site relative pt-32 pb-16 text-center sm:pt-36 sm:pb-24 lg:pt-44">
        <Reveal y={12}>
          <Eyebrow tone="dark" icon={eyebrowIcon && <EyebrowSpot icon={eyebrowIcon} />}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-display-1 font-semibold">{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/75">{lead}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/demo">
                Book a demo <ArrowRight />
              </Link>
            </Button>
            {secondary && (
              <Button asChild size="lg" variant="glass">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </Reveal>
        {visual && (
          <Reveal delay={0.25} y={40} amount={0.05} className="mx-auto mt-14 max-w-6xl text-left sm:mt-16">
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  );
}
