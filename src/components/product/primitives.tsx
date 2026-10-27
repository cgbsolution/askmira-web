import {
  Bell,
  Briefcase,
  CalendarDays,
  CircleHelp,
  Clock,
  FileText,
  HeartHandshake,
  House,
  IndianRupee,
  Inbox,
  Search,
  Target,
  UserPlus,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AskMiraMark } from "@/components/layout/Logo";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, initials } from "@/lib/utils";

/*
 * Building blocks for the product previews. They copy the AskMira portal's
 * shell — ink rail, marigold active chip, cream canvas, Inter — at a smaller
 * scale. Every preview is an illustration with sample data, so its root is
 * `role="img"` with a description, and it carries a "Sample data" tag.
 */

/** A browser-like window around a preview. */
export function MockFrame({
  label,
  children,
  className,
  bodyClassName,
  tone = "light",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "@container relative overflow-hidden rounded-2xl border font-ui text-ink-900 select-none",
        tone === "dark" ? "border-white/10 shadow-frame" : "border-cream-200 shadow-float",
        "bg-cream-50",
        className,
      )}
    >
      <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-cream-200 bg-white px-3">
        <span className="size-2.5 rounded-full bg-cream-300" />
        <span className="size-2.5 rounded-full bg-cream-300" />
        <span className="size-2.5 rounded-full bg-cream-300" />
        <span className="ml-3 truncate text-[10px] font-medium text-ink-400">AskMira · Demo workspace</span>
        <SampleTag className="ml-auto" />
      </div>
      <div aria-hidden className={cn("relative", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

/** A floating card that overlaps a frame (hero and showcase compositions). */
export function MockPanel({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "@container overflow-hidden rounded-2xl border border-cream-200 bg-white font-ui text-ink-900 shadow-float select-none",
        className,
      )}
    >
      <div aria-hidden>{children}</div>
    </div>
  );
}

export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-cream-100 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-ink-400 uppercase",
        className,
      )}
    >
      Sample data
    </span>
  );
}

const RAIL: { icon: LucideIcon; key: string }[] = [
  { icon: House, key: "home" },
  { icon: Inbox, key: "approvals" },
  { icon: UserPlus, key: "onboarding" },
  { icon: UsersRound, key: "people" },
  { icon: Briefcase, key: "hiring" },
  { icon: Clock, key: "attendance" },
  { icon: CalendarDays, key: "leave" },
  { icon: IndianRupee, key: "payroll" },
  { icon: Target, key: "performance" },
  { icon: HeartHandshake, key: "culture" },
  { icon: FileText, key: "documents" },
];

/**
 * The portal shell in miniature: an icon rail (hidden in narrow containers),
 * a header with search, and the page.
 */
export function MockShell({
  active,
  children,
  className,
}: {
  active: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      <div className="hidden w-12 shrink-0 flex-col items-center gap-1.5 bg-ink-900 py-3 @2xl:flex">
        <AskMiraMark className="mb-2 h-6" />
        {RAIL.map(({ icon: Icon, key }) => (
          <span
            key={key}
            className={cn(
              "relative grid size-7 place-items-center rounded-lg text-ink-300",
              key === active && "bg-marigold-500 text-ink-950",
            )}
          >
            <Icon className="size-3.5" />
            {key === "approvals" && (
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-brand-500 ring-2 ring-ink-900" />
            )}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex h-10 items-center gap-2 border-b border-cream-200 bg-white px-3">
          <div className="flex h-6 w-full max-w-64 items-center gap-1.5 overflow-hidden rounded-md border border-cream-200 px-2 text-[10px] whitespace-nowrap text-ink-300">
            <Search className="size-3" />
            Search people by name, code or email
            <span className="ml-auto hidden rounded border border-cream-200 px-1 text-[9px] @md:inline">Ctrl K</span>
          </div>
          <span className="ml-auto grid size-6 place-items-center rounded-full border border-cream-200 text-ink-400">
            <CircleHelp className="size-3" />
          </span>
          <span className="relative grid size-6 place-items-center rounded-full border border-cream-200 text-ink-400">
            <Bell className="size-3" />
            <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-brand-500" />
          </span>
          <Person name="Priya Ramesh" size="xs" />
        </div>
        <div className="p-3 @2xl:p-4">{children}</div>
      </div>
    </div>
  );
}

const AVATAR_TONES = [
  "bg-blush-100 text-brand-800",
  "bg-marigold-100 text-marigold-900",
  "bg-info-50 text-info-600",
  "bg-success-50 text-success-600",
  "bg-cream-200 text-ink-700",
] as const;

function toneFor(name: string) {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return AVATAR_TONES[sum % AVATAR_TONES.length];
}

const AVATAR_SIZE = {
  xs: "size-6 text-[9px]",
  sm: "size-7 text-[10px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
} as const;

/** An initials avatar, coloured from the name so it stays stable. */
export function Person({
  name,
  size = "sm",
  className,
}: {
  name: string;
  size?: keyof typeof AVATAR_SIZE;
  className?: string;
}) {
  return (
    <Avatar className={cn(AVATAR_SIZE[size], className)}>
      <AvatarFallback className={cn("font-semibold", toneFor(name))}>{initials(name)}</AvatarFallback>
    </Avatar>
  );
}

/** A white card inside a preview. */
export function MockCard({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-cream-200 bg-white p-3", className)}>
      {(title || action) && (
        <div className="mb-2 flex items-center justify-between gap-2">
          {title && <p className="text-[11px] font-semibold text-ink-800">{title}</p>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-cream-200 bg-white p-3">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-medium text-ink-500">{label}</p>
        <span className="grid size-6 place-items-center rounded-md bg-blush-50 text-brand-700">
          <Icon className="size-3" />
        </span>
      </div>
      <p className="mt-1 text-lg leading-none font-semibold tabular-nums">{value}</p>
      <p className="mt-1 truncate text-[9px] text-ink-400">{hint}</p>
    </div>
  );
}

/** A thin progress bar. `tone` is decorative unless it is `success`. */
export function Meter({
  value,
  tone = "brand",
  className,
}: {
  value: number;
  tone?: "brand" | "marigold" | "success" | "ink" | "info";
  className?: string;
}) {
  const fill = {
    brand: "bg-brand-500",
    marigold: "bg-marigold-500",
    success: "bg-success",
    ink: "bg-ink-700",
    info: "bg-info",
  }[tone];
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-cream-100", className)}>
      <div className={cn("h-full rounded-full", fill)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

/** Status pill using the site's status colours — never brand red for "good". */
export function Status({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "info" | "warning" | "muted" | "secondary";
}) {
  return (
    <Badge variant={tone} size="sm" className="font-semibold">
      {children}
    </Badge>
  );
}
