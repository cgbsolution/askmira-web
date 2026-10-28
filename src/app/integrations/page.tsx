import { SpotPlug } from "@/components/illustrations/spots";

import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { IntegrationMark, StatusDot } from "@/components/sections/IntegrationTile";
import { PageHero } from "@/components/sections/PageHero";
import { CheckList, Eyebrow, SectionHeading } from "@/components/sections/primitives";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INTEGRATION_CATEGORIES, integrations, type Integration } from "@/lib/content/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integrations",
  description:
    "AskMira works with eSSL and ZKTeco devices, Indian bank files, Tally and Zoho Books, Google and Microsoft sign-in, WhatsApp, Claude and ChatGPT, plus a REST API and webhooks.",
  path: "/integrations",
});

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-cream-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <IntegrationMark integration={integration} />
        <StatusDot status={integration.status} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink-950">{integration.name}</h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">{integration.description}</p>
      <Badge variant="muted" className="mt-5">
        {integration.category}
      </Badge>
    </div>
  );
}

function Grid({ items }: { items: Integration[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <li key={i.name}>
          <IntegrationCard integration={i} />
        </li>
      ))}
    </ul>
  );
}

const WEBHOOK_SNIPPET = `import hashlib, hmac

def is_from_askmira(body: bytes, signature: str, secret: str) -> bool:
    """Check the X-AskMira-Signature header on a webhook delivery."""
    expected = "sha256=" + hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)`;

const API_SNIPPET = `curl https://<your-askmira-api>/api/v1/ext/leave-balances \\
  -H "Authorization: Bearer amk_…"`;

export default function IntegrationsPage() {
  const counts = {
    available: integrations.filter((i) => i.status === "available").length,
    pilot: integrations.filter((i) => i.status === "pilot").length,
  };
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        eyebrowIcon={SpotPlug}
        title="Works with what you already run"
        lead="Attendance devices, banks, accounting, identity, messaging and AI assistants. Every listing says honestly whether it is available today, in pilot, or planned."
        secondary={{ label: "For developers", href: "#developers" }}
      >
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-600">
            <span className="flex items-center gap-2">
              <StatusDot status="available" withLabel={false} />
              {counts.available} available today
            </span>
            <span className="flex items-center gap-2">
              <StatusDot status="pilot" withLabel={false} />
              {counts.pilot} in pilot — built, being verified with a live partner account
            </span>
            <span className="flex items-center gap-2">
              <StatusDot status="planned" withLabel={false} />
              Planned — on the roadmap, not built
            </span>
          </div>
        </Reveal>
      </PageHero>

      <section className="section-y-sm bg-background" aria-label="All integrations">
        <div className="container-site">
          <Tabs defaultValue="all" className="gap-8">
            <TabsList
              aria-label="Filter by category"
              className="mask-fade-x -mx-4 flex h-auto w-[calc(100%+2rem)] justify-start gap-2 overflow-x-auto bg-transparent p-1 px-4 [scrollbar-width:none] sm:mx-0 sm:w-full sm:flex-wrap sm:px-1 sm:[mask-image:none]"
            >
              {["all", ...INTEGRATION_CATEGORIES].map((c) => (
                <TabsTrigger
                  key={c}
                  value={c}
                  className="h-10 flex-none rounded-full border border-cream-300 bg-white px-4 text-sm font-semibold text-ink-700 hover:text-ink-950 data-[state=active]:border-brand-800 data-[state=active]:bg-brand-800 data-[state=active]:text-white"
                >
                  {c === "all" ? "All" : c}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <Grid items={integrations} />
            </TabsContent>
            {INTEGRATION_CATEGORIES.map((c) => (
              <TabsContent key={c} value={c}>
                <Grid items={integrations.filter((i) => i.category === c)} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="developers" className="section-y bg-ink-950 text-white" aria-labelledby="dev-heading">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              id="dev-heading"
              align="left"
              tone="dark"
              eyebrow="For developers"
              title="A REST API and webhooks for everything else"
              lead="Create scoped API keys and webhook endpoints in Settings. Your systems stay current without a nightly export."
            />
            <CheckList
              tone="dark"
              className="mt-8"
              items={[
                "Keys are scoped (employees, leave, attendance, org, hiring) and revocable; only a hash is stored",
                "Webhooks are signed with HMAC-SHA256 and retried with growing gaps",
                "Deliveries never go to private or loopback addresses — checked again after DNS",
                "MCP for AI assistants, signed in with OAuth as the user",
              ]}
            />
          </div>
          <Reveal className="grid min-w-0 grid-cols-1 gap-4 self-center">
            <div>
              <Eyebrow tone="dark">Call the API</Eyebrow>
              <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-mono text-[0.8125rem] leading-relaxed text-marigold-100">
                <code>{API_SNIPPET}</code>
              </pre>
            </div>
            <div>
              <Eyebrow tone="dark">Verify a webhook</Eyebrow>
              <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-mono text-[0.8125rem] leading-relaxed text-marigold-100">
                <code>{WEBHOOK_SNIPPET}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need something that is not listed?"
        lead="Tell us what you run today. We will tell you honestly whether AskMira connects to it, and how."
        primary={{ label: "Ask about an integration", href: "/contact" }}
        secondary={{ label: "Book a demo", href: "/demo" }}
      />
    </>
  );
}
