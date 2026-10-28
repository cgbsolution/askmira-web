import { CircleCheck, CircleDashed, CircleDot, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CONNECTION_HELP, CONNECTION_LABEL, type ConnectionStatus } from "@/lib/content/ecosystem";
import { cn } from "@/lib/utils";

const VARIANT = {
  live: "success",
  partial: "info",
  available: "warning",
  planned: "muted",
} as const;

const ICON = {
  live: CircleCheck,
  partial: CircleDot,
  available: CircleDashed,
  planned: Clock3,
} as const;

/** How far a connection is built. Never a brand colour: these are statuses. */
export function ConnectionBadge({
  status,
  className,
  size = "default",
  tone = "light",
}: {
  status: ConnectionStatus;
  className?: string;
  size?: "sm" | "default";
  tone?: "light" | "dark";
}) {
  const Icon = ICON[status];
  return (
    <Badge
      variant={tone === "dark" ? "dark" : VARIANT[status]}
      size={size}
      title={CONNECTION_HELP[status]}
      className={cn("font-semibold", className)}
    >
      <Icon aria-hidden />
      {CONNECTION_LABEL[status]}
    </Badge>
  );
}

export function ConnectionLegend({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {(Object.keys(CONNECTION_LABEL) as ConnectionStatus[]).map((s) => (
        <div key={s} className="flex flex-col gap-1.5">
          <dt>
            <ConnectionBadge status={s} tone={tone} />
          </dt>
          <dd className={cn("text-[0.8125rem] leading-snug", tone === "dark" ? "text-white/65" : "text-ink-500")}>
            {CONNECTION_HELP[s]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
