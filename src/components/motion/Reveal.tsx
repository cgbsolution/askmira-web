"use client";

import { m, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. With reduced motion, the lift is dropped and only the fade remains.
 * `data-reveal` lets the no-script style in the layout show content at once.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** A group whose children (each a `StaggerItem`) reveal one after another. */
export function Stagger({
  children,
  className,
  amount = 0.02,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <m.div
      data-reveal=""
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div data-reveal="" className={cn(className)} variants={item}>
      {children}
    </m.div>
  );
}
