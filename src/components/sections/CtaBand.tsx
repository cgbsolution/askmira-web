import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

/** A rounded deep-red panel with one clear next step — the reference's closing band. */
export function CtaBand({
  title = "See how AskMira would run your HR",
  lead = "A 30-minute walkthrough, shaped around how your company works today.",
  primary = { label: "Book a demo", href: "/demo" },
  secondary = { label: "Talk to us", href: "/contact" },
}: {
  title?: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="section-y-sm bg-background">
      <div className="container-site">
        <Reveal>
          <div className="bg-deep relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
            <h2 className="mx-auto max-w-3xl font-display text-display-2 font-semibold">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-white/75">{lead}</p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href={primary.href}>
                  {primary.label} <ArrowRight />
                </Link>
              </Button>
              {secondary && (
                <Button asChild size="lg" variant="glass">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
