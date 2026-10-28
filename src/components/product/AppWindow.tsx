import Image from "next/image";
import { Lock } from "lucide-react";

import type { Screen } from "@/lib/content/screens";
import { APPS } from "@/lib/content/screens";
import { cn } from "@/lib/utils";

/**
 * A macOS-style window around a real product screenshot. The screenshot is the
 * product as it renders today, captured from a demo workspace with sample data.
 */
export function AppWindow({
  screen,
  className,
  sizes = "(min-width: 1280px) 1100px, 100vw",
  priority,
  crop,
  chrome = "full",
  children,
}: {
  screen: Screen;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Show only part of the screenshot, zoomed in: left, top and width as % of the full image. */
  crop?: { x: number; y: number; w: number };
  /** "full" has an address bar; "slim" only the three window buttons (for small windows). */
  chrome?: "full" | "slim";
  /** Overlays positioned over the screenshot (hotspots). */
  children?: React.ReactNode;
}) {
  const app = APPS[screen.app];
  const dark = screen.theme === "dark";
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl border font-ui shadow-float",
        dark ? "border-white/10 bg-mac-body" : "border-ink-950/10 bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3",
          chrome === "full" ? "h-9" : "h-6",
          dark ? "border-white/10 bg-mac-bar-dark" : "border-ink-950/[0.06] bg-mac-bar",
        )}
      >
        <span aria-hidden className="flex gap-1.5">
          <span className={cn("rounded-full bg-mac-close", chrome === "full" ? "size-3" : "size-2")} />
          <span className={cn("rounded-full bg-mac-minimise", chrome === "full" ? "size-3" : "size-2")} />
          <span className={cn("rounded-full bg-mac-zoom", chrome === "full" ? "size-3" : "size-2")} />
        </span>
        {chrome === "full" && (
          <span
            className={cn(
              "mx-auto flex h-6 min-w-0 max-w-[60%] items-center gap-1.5 rounded-md px-3 text-[11px] font-medium",
              dark ? "bg-white/[0.08] text-white/70" : "bg-white text-ink-500 ring-1 ring-ink-950/[0.06]",
            )}
          >
            <Lock className="size-3 shrink-0" aria-hidden />
            <span className="truncate">
              {app.name} · {screen.title}
            </span>
          </span>
        )}
        {chrome === "full" && <span aria-hidden className="w-[3.25rem]" />}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {crop ? (
          <Image
            src={screen.image}
            alt={screen.alt}
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            className="absolute max-w-none"
            style={{
              width: `${(100 / crop.w) * 100}%`,
              height: "auto",
              left: `${(-crop.x / crop.w) * 100}%`,
              top: `${(-crop.y / crop.w) * 100}%`,
            }}
          />
        ) : (
          <Image
            src={screen.image}
            alt={screen.alt}
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            className="size-full object-cover object-top"
          />
        )}
        {children}
      </div>
    </figure>
  );
}

/** A phone around a phone-width screenshot. */
export function Phone({ screen, className, sizes = "300px" }: { screen: Screen; className?: string; sizes?: string }) {
  return (
    <figure className={cn("relative mx-auto w-full max-w-[17rem] rounded-[2.6rem] bg-ink-950 p-2.5 shadow-frame ring-1 ring-white/10", className)}>
      <span aria-hidden className="absolute top-4 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink-950" />
      <div className="relative aspect-[390/844] overflow-hidden rounded-[2.1rem] bg-white">
        <Image src={screen.image} alt={screen.alt} sizes={sizes} placeholder="blur" className="size-full object-cover object-top" />
      </div>
    </figure>
  );
}

/** A laptop around a screenshot, for hero compositions. */
export function MacBook({
  screen,
  className,
  priority,
  sizes = "(min-width: 1280px) 1000px, 100vw",
  children,
}: {
  screen: Screen;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative mx-auto w-[88%] rounded-t-[1.4rem] bg-ink-950 p-[1.6%] pb-[2.2%] shadow-frame ring-1 ring-white/10">
        <span aria-hidden className="absolute top-[0.55%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/15" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-white">
          <Image
            src={screen.image}
            alt={screen.alt}
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            className="size-full object-cover object-top"
          />
          {children}
        </div>
      </div>
      <div aria-hidden className="relative h-3 rounded-b-[1.25rem] bg-gradient-to-b from-cream-200 to-cream-300 shadow-float sm:h-4">
        <span className="absolute top-0 left-1/2 h-1.5 w-[14%] -translate-x-1/2 rounded-b-lg bg-cream-300/90 sm:h-2" />
      </div>
    </figure>
  );
}
