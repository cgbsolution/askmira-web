import { Check, Minus } from "lucide-react";
import Link from "next/link";

import {
  SpotCalendarClock,
  SpotChart,
  SpotHeart,
  SpotIdCard,
  SpotOrg,
  SpotPayslip,
  SpotPhone,
  SpotReceipt,
  SpotRecruit,
  SpotShield,
  SpotTile,
  type SpotIcon,
} from "@/components/illustrations/spots";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { COMPARISON, formatRupees, includedIn, PLANS } from "@/lib/content/pricing";
import { cn } from "@/lib/utils";

/** One spot per comparison group. */
const GROUP_ICONS: Record<string, SpotIcon> = {
  "Employee data": SpotIdCard,
  "Onboarding and core HR": SpotOrg,
  "Attendance and leave": SpotCalendarClock,
  Payroll: SpotPayslip,
  "Self-service and support": SpotPhone,
  "Companies and projects": SpotChart,
  "Travel and expense": SpotReceipt,
  "Performance and culture": SpotHeart,
  "Hiring and AI": SpotRecruit,
  "Security, in every plan": SpotShield,
};

/**
 * Every feature against every plan. On a desktop the plan header stays
 * pinned under the site header while the rows scroll; on a phone the feature
 * column stays put while the plan columns swipe sideways.
 */
export function PlanComparison() {
  return (
    <>
      <p className="mb-3 text-center text-sm text-ink-500 sm:hidden">Swipe the table sideways to see every plan.</p>
      <div className="overflow-clip rounded-[1.75rem] border border-cream-200 bg-white shadow-card">
        <Table
          containerClassName="lg:overflow-x-visible"
          className="min-w-[34rem] table-fixed border-separate border-spacing-0 sm:min-w-[44rem]"
        >
          <colgroup>
            <col className="w-[10.5rem] sm:w-[34%]" />
            {PLANS.map((p) => (
              <col key={p.id} />
            ))}
          </colgroup>
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="hover:bg-transparent">
              <TableHead className="sticky left-0 z-30 h-auto border-b border-cream-200 bg-white px-4 py-5 align-bottom tracking-normal normal-case sm:px-6 lg:top-[5.25rem]">
                <span className="hidden font-display text-xl font-semibold text-ink-950 sm:block">Compare plans</span>
                <span className="sr-only sm:hidden">Feature</span>
              </TableHead>
              {PLANS.map((p) => (
                <TableHead
                  key={p.id}
                  scope="col"
                  className={cn(
                    "z-20 h-auto border-b px-2 py-5 text-center align-bottom tracking-normal whitespace-normal normal-case sm:px-3 lg:sticky lg:top-[5.25rem]",
                    p.featured ? "border-ink-950 bg-ink-950 text-white" : "border-cream-200 bg-white",
                  )}
                >
                  {p.featured && (
                    <span className="mb-2 inline-block rounded-full bg-marigold-400 px-2 py-0.5 text-[0.625rem] font-bold tracking-wider text-ink-950 uppercase">
                      Popular
                    </span>
                  )}
                  <span className={cn("block font-display text-lg font-semibold", !p.featured && "text-ink-950")}>
                    {p.name}
                  </span>
                  <span
                    className={cn("mt-0.5 block text-sm font-medium", p.featured ? "text-white/70" : "text-ink-500")}
                  >
                    {formatRupees(p.price)}
                    <span className="text-xs">{p.period}</span>
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant={p.featured ? "marigold" : "outline"}
                    className="mt-3 hidden w-full max-w-[9rem] lg:inline-flex"
                  >
                    <Link href="#demo" aria-label={`${p.cta} — ${p.name} plan`}>
                      {p.id === "free" ? "Get started" : "Free trial"}
                    </Link>
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {COMPARISON.map((group) => {
            const Icon = GROUP_ICONS[group.title] ?? SpotShield;
            return (
              <TableBody key={group.title} className="[&_tr:last-child]:border-0">
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={PLANS.length + 1} className="border-b border-cream-200 bg-cream-50 px-0 py-0">
                    <span className="sticky left-0 inline-flex items-center gap-3 px-4 py-3 sm:px-6">
                      <SpotTile icon={Icon} size="xs" tone="white" className="border border-cream-200" />
                      <span className="text-sm font-bold tracking-[0.08em] text-brand-800 uppercase">{group.title}</span>
                    </span>
                  </TableCell>
                </TableRow>
                {group.rows.map((row) => (
                  <TableRow key={row.feature} className="group hover:bg-transparent">
                    <TableCell className="sticky left-0 z-10 border-b border-cream-100 bg-white px-4 py-3.5 text-sm whitespace-normal text-ink-800 group-hover:bg-cream-25 sm:px-6 sm:text-[0.9375rem]">
                      {row.feature}
                    </TableCell>
                    {PLANS.map((p) => {
                      const yes = includedIn(row, p.id);
                      return (
                        <TableCell
                          key={p.id}
                          className={cn(
                            "border-b py-3.5 text-center",
                            p.featured
                              ? "border-marigold-100 bg-marigold-50/70 group-hover:bg-marigold-50"
                              : "border-cream-100 group-hover:bg-cream-25",
                          )}
                        >
                          {yes ? (
                            <span
                              className={cn(
                                "mx-auto grid size-6 place-items-center rounded-full",
                                p.featured ? "bg-ink-950 text-marigold-300" : "bg-brand-800 text-white",
                              )}
                            >
                              <Check className="size-3.5" strokeWidth={3} aria-hidden />
                              <span className="sr-only">Included in {p.name}</span>
                            </span>
                          ) : (
                            <span className="mx-auto grid size-6 place-items-center text-ink-200">
                              <Minus className="size-4" aria-hidden />
                              <span className="sr-only">Not in {p.name}</span>
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            );
          })}
        </Table>
      </div>
    </>
  );
}
