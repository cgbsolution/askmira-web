import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card.
 *
 *   default  white, hairline border, soft shadow — feature and resource cards
 *   muted    cream fill, no shadow — cards that sit on white sections
 *   outline  border only — dense lists
 *   dark     translucent white on the dark bands
 *
 * `interactive` adds the lift-on-hover used by cards that are links.
 */
const cardVariants = cva("flex flex-col gap-6 rounded-3xl py-6 text-card-foreground", {
  variants: {
    variant: {
      default: "border border-cream-200 bg-card shadow-soft",
      muted: "border border-cream-200/70 bg-cream-100/70",
      outline: "border border-cream-300 bg-transparent",
      dark: "border border-white/10 bg-white/[0.06] text-white",
    },
    interactive: {
      true: "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-cream-300 hover:shadow-card motion-reduce:hover:translate-y-0",
      false: "",
    },
  },
  defaultVariants: { variant: "default", interactive: false },
});

function Card({
  className,
  variant,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div data-slot="card" className={cn(cardVariants({ variant, interactive }), className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-display text-xl leading-snug font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[0.9375rem] leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants };
