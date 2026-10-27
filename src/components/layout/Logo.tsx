import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/brand/askmira-logo.png";
import mark from "@/assets/brand/askmira-mark.png";
import { cn } from "@/lib/utils";

/*
 * The AskMira logo, rendered from the brand kit's vector (public/brand) to a
 * high-resolution PNG so next/image can serve a few-kilobyte WebP or AVIF at
 * the size each page needs — the traced SVG is 39 KB even gzipped. The same
 * artwork reads on cream, white and the deep red bands.
 */

export function AskMiraLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="AskMira"
      priority={priority}
      sizes="160px"
      className={cn("h-9 w-auto select-none", className)}
    />
  );
}

export function AskMiraMark({ className }: { className?: string }) {
  return <Image src={mark} alt="" aria-hidden sizes="48px" className={cn("h-6 w-auto select-none", className)} />;
}

/** The logo as the home link. */
export function LogoLink({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="AskMira home"
      className={cn("inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60", className)}
    >
      <AskMiraLogo priority={priority} className="h-8 sm:h-9" />
    </Link>
  );
}
