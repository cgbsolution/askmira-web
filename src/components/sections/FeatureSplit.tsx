import { Reveal } from "@/components/motion/Reveal";
import { PANEL_MOCKUPS, ProductMockup } from "@/components/product/registry";
import type { MockupKey } from "@/lib/content/types";
import { cn } from "@/lib/utils";

import { ArrowLink, CheckList, Eyebrow, MockStage, type PanelTone } from "./primitives";

/**
 * Text on one side, a product preview on the other, alternating down the page.
 * Card-style previews are kept narrower so they never stretch awkwardly.
 */
export function FeatureSplit({
  eyebrow,
  title,
  body,
  points,
  mockup,
  reverse = false,
  tone = "blush",
  link,
  headingLevel = "h2",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  points: string[];
  mockup: MockupKey;
  reverse?: boolean;
  tone?: PanelTone;
  link?: { href: string; label: string };
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const panel = PANEL_MOCKUPS.has(mockup);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading className="mt-4 font-display text-display-3 font-semibold text-ink-950">{title}</Heading>
        <p className="mt-4 text-lead text-ink-600">{body}</p>
        <CheckList items={points} className="mt-7" />
        {link && <ArrowLink href={link.href} className="mt-8">{link.label}</ArrowLink>}
      </Reveal>
      <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
        <MockStage tone={tone}>
          <ProductMockup name={mockup} className={cn(panel && "mx-auto w-full max-w-md")} />
        </MockStage>
      </Reveal>
    </div>
  );
}
