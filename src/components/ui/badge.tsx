import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Badge. Status variants (`success`, `info`) are never a brand tint, because
 * the brand is red and red reads as an error.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border font-medium transition-colors [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        accent: "border-transparent bg-marigold-100 text-marigold-900",
        secondary: "border-transparent bg-blush-100 text-brand-800",
        outline: "border-cream-300 bg-card text-ink-700",
        success: "border-transparent bg-success-50 text-success-600",
        info: "border-transparent bg-info-50 text-info-600",
        warning: "border-transparent bg-marigold-50 text-marigold-800",
        muted: "border-transparent bg-cream-100 text-ink-500",
        dark: "border-white/15 bg-white/10 text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.6875rem]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-[0.8125rem]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
