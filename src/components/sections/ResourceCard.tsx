import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Guide } from "@/lib/content/resources";
import { cn } from "@/lib/utils";

export function formatLongDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T00:00:00`),
  );
}

const CATEGORY_TONE = {
  Payroll: "bg-blush-50 text-brand-700",
  "Getting started": "bg-marigold-50 text-marigold-800",
  Attendance: "bg-info-50 text-info-600",
} as const;

export function GuideCard({ guide, className }: { guide: Guide; className?: string }) {
  const Icon = guide.icon;
  return (
    <Link
      href={`/resources/guides/${guide.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-cream-200 bg-white p-6 transition-[box-shadow,transform,border-color] duration-300 outline-none hover:-translate-y-1 hover:border-cream-300 hover:shadow-card focus-visible:ring-[3px] focus-visible:ring-ring/60 motion-reduce:hover:translate-y-0 sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("grid size-11 place-items-center rounded-2xl", CATEGORY_TONE[guide.category])}>
          <Icon className="size-5" aria-hidden />
        </span>
        <ArrowUpRight className="size-5 text-ink-300 transition-colors group-hover:text-brand-700" aria-hidden />
      </div>
      <Badge variant="outline" className="mt-6">
        {guide.category} guide
      </Badge>
      <h3 className="mt-3 font-display text-xl leading-snug font-semibold text-ink-950">{guide.title}</h3>
      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-600">{guide.summary}</p>
      <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-ink-400">
        <Clock className="size-4" aria-hidden /> {guide.readMinutes} min read
      </p>
    </Link>
  );
}
