import { SpotTile } from "@/components/illustrations/spots";
import { STATUS_LABEL, type Integration } from "@/lib/content/integrations";
import { cn } from "@/lib/utils";

const DOT = {
  available: "bg-success",
  pilot: "bg-marigold-500",
  planned: "bg-ink-300",
} as const;

/** A picture of what the integration does — partners' own logos are not used without their approval. */
export function IntegrationMark({ integration, size = "md" }: { integration: Integration; size?: "sm" | "md" }) {
  return <SpotTile icon={integration.spot} size={size} tone={integration.status === "planned" ? "muted" : "blush"} />;
}

export function StatusDot({ status, withLabel = true }: { status: Integration["status"]; withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-ink-500">
      <span className={cn("size-2 rounded-full", DOT[status])} aria-hidden />
      {withLabel ? STATUS_LABEL[status] : <span className="sr-only">{STATUS_LABEL[status]}</span>}
    </span>
  );
}

/** Compact pill for the home page's drifting rows. */
export function IntegrationPill({ integration }: { integration: Integration }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white py-2.5 pr-5 pl-2.5 shadow-soft">
      <IntegrationMark integration={integration} size="sm" />
      <div className="min-w-0">
        <p className="text-sm font-semibold whitespace-nowrap text-ink-900">{integration.name}</p>
        <StatusDot status={integration.status} />
      </div>
    </div>
  );
}
