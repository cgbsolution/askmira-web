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

/*
 * Each arrow starts level with the middle of the words, arcs over and comes
 * down into the heading below. The head is a symmetric chevron laid along the
 * line's direction at its tip, so it never looks bent.
 */
const ARROWS = {
  /* Leaves the end of the note and hooks down into the heading. */
  "down-right": { d: "M4 16C14 6 30 4 36 14C40 21 38 31 32 40", head: "M31.8 32L32 40L39.4 37.1" },
  /* The mirror: leaves the start of the note and hooks down. */
  "down-left": { d: "M44 16C34 6 18 4 12 14C8 21 10 31 16 40", head: "M16.2 32L16 40L8.6 37.1" },
  /* A loose swoop pointing right. */
  right: { d: "M4 30C14 14 30 12 44 20", head: "M40.6 12.8L44 20L36 20.7" },
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
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      // Top-aligned: the line starts at the words' middle and its tip hangs
      // below them, over the heading.
      className={cn("size-10 shrink-0 self-start overflow-visible sm:size-11", arrow === "right" && "self-center")}
      fill="none"
    >
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
        "inline-flex -rotate-2 items-center gap-1 font-hand text-[1.5rem] leading-none font-bold sm:text-[1.75rem]",
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

/** Rays turning very slowly behind a panel, like sunlight; purely decorative. */
export function SunRays({ className }: { className?: string }) {
  const rays = Array.from({ length: 18 }, (_, i) => i * 20);
  return (
    <svg
      aria-hidden
      viewBox="-300 -300 600 600"
      className={cn("animate-spin-slow pointer-events-none absolute aspect-square", className)}
    >
      {rays.map((a) => (
        <path key={a} d="M0 0L36 -300H-36Z" transform={`rotate(${a})`} fill="currentColor" />
      ))}
    </svg>
  );
}
