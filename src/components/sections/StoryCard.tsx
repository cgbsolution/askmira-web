import { Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CustomerStory = {
  company: string;
  industry: string;
  size: string;
  quote: string;
  person: string;
  role: string;
  results: { value: string; label: string }[];
  /** True for the layout example shown until real, approved stories exist. */
  placeholder?: boolean;
};

/** A customer story card. Placeholders are labelled on the card itself. */
export function StoryCard({ story, className }: { story: CustomerStory; className?: string }) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-white p-7 sm:p-9",
        story.placeholder ? "border-dashed border-cream-400" : "border-cream-200",
        className,
      )}
    >
      {story.placeholder && (
        <Badge variant="warning" size="lg" className="absolute -top-3 left-7 font-semibold">
          Example layout — not a real customer
        </Badge>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-xl font-semibold text-ink-950">{story.company}</p>
        <Badge variant="muted">{story.industry}</Badge>
        <Badge variant="muted">{story.size}</Badge>
      </div>
      <Quote className="mt-6 size-8 text-brand-200" aria-hidden />
      <blockquote className="mt-2 font-display text-display-4 leading-snug font-medium text-ink-800">{story.quote}</blockquote>
      <p className="mt-5 text-sm text-ink-500">
        <span className="font-semibold text-ink-800">{story.person}</span> · {story.role}
      </p>
      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-cream-200 pt-6">
        {story.results.map((r) => (
          <div key={r.label}>
            <dt className="sr-only">{r.label}</dt>
            <dd className="font-display text-2xl font-semibold text-ink-950">{r.value}</dd>
            <dd className="text-xs text-ink-500">{r.label}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
