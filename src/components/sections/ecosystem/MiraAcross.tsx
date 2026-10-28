import { MessageCircleQuestion } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { miraQuestions } from "@/lib/content/ecosystem";
import { cn } from "@/lib/utils";

import { ConnectionBadge } from "./ConnectionBadge";

/** Questions people ask Mira across the platform, each marked with what works today. */
export function MiraAcross({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Stagger className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {miraQuestions.map((item) => (
        <StaggerItem key={item.q}>
          <div
            className={cn(
              "flex h-full flex-col rounded-3xl border p-5 sm:p-6",
              dark ? "border-white/10 bg-white/[0.05]" : "border-cream-200 bg-white",
            )}
          >
            <div className="flex items-start gap-3">
              <MessageCircleQuestion className={cn("mt-0.5 size-5 shrink-0", dark ? "text-marigold-300" : "text-brand-700")} aria-hidden />
              <p className={cn("font-display text-lg leading-snug font-semibold", dark ? "text-white" : "text-ink-950")}>
                &ldquo;{item.q}&rdquo;
              </p>
            </div>
            <p className={cn("mt-3 flex-1 text-[0.875rem] leading-relaxed", dark ? "text-white/65" : "text-ink-600")}>
              {item.how}
            </p>
            <ConnectionBadge status={item.status} className="mt-4" />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
