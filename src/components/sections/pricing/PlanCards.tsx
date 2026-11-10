import { ArrowRight, Check, Star, UsersRound } from "lucide-react";
import Link from "next/link";

import {
  SpotAuditLog,
  SpotBook,
  SpotConnected,
  SpotIdCard,
  SpotPayslip,
  SpotReceipt,
  SpotShield,
  SpotTeam,
  SpotTile,
  type SpotIcon,
  type SpotTone,
} from "@/components/illustrations/spots";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAmount, formatRupees, PLAN_FACTS, PLANS, type Plan, type PlanId } from "@/lib/content/pricing";
import { cn } from "@/lib/utils";

import { Eyebrow, EyebrowSpot } from "../primitives";

const PLAN_ICON: Record<PlanId, { icon: SpotIcon; tone: SpotTone }> = {
  free: { icon: SpotIdCard, tone: "marigold" },
  core: { icon: SpotPayslip, tone: "blush" },
  premium: { icon: SpotReceipt, tone: "white" },
  ultimate: { icon: SpotConnected, tone: "cream" },
};

const FACT_ICONS: SpotIcon[] = [SpotBook, SpotTeam, SpotShield, SpotAuditLog];

/**
 * The opening of /pricing: a deep-red band with the headline, and the four
 * plan cards rising out of it onto the cream page.
 */
export function PricingHero() {
  return (
    <>
      <section className="bg-deep relative isolate overflow-hidden text-white" aria-labelledby="pricing-title">
        <div aria-hidden className="bg-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] opacity-80" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
        />
        <div className="container-site pt-32 pb-60 text-center sm:pt-36 sm:pb-64 lg:pt-44">
          <Reveal y={12}>
            <Eyebrow tone="dark" icon={<EyebrowSpot icon={SpotReceipt} />}>
              Pricing
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="pricing-title" className="mx-auto mt-6 max-w-4xl font-display text-display-1 font-semibold">
              Simple plans that grow <span className="text-marigold-300">with your team</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-white/75">
              Start free with up to 20 employees. When you need attendance, payroll and more, pick a plan for up to 50
              employees and add each extra person at a small monthly rate.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
              {["Free forever for 20 employees", "Billed quarterly", "Move up a plan any time"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-marigold-400 text-ink-950">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="plans" aria-label="Plans" className="relative z-10 -mt-48 scroll-mt-24 pb-6 sm:-mt-52">
        <div className="container-site">
          <Stagger className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {PLANS.map((plan) => (
              <StaggerItem key={plan.id} className="h-full">
                <PlanCard plan={plan} />
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-8 text-center text-sm text-ink-500">
            Prices are in Indian rupees and exclude GST. Paid plans are billed quarterly.
          </p>

          <Reveal className="mt-10">
            <ul className="grid overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-card sm:grid-cols-2 lg:grid-cols-4">
              {PLAN_FACTS.map((f, i) => (
                <li
                  key={f.title}
                  className={cn(
                    "flex items-start gap-4 p-6",
                    i > 0 && "border-t border-cream-200 sm:border-t-0",
                    i % 2 === 1 && "sm:border-l",
                    i >= 2 && "sm:border-t lg:border-t-0",
                    i === 2 && "lg:border-l",
                  )}
                >
                  <SpotTile icon={FACT_ICONS[i] ?? SpotShield} size="md" tone={i % 2 ? "marigold" : "blush"} />
                  <div>
                    <p className="font-semibold text-ink-950">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const dark = !!plan.featured;
  const { icon, tone } = PLAN_ICON[plan.id];
  const headingId = `plan-${plan.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7",
        dark
          ? "bg-ink-950 text-white shadow-frame ring-2 ring-marigold-400 xl:-mt-4 xl:h-[calc(100%+2rem)]"
          : "border border-cream-200 bg-white shadow-float",
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(90%_100%_at_50%_0%,rgb(235_6_29/0.45),transparent_70%)]"
        />
      )}
      {!dark && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 h-1.5",
            plan.id === "free" ? "bg-marigold-400" : plan.id === "core" ? "bg-brand-500" : "bg-brand-800",
          )}
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <SpotTile icon={icon} size="md" tone={tone} />
        {plan.badge &&
          (dark ? (
            <Badge size="lg" className="bg-marigold-400 font-bold tracking-wider text-ink-950 uppercase">
              <Star className="fill-current" aria-hidden />
              {plan.badge}
            </Badge>
          ) : (
            <Badge size="lg" variant="success" className="font-bold tracking-wider uppercase">
              {plan.badge}
            </Badge>
          ))}
      </div>

      <p
        className={cn(
          "relative mt-6 text-xs font-bold tracking-[0.16em] uppercase",
          dark ? "text-marigold-300" : "text-brand-800",
        )}
      >
        {plan.segment}
      </p>
      <h3 id={headingId} className="relative mt-1.5 font-display text-[2rem] leading-tight font-semibold">
        {plan.name}
      </h3>
      <p
        className={cn(
          "relative mt-3 text-[0.9375rem] leading-relaxed sm:min-h-[4.5rem]",
          dark ? "text-white/70" : "text-ink-600",
        )}
      >
        {plan.tagline}
      </p>

      <p className="relative mt-6 flex items-start gap-1">
        <span className={cn("mt-1.5 font-display text-2xl font-semibold", dark ? "text-marigold-300" : "text-ink-700")}>
          ₹
        </span>
        <span className="font-display text-[3.25rem] leading-none font-semibold tracking-tight">
          {formatAmount(plan.price)}
        </span>
        <span className={cn("mt-auto mb-1 ml-1 text-[0.9375rem]", dark ? "text-white/60" : "text-ink-500")}>
          {plan.period}
        </span>
      </p>

      <div
        className={cn(
          "relative mt-6 rounded-2xl border p-4 sm:min-h-[7.25rem]",
          dark ? "border-white/10 bg-white/5" : "border-cream-200 bg-cream-50",
        )}
      >
        <p className="flex items-center gap-2 font-semibold">
          <UsersRound className={cn("size-4", dark ? "text-marigold-300" : "text-brand-800")} aria-hidden />
          Up to {plan.includedEmployees} employees
        </p>
        {plan.perAdditional !== null ? (
          <p className={cn("mt-2 text-sm leading-snug", dark ? "text-white/70" : "text-ink-600")}>
            <span className={cn("font-semibold", dark ? "text-white" : "text-ink-900")}>
              + {formatRupees(plan.perAdditional)}
            </span>{" "}
            /month per additional employee
            <span className={cn("mt-1 block text-xs", dark ? "text-white/50" : "text-ink-500")}>{plan.note}</span>
          </p>
        ) : (
          <p className={cn("mt-2 text-sm leading-snug", dark ? "text-white/70" : "text-ink-600")}>
            Free forever
            <span className="mt-1 block text-xs text-ink-500">{plan.note}</span>
          </p>
        )}
      </div>

      <Button
        asChild
        size="lg"
        variant={plan.id === "free" ? "marigold" : dark ? "marigold" : "deep"}
        className="relative mt-6 w-full"
      >
        <Link href="#demo" aria-label={`${plan.cta} — ${plan.name} plan`}>
          {plan.cta} <ArrowRight />
        </Link>
      </Button>

      <div className={cn("relative mt-7 border-t pt-6", dark ? "border-white/10" : "border-cream-200")}>
        <p className={cn("text-xs font-bold tracking-[0.14em] uppercase", dark ? "text-white" : "text-ink-900")}>
          {plan.inherits ? (
            <>
              Everything in <span className={dark ? "text-marigold-300" : "text-brand-800"}>{plan.inherits}</span>, plus
            </>
          ) : (
            "What's included"
          )}
        </p>
        <ul className="mt-4 grid gap-3">
          {plan.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                  dark ? "bg-marigold-400 text-ink-950" : "bg-brand-800 text-white",
                )}
              >
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
              <span className={cn("text-[0.9375rem] leading-relaxed", dark ? "text-white/85" : "text-ink-700")}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
