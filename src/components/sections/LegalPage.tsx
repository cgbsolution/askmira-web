import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[] };

/** A plain, readable legal page. `draft` shows that the text awaits legal review. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
  draft = true,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  draft?: boolean;
}) {
  return (
    <article className="bg-background pt-32 pb-24 sm:pt-36 lg:pt-44">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-display-2 font-semibold text-ink-950">{title}</h1>
        <p className="mt-3 text-sm text-ink-500">Last updated {updated}</p>
        {draft && (
          <Alert variant="warning" className="mt-8 rounded-2xl">
            <TriangleAlert aria-hidden />
            <AlertTitle>Draft awaiting legal review</AlertTitle>
            <AlertDescription>
              This page describes how the website handles information today. It will be replaced by the final, legally
              reviewed text before launch.
            </AlertDescription>
          </Alert>
        )}
        <p className="mt-8 text-[1.0625rem] leading-[1.75] text-ink-700">{intro}</p>
        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-display text-display-4 font-semibold text-ink-950">{s.heading}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-4 text-[1.0625rem] leading-[1.75] text-ink-700">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-4 grid list-disc gap-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-700 marker:text-brand-500">
                {s.list.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
