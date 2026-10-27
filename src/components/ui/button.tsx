import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Button.
 *
 * Fully rounded, like the logo's lettering. One size scale everywhere:
 * `sm` 36px for menus, `default` 44px, `lg` 52px for hero and closing CTAs.
 *
 *   default  AskMira Red — the one primary action in a view
 *   deep     the deepest brand red, for CTAs on cream sections
 *   soft     blush, the secondary action next to a primary one
 *   outline  hairline, quiet actions
 *   inverse  white on the dark bands
 *   glass    translucent, the secondary action on the dark bands
 *   ghost    text-only with a hover fill (menus)
 *   link     inline text link
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgb(235_6_29/0.6)] hover:bg-brand-600 hover:shadow-[0_10px_24px_-8px_rgb(235_6_29/0.7)]",
        deep: "bg-brand-800 text-white shadow-soft hover:bg-brand-900",
        soft: "bg-blush-100 text-brand-800 hover:bg-blush-200",
        outline: "border border-cream-300 bg-card text-ink-900 shadow-soft hover:border-cream-400 hover:bg-cream-50",
        inverse: "bg-white text-ink-950 shadow-soft hover:bg-cream-100",
        glass:
          "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/15",
        ghost: "text-ink-800 hover:bg-cream-100 hover:text-ink-950",
        link: "h-auto rounded-sm px-0 text-brand-700 underline-offset-4 hover:text-brand-800 hover:underline active:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-sm has-[>svg]:px-3.5",
        default: "h-11 px-5 text-[0.9375rem] has-[>svg]:px-4.5",
        lg: "h-13 px-7 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0 has-[>svg]:px-0" }],
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
