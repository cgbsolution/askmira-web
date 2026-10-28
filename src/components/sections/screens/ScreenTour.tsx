"use client";

import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { AppWindow } from "@/components/product/AppWindow";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APPS, appStatus, tour, type Hotspot, type Screen } from "@/lib/content/screens";
import { cn } from "@/lib/utils";

import { ConnectionBadge } from "../ecosystem/ConnectionBadge";

/**
 * Real screens from every app, one window at a time. Pick an app, pick a
 * screen, and hover or tap the numbered dots to see what each part does.
 */
export function ScreenTour({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Tabs defaultValue={tour[0]!.app} className={cn("gap-8", className)}>
      <TabsList
        aria-label="Apps"
        className="mask-fade-x -mx-4 flex h-auto w-[calc(100%+2rem)] justify-start gap-2 overflow-x-auto bg-transparent p-1 px-4 [scrollbar-width:none] sm:mx-0 sm:w-full sm:flex-wrap sm:justify-center sm:px-1 lg:[mask-image:none]"
      >
        {tour.map((t) => (
          <TabsTrigger
            key={t.app}
            value={t.app}
            className={cn(
              "h-auto min-w-max flex-none flex-col items-start gap-0 rounded-2xl px-4 py-2.5 text-left",
              dark
                ? "bg-white/[0.06] text-white/80 hover:bg-white/10 hover:text-white data-[state=active]:bg-white data-[state=active]:text-ink-950"
                : "bg-white text-ink-700 ring-1 ring-cream-200 hover:text-ink-950 hover:ring-cream-300 data-[state=active]:bg-brand-800 data-[state=active]:text-white data-[state=active]:ring-brand-800",
            )}
          >
            <span className="text-[0.9375rem] font-semibold">{APPS[t.app].name}</span>
            <span className="text-xs font-medium opacity-70">
              {APPS[t.app].role}
              {appStatus(t.app) === "planned" ? " · planned" : ""}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tour.map((t) => (
        <TabsContent key={t.app} value={t.app} className="duration-500 data-[state=active]:animate-in data-[state=active]:fade-in-0">
          <AppStage app={t.app} lead={t.lead} screens={t.screens} dark={dark} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function AppStage({
  app,
  lead,
  screens,
  dark,
}: {
  app: Screen["app"];
  lead: string;
  screens: Screen[];
  dark: boolean;
}) {
  const [index, setIndex] = React.useState(0);
  const [active, setActive] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const screen = screens[index]!;
  const status = appStatus(app);
  const go = (i: number) => {
    setIndex((i + screens.length) % screens.length);
    setActive(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8">
      <div className="relative min-w-0">
        <AppWindow key={screen.id} screen={screen} className="animate-in duration-500 fade-in-0" sizes="(min-width: 1280px) 900px, 100vw">
          {screen.hotspots?.map((h, i) => (
            <HotspotPin key={h.title} hotspot={h} n={i + 1} active={active === i} onActive={(on) => setActive(on ? i : null)} />
          ))}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-ink-950 focus-visible:ring-[3px] focus-visible:ring-marigold-400 focus-visible:outline-none"
          >
            <Maximize2 className="size-3.5" aria-hidden />
            View full size
          </button>
        </AppWindow>
      </div>

      <div className={cn("flex flex-col gap-5", dark ? "text-white" : "text-ink-900")}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-display-4 font-semibold">{APPS[app].name}</h3>
            {app !== "hrms" && <ConnectionBadge status={status} size="sm" tone={dark ? "dark" : "light"} />}
          </div>
          <p className={cn("mt-2 text-[0.9375rem]", dark ? "text-white/70" : "text-ink-600")}>{lead}</p>
        </div>

        {screens.length > 1 && (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" aria-label={`${APPS[app].name} screens`}>
            {screens.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => go(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl p-1.5 pr-3 text-left text-sm font-semibold transition outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60",
                    dark
                      ? "text-white/75 hover:bg-white/[0.06] aria-pressed:bg-white/10 aria-pressed:text-white"
                      : "text-ink-700 hover:bg-white aria-pressed:bg-white aria-pressed:text-ink-950 aria-pressed:shadow-card",
                  )}
                >
                  <span className="relative aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-md ring-1 ring-ink-950/10">
                    <Image src={s.image} alt="" sizes="64px" className="size-full object-cover object-top" />
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        )}

        {screen.hotspots && screen.hotspots.length > 0 && (
          <ol className="grid gap-1.5" aria-label="What this screen shows">
            {screen.hotspots.map((h, i) => (
              <li key={h.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                  className={cn(
                    "flex w-full gap-3 rounded-xl p-2.5 text-left transition outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60",
                    active === i && (dark ? "bg-white/10" : "bg-marigold-50"),
                  )}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-marigold-400 text-xs font-bold text-ink-950">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{h.title}</span>
                    <span className={cn("mt-0.5 block text-[0.8125rem]", dark ? "text-white/65" : "text-ink-500")}>{h.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}

        <p className={cn("mt-auto text-xs", dark ? "text-white/50" : "text-ink-400")}>
          {app === "procureflow" || app === "saleinx"
            ? "The app's own sign-in page. We'll add screens of the app itself once its connection to AskMira is built."
            : "Real screen from a demo workspace. Names and figures are sample data."}
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(96vw,90rem)] max-w-none gap-3 border-0 bg-ink-950 p-3 text-white sm:max-w-none sm:p-4">
          <DialogTitle className="pr-10 text-base text-white">
            {APPS[app].name} · {screen.title}
          </DialogTitle>
          <DialogDescription className="sr-only">{screen.alt}</DialogDescription>
          <div className="relative grid place-items-center overflow-hidden rounded-lg">
            <Image
              key={screen.id}
              src={screen.image}
              alt={screen.alt}
              sizes="96vw"
              placeholder="blur"
              className="mx-auto h-auto max-h-[calc(100dvh-8rem)] w-auto max-w-full object-contain"
            />
          </div>
          {screens.length > 1 && (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/20 focus-visible:ring-[3px] focus-visible:ring-marigold-400 focus-visible:outline-none"
              >
                <ChevronLeft className="size-4" aria-hidden /> {screens[(index - 1 + screens.length) % screens.length]!.title}
              </button>
              <span className="text-xs text-white/60">
                {index + 1} of {screens.length}
              </span>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/20 focus-visible:ring-[3px] focus-visible:ring-marigold-400 focus-visible:outline-none"
              >
                {screens[(index + 1) % screens.length]!.title} <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HotspotPin({
  hotspot,
  n,
  active,
  onActive,
}: {
  hotspot: Hotspot;
  n: number;
  active: boolean;
  onActive: (on: boolean) => void;
}) {
  const below = hotspot.y < 35;
  const alignRight = hotspot.x > 70;
  const alignLeft = hotspot.x < 30;
  return (
    <div className="absolute z-10" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>
      <button
        type="button"
        aria-label={`${n}. ${hotspot.title}`}
        aria-expanded={active}
        onMouseEnter={() => onActive(true)}
        onMouseLeave={() => onActive(false)}
        onFocus={() => onActive(true)}
        onBlur={() => onActive(false)}
        onClick={() => onActive(!active)}
        className="relative -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-marigold-400/60" />
        <span
          className={cn(
            "relative grid size-6 place-items-center rounded-full bg-marigold-400 text-xs font-bold text-ink-950 shadow-float ring-2 ring-white transition sm:size-7",
            active && "scale-110 bg-white",
          )}
        >
          {n}
        </span>
      </button>
      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute hidden w-60 rounded-xl bg-ink-950/95 p-3 text-left text-white shadow-frame transition duration-200 md:block",
          below ? "top-5" : "bottom-5",
          alignRight ? "right-0" : alignLeft ? "left-0" : "left-1/2 -translate-x-1/2",
          active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        <p className="text-sm font-semibold">{hotspot.title}</p>
        <p className="mt-1 text-xs text-white/70">{hotspot.body}</p>
      </div>
    </div>
  );
}
