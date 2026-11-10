"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import {
  SpotLaptop,
  SpotMira,
  SpotReceipt,
  SpotRecruit,
  SpotRupee,
  SpotTeam,
  SpotTrend,
  type SpotIcon,
} from "@/components/illustrations/spots";
import { cn } from "@/lib/utils";

/*
 * Ask Miraa on a turning sunburst: a question, Miraa "typing", then the answer
 * with the apps it drew on. It moves through a few example questions on its
 * own; picking a chip shows that one. The examples are things Miraa does today
 * (policy answers with the source, expense data, order win → hiring requests,
 * joiners and their IT tickets); the numbers are sample data.
 */

type Example = { chip: string; q: string; a: string; used: string[] };

const EXAMPLES: Example[] = [
  {
    chip: "My leave",
    q: "How many casual leaves do I have left this year?",
    a: "You have 4 casual leaves left. Unused casual leave lapses on 31 December — that's in your Leave policy, section 3.2.",
    used: ["Leave", "Leave policy §3.2"],
  },
  {
    chip: "Travel spend",
    q: "What did we spend on travel last month, and which claims are still waiting?",
    a: "Here's travel by team as a chart, and the 7 claims still waiting on a manager, oldest first.",
    used: ["Expense Genie", "Chart"],
  },
  {
    chip: "An order won",
    q: "We won the plant order. Which roles do we need to hire?",
    a: "The order needs 3 people: two field engineers and a site lead. I've drafted the hiring requests — approve them and AnytimeHire opens the jobs.",
    used: ["Saleinx", "Hiring requests", "AnytimeHire"],
  },
  {
    chip: "Monday joiners",
    q: "Who joins on Monday, and are their laptops ready?",
    a: "Two people join on Monday. One laptop is ready; the other request is still open in CGB Helpdesk. Shall I add a note to the ticket?",
    used: ["Onboarding", "CGB Helpdesk"],
  },
];

type Sticker = { label: string; icon: SpotIcon; fill: string; tilt: string; pos: string };

const STICKERS: Sticker[] = [
  { label: "People", icon: SpotTeam, fill: "bg-marigold-400 [--spot-tile:var(--color-marigold-400)]", tilt: "8deg", pos: "left-[-2%] top-[3%]" },
  { label: "Sales", icon: SpotTrend, fill: "bg-success-50 [--spot-tile:var(--color-success-50)]", tilt: "-10deg", pos: "right-[0%] top-[0%]" },
  { label: "Expenses", icon: SpotReceipt, fill: "bg-blush-200 [--spot-tile:var(--color-blush-200)]", tilt: "7deg", pos: "right-[-3%] top-[44%] hidden sm:grid" },
  { label: "Payroll", icon: SpotRupee, fill: "bg-info-50 [--spot-tile:var(--color-info-50)]", tilt: "-6deg", pos: "left-[-4%] top-[36%] hidden sm:grid" },
  { label: "Hiring", icon: SpotRecruit, fill: "bg-marigold-200 [--spot-tile:var(--color-marigold-200)]", tilt: "9deg", pos: "right-[8%] bottom-[-1%]" },
  { label: "IT", icon: SpotLaptop, fill: "bg-white [--spot-tile:#fff]", tilt: "-8deg", pos: "left-[20%] bottom-[-3%] hidden sm:grid" },
];

/** Alternating maroon wedges, a ring of dots and a marigold centre, like a rangoli wheel. */
function Wheel() {
  const n = 28;
  const R = 292;
  const wedges = Array.from({ length: n }, (_, i) => {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 1) / n) * Math.PI * 2;
    const d = `M0 0L${(R * Math.cos(a0)).toFixed(1)} ${(R * Math.sin(a0)).toFixed(1)}A${R} ${R} 0 0 1 ${(R * Math.cos(a1)).toFixed(1)} ${(R * Math.sin(a1)).toFixed(1)}Z`;
    return <path key={i} d={d} className={i % 2 ? "fill-brand-700" : "fill-brand-800"} />;
  });
  const dots = Array.from({ length: 14 }, (_, i) => (i / 14) * Math.PI * 2);
  return (
    <svg viewBox="-300 -300 600 600" className="size-full">
      {wedges}
      <circle r={R} fill="none" strokeWidth="6" className="stroke-ink-950" />
      {dots.map((a) => (
        <circle
          key={a}
          cx={(250 * Math.cos(a)).toFixed(1)}
          cy={(250 * Math.sin(a)).toFixed(1)}
          r="9"
          strokeWidth="3"
          className="fill-cream-25 stroke-ink-950"
        />
      ))}
      <circle r="185" strokeWidth="5" className="fill-marigold-400 stroke-ink-950" />
      <circle r="160" fill="none" strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" className="stroke-ink-950/60" />
      <circle r="120" className="fill-cream-50" />
    </svg>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 py-1.5" aria-label="Miraa is typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="animate-typing size-2 rounded-full bg-marigold-400" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

export function MiraWheel({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [picked, setPicked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();

  // Miraa "types" for a moment before each answer.
  useEffect(() => {
    if (!inView && !picked) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), reduce ? 0 : 1100);
    return () => clearTimeout(t);
  }, [idx, inView, picked, reduce]);

  // On its own it moves to the next question; once someone picks one, it stays.
  useEffect(() => {
    if (!inView || picked || reduce) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % EXAMPLES.length), 7500);
    return () => clearTimeout(t);
  }, [idx, inView, picked, reduce]);

  const ex = EXAMPLES[idx]!;

  return (
    <div ref={ref} className={cn("relative mx-auto w-full max-w-[36rem]", className)}>
      <div className="relative flex min-h-[34rem] flex-col justify-center py-10 sm:min-h-[38rem]">
        <div
          aria-hidden
          className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[128%] max-w-[46rem] -translate-x-1/2 -translate-y-1/2"
        >
          <Wheel />
        </div>

        {STICKERS.map((s, i) => {
          const Icon = s.icon;
          return (
            <span
              key={s.label}
              aria-hidden
              className={cn(
                "animate-bob absolute z-20 grid size-[4.25rem] place-items-center content-center gap-0.5 rounded-full border-[3px] border-ink-950 text-ink-950 shadow-[3px_4px_0_var(--color-ink-950)] sm:size-20",
                s.fill,
                s.pos,
              )}
              style={{ "--bob-r": s.tilt, animationDelay: `${-i * 0.9}s` } as React.CSSProperties}
            >
              <Icon className="size-7 sm:size-9" />
              <span className="text-[0.55rem] leading-none font-extrabold tracking-wider uppercase sm:text-[0.62rem]">{s.label}</span>
            </span>
          );
        })}

        <div className="relative z-10 grid gap-5 px-3 sm:px-10" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.div
              key={`q-${idx}`}
              initial={{ opacity: 0, y: 12, rotate: 1.6 }}
              animate={{ opacity: 1, y: 0, rotate: 1.6 }}
              exit={{ opacity: 0, y: -8, rotate: 1.6 }}
              transition={{ duration: 0.35 }}
              className="max-w-[88%] justify-self-end rounded-[1.75rem] rounded-br-md border-[3px] border-ink-950 bg-cream-25 px-5 py-3.5 text-ink-950 shadow-[5px_6px_0_var(--color-ink-950)]"
            >
              <small className="block text-[0.68rem] font-extrabold tracking-[0.14em] text-ink-500 uppercase">You</small>
              <p className="mt-1 text-[0.95rem] leading-snug font-semibold sm:text-lg">{ex.q}</p>
            </m.div>
          </AnimatePresence>

          <div
            className="min-h-[9.5rem] max-w-[92%] -rotate-[1.4deg] justify-self-start rounded-[1.75rem] rounded-bl-md border-[3px] border-ink-950 bg-ink-950 px-5 py-3.5 text-cream-50 shadow-[5px_6px_0_var(--color-marigold-400)]"
          >
            <small className="flex items-center gap-1.5 text-[0.68rem] font-extrabold tracking-[0.14em] text-marigold-300 uppercase">
              <span className="grid size-5 place-items-center rounded-md bg-cream-25 p-0.5 [--spot-tile:var(--color-cream-25)]">
                <SpotMira className="size-full" />
              </span>
              Miraa
            </small>
            <AnimatePresence mode="wait" initial={false}>
              {typing ? (
                <m.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-1">
                  <TypingDots />
                </m.div>
              ) : (
                <m.div key={`a-${idx}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <p className="mt-1 text-[0.9rem] leading-relaxed sm:text-[0.95rem]">{ex.a}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ex.used.map((u, i) => (
                      <m.span
                        key={u}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.15 + i * 0.08 }}
                        className="rounded-full bg-marigold-400 px-2.5 py-1 text-xs font-bold text-ink-950"
                      >
                        {u}
                      </m.span>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-2 px-6" role="group" aria-label="Example questions">
          {EXAMPLES.map((e, i) => (
            <button
              key={e.chip}
              type="button"
              aria-pressed={i === idx}
              onClick={() => {
                setPicked(true);
                setIdx(i);
              }}
              className={cn(
                "rounded-full border-[3px] border-ink-950 px-4 py-1.5 text-[0.82rem] font-semibold transition-[transform,background-color] outline-none hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-marigold-300 motion-reduce:hover:translate-y-0",
                i === idx ? "bg-ink-950 text-marigold-300" : "bg-cream-25 text-ink-950",
              )}
            >
              {e.chip}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-ink-500">Example questions; the answers use sample data.</p>
    </div>
  );
}
