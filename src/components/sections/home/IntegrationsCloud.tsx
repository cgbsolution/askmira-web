import { Emph, Squiggle } from "@/components/motion/Doodles";
import { integrations } from "@/lib/content/integrations";

import { IntegrationPill, StatusDot } from "../IntegrationTile";
import { ArrowLink, SectionHeading } from "../primitives";

/** Two rows drifting in opposite directions, like the reference. */
export function IntegrationsCloud() {
  const shown = integrations;
  const half = Math.ceil(shown.length / 2);
  const rows = [shown.slice(0, half), shown.slice(half)];

  return (
    <section aria-labelledby="integrations-heading" className="section-y overflow-hidden bg-white">
      <div className="container-site">
        <SectionHeading
          id="integrations-heading"
          eyebrow="Integrations"
          note="no rip and replace"
          title={<>Works with <Emph underline={false}>what you <Squiggle>already run</Squiggle></Emph></>}
          lead="Biometric devices, banks, accounting, identity, messaging and AI assistants — plus an API and webhooks for everything else."
        />
      </div>
      <div className="mask-fade-x mt-12 grid gap-4 sm:mt-14">
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <div
              className="animate-marquee flex w-max gap-4 pr-4 hover:[animation-play-state:paused]"
              style={{ animationDirection: r === 1 ? "reverse" : "normal", ["--marquee-duration" as string]: r === 1 ? "70s" : "60s" }}
            >
              {[...row, ...row].map((integration, i) => (
                <div key={`${integration.name}-${i}`} aria-hidden={i >= row.length || undefined}>
                  <IntegrationPill integration={integration} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container-site mt-10 flex flex-col items-center gap-5">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <StatusDot status="available" />
          <span className="text-xs text-ink-400">Each connects with your own account there.</span>
        </div>
        <ArrowLink href="/integrations">See all integrations</ArrowLink>
      </div>
    </section>
  );
}
