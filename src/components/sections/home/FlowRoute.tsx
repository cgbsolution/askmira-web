"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  SpotChart,
  SpotChecklist,
  SpotPerson,
  SpotRecruit,
  SpotTrend,
  type SpotIcon,
} from "@/components/illustrations/spots";
import { Emph, HandNote, Squiggle, WaveEdge } from "@/components/motion/Doodles";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * One won order, followed along a wavy line to the people it hires. A dot
 * travels the line and each stop lights up as it passes. The copy follows the
 * journey on /connected-platform (lib/content/ecosystem.ts).
 */

type Stop = {
  app: string;
  title: string;
  body: string;
  icon: SpotIcon;
  /** Point on the 1000 × 220 drawing. */
  x: number;
  y: number;
  ring: string;
  glow: string;
};

const STOPS: Stop[] = [
  {
    app: "Saleinx",
    title: "Order booked",
    body: "A won order is approved by the manager and opens its positions.",
    icon: SpotTrend,
    x: 100,
    y: 150,
    ring: "border-marigold-300",
    glow: "bg-marigold-300",
  },
  {
    app: "AskMira HRMS",
    title: "Hire approved",
    body: "Budget, workforce plan and the requisition are approved in order.",
    icon: SpotChecklist,
    x: 300,
    y: 70,
    ring: "border-marigold-500",
    glow: "bg-marigold-500",
  },
  {
    app: "AnytimeHire",
    title: "Recruited",
    body: "The job opens, candidates are matched, and the hire returns as a joiner.",
    icon: SpotRecruit,
    x: 500,
    y: 150,
    ring: "border-blush-300",
    glow: "bg-blush-300",
  },
  {
    app: "Onboarding",
    title: "Day one ready",
    body: "Tasks route to HR, IT and the manager. Assets are allocated.",
    icon: SpotPerson,
    x: 700,
    y: 70,
    ring: "border-brand-300",
    glow: "bg-brand-300",
  },
  {
    app: "Management",
    title: "You see it all",
    body: "Purchasing, expenses and the P&L are reported back in one place.",
    icon: SpotChart,
    x: 900,
    y: 150,
    ring: "border-brand-500",
    glow: "bg-brand-500",
  },
];

const ROUTE = "M100 150C170 150 230 70 300 70S430 150 500 150S630 70 700 70S830 150 900 150";
const DURATION = 6500;
const HOLD = 2200;

function useRoute() {
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const map = mapRef.current;
    const path = pathRef.current;
    const prog = progRef.current;
    const dot = dotRef.current;
    if (!map || !path || !prog || !dot) return;

    const length = path.getTotalLength();
    prog.style.strokeDasharray = `${length}`;
    const stops = Array.from(map.querySelectorAll<HTMLElement>("[data-stop]"));
    const cards = Array.from(map.closest("section")?.querySelectorAll<HTMLElement>("[data-stop-card]") ?? []);

    const set = (t: number) => {
      const p = path.getPointAtLength(t * length);
      dot.setAttribute("cx", `${p.x}`);
      dot.setAttribute("cy", `${p.y}`);
      prog.style.strokeDashoffset = `${length * (1 - t)}`;
      STOPS.forEach((s, i) => {
        const lit = p.x >= s.x - 3;
        stops[i]?.toggleAttribute("data-lit", lit);
        cards[i]?.toggleAttribute("data-lit", lit);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }

    set(0);
    let raf = 0;
    let start: number | null = null;
    const frame = (ts: number) => {
      if (start === null) start = ts;
      set(Math.min(((ts - start) % (DURATION + HOLD)) / DURATION, 1));
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start = null;
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(map);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return { mapRef, pathRef, progRef, dotRef };
}

export function FlowRoute() {
  const { mapRef, pathRef, progRef, dotRef } = useRoute();

  return (
    <section aria-labelledby="flow-heading" className="relative isolate overflow-hidden bg-ink-950 text-white">
      <WaveEdge className="text-white" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(50%_60%_at_15%_100%,rgb(235_6_29/0.35),transparent_70%),radial-gradient(45%_55%_at_85%_100%,rgb(248_160_26/0.3),transparent_70%)]"
      />
      <div className="section-y container-site">
        <Reveal className="flex flex-col items-start gap-4">
          <HandNote tone="dark">one order, every app</HandNote>
          <h2 id="flow-heading" className="max-w-3xl font-display text-display-2 font-semibold">
            From a won order{" "}
            <Emph tone="dark" underline={false}>
              to <Squiggle>day one.</Squiggle>
            </Emph>
          </h2>
          <p className="max-w-2xl text-lead text-white/70">
            Follow one order from the sales CRM to a new joiner&apos;s first morning — each step done in the app that
            owns it, all on the same employee record.
          </p>
        </Reveal>

        {/* The drawing: desktop and tablet only. */}
        <div ref={mapRef} className="relative mt-14 hidden aspect-[1000/220] md:block">
          <svg aria-hidden viewBox="0 0 1000 220" className="absolute inset-0 size-full overflow-visible">
            <path
              ref={pathRef}
              d={ROUTE}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-white/10"
            />
            <path
              d={ROUTE}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="2 14"
              strokeLinecap="round"
              className="text-white/30"
            />
            <path
              ref={progRef}
              d={ROUTE}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-marigold-400"
            />
            <circle ref={dotRef} cx="100" cy="150" r="11" className="fill-cream-50 stroke-brand-800" strokeWidth="5" />
          </svg>
          {STOPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                data-stop=""
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x / 10}%`, top: `${s.y / 2.2}%` }}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 rounded-full opacity-0 group-data-[lit]:animate-ping-soft",
                    s.glow,
                  )}
                />
                <span
                  className={cn(
                    "relative grid size-[4.5rem] scale-90 place-items-center rounded-full border-[5px] bg-cream-50 p-3 opacity-40 grayscale transition-[transform,opacity,filter] duration-500 group-data-[lit]:scale-100 group-data-[lit]:opacity-100 group-data-[lit]:grayscale-0 lg:size-20",
                    s.ring,
                  )}
                >
                  <Icon className="size-full" />
                </span>
              </div>
            );
          })}
        </div>

        <ol className="relative mt-12 grid gap-8 md:mt-6 md:grid-cols-5 md:gap-3">
          {/* The phone version of the line: a dashed rail behind the icons. */}
          <span
            aria-hidden
            className="absolute top-8 bottom-8 left-8 w-0.5 border-l-2 border-dashed border-white/25 md:hidden"
          />
          {STOPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                data-stop-card=""
                className="relative grid grid-cols-[4rem_minmax(0,1fr)] items-start gap-4 transition-opacity duration-500 md:block md:px-2 md:text-center md:opacity-50 md:data-[lit]:opacity-100"
              >
                <span
                  className={cn(
                    "relative grid size-16 place-items-center rounded-full border-4 bg-cream-50 p-2.5 md:hidden",
                    s.ring,
                  )}
                >
                  <Icon className="size-full" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-marigold-300 uppercase">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.app}
                  </p>
                  <h3 className="mt-1 font-display text-[1.375rem] leading-tight font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex md:justify-center">
          <Button asChild size="lg" variant="inverse">
            <Link href="/connected-platform">
              Follow the whole journey <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
