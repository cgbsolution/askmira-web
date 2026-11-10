"use client";

import { m } from "motion/react";
import { useId } from "react";

import { cn } from "@/lib/utils";

/*
 * The hand-made layer of the site: a handwritten note with a drawn arrow, a
 * wavy underline under the phrase a heading leans on, and lines that draw
 * themselves in as they scroll into view. Colours are brand tokens; with
 * reduced motion everything appears already drawn.
 */

const EASE = [0.65, 0, 0.35, 1] as const;

const ARROWS = {
  /* Curls round and points down-right, towards the heading below. */
  "down-right": { viewBox: "0 0 60 40", d: "M4 10C18 2 38 2 46 14C50 20 50 27 46 33", head: "M38 29L46 34L50 25" },
  /* Curls round and points down-left. */
  "down-left": { viewBox: "0 0 60 40", d: "M56 10C42 2 22 2 14 14C10 20 10 27 14 33", head: "M22 29L14 34L10 25" },
  /* A loose swoop pointing right. */
  right: { viewBox: "0 0 60 40", d: "M3 28C16 8 34 6 52 16", head: "M44 9L53 16L45 23" },
} as const;

export type ArrowDirection = keyof typeof ARROWS;

/** A handwritten aside, slightly tilted, with an arrow that draws itself in. */
export function HandNote({
  children,
  tone = "light",
  arrow = "down-right",
  arrowFirst = false,
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  arrow?: ArrowDirection | null;
  /** Put the arrow before the words. */
  arrowFirst?: boolean;
  className?: string;
}) {
  const a = arrow ? ARROWS[arrow] : null;
  const svg = a && (
    <svg aria-hidden viewBox={a.viewBox} className="h-8 w-12 shrink-0 overflow-visible sm:h-9 sm:w-14" fill="none">
      <m.path
        d={a.d}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
      />
      <m.path
        d={a.head}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.3, ease: EASE, delay: 1 }}
      />
    </svg>
  );
  return (
    <m.span
      className={cn(
        "inline-flex -rotate-3 items-center gap-1.5 font-hand text-[1.5rem] leading-none font-bold sm:text-[1.75rem]",
        tone === "dark" ? "text-marigold-300" : "text-brand-600",
        className,
      )}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {arrowFirst && svg}
      <span>{children}</span>
      {!arrowFirst && svg}
    </m.span>
  );
}

/**
 * The phrase a heading leans on: italic, in the accent colour. Short phrases
 * get the wavy underline whole; for a long one, pass `underline={false}` and
 * wrap just its last words in <Squiggle> so the line can still wrap.
 */
export function Emph({
  children,
  tone = "light",
  underline = true,
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  underline?: boolean;
  className?: string;
}) {
  return (
    <em
      className={cn(
        "italic",
        tone === "dark"
          ? "text-marigold-400 [--squiggle:var(--color-brand-400)]"
          : "text-brand-700 [--squiggle:var(--color-marigold-500)]",
        className,
      )}
    >
      {underline ? <Squiggle>{children}</Squiggle> : children}
    </em>
  );
}

/** A wavy underline that draws from left to right. Keep the words short: they do not wrap. */
export function Squiggle({ children, className }: { children: React.ReactNode; className?: string }) {
  // The words trigger the reveal: a fully clipped line never counts as on screen.
  return (
    <m.span
      className={cn("relative inline-block", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      {children}
      <m.span
        aria-hidden
        className="squiggle-line absolute inset-x-0 -bottom-[0.14em] h-[0.2em]"
        variants={{
          hidden: { clipPath: "inset(0% 100% 0% 0%)" },
          shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease: EASE, delay: 0.3 } },
        }}
      />
    </m.span>
  );
}

/**
 * An SVG path that draws itself in when it scrolls into view. A dashed line is
 * revealed through a mask, because the draw-in itself works by dashing.
 */
export function DrawPath({
  d,
  className,
  strokeWidth = 4,
  dashed = false,
  duration = 1.6,
  delay = 0,
}: {
  d: string;
  className?: string;
  strokeWidth?: number;
  dashed?: boolean;
  duration?: number;
  delay?: number;
}) {
  const id = useId().replace(/:/g, "");
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration, ease: EASE, delay },
  };
  if (!dashed) {
    return (
      <m.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={className}
        {...draw}
      />
    );
  }
  return (
    <g className={className}>
      <mask id={`draw-${id}`} maskUnits="userSpaceOnUse">
        <m.path d={d} fill="none" stroke="white" strokeWidth={strokeWidth * 6} strokeLinecap="round" {...draw} />
      </mask>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${strokeWidth * 0.5} ${strokeWidth * 4}`}
        vectorEffect="non-scaling-stroke"
        mask={`url(#draw-${id})`}
      />
    </g>
  );
}

/** A soft wave along the top of a band, filled with the colour of the section above. */
export function WaveEdge({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-6 w-full sm:h-10", className)}
    >
      <path
        d="M0 0H1440V14C1320 34 1200 34 1080 22S840 2 720 14S480 38 360 26S120 0 0 16Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A small hand-drawn sparkle that bobs gently; purely decorative. */
export function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("animate-bob pointer-events-none absolute size-6", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <path d="M12 2C13 8 16 11 22 12C16 13 13 16 12 22C11 16 8 13 2 12C8 11 11 8 12 2Z" fill="currentColor" />
    </svg>
  );
}
