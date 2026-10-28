import { SpotAiTrail, SpotAuditLog, SpotIdLock, SpotKey, SpotPrivacy, SpotVault, type SpotIcon } from "@/components/illustrations/spots";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProductMockup } from "@/components/product/registry";

import { ArrowLink, Eyebrow, IconChip } from "../primitives";

export const SECURITY_POINTS: { icon: SpotIcon; title: string; body: string }[] = [
  {
    icon: SpotVault,
    title: "Workspace isolation",
    body: "Every query is scoped to your workspace on the server, from your sign-in token — never from what a browser sends.",
  },
  {
    icon: SpotAuditLog,
    title: "An audit log nobody can edit",
    body: "Insert-only, and saved in the same transaction as the change it records.",
  },
  {
    icon: SpotKey,
    title: "Sign-in controls",
    body: "OIDC single sign-on, Google and Microsoft, two-step verification, IP allowlists and SCIM.",
  },
  {
    icon: SpotIdLock,
    title: "Sensitive fields protected",
    body: "PAN and similar fields are encrypted at rest; files are served only through AskMira, never by public link.",
  },
  {
    icon: SpotPrivacy,
    title: "DPDP tools",
    body: "Consent by purpose, requests from employees about their data, and retention rules for records.",
  },
  {
    icon: SpotAiTrail,
    title: "AI with a paper trail",
    body: "Off by default. Every AI request is logged with the model, the outcome and who asked.",
  },
];

export function SecurityGrid() {
  return (
    <section aria-labelledby="security-heading" className="section-y bg-cream-100/60">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Security & privacy</Eyebrow>
          <h2 id="security-heading" className="mt-4 font-display text-display-2 font-semibold text-ink-950">
            Built like payroll depends on it
          </h2>
          <p className="mt-5 text-lead text-ink-600">
            Salaries, bank accounts and identity numbers deserve more than a promise. These controls are part of how
            AskMira is built — not settings someone has to remember to turn on.
          </p>
          <div className="mt-8 hidden max-w-md lg:block">
            <ProductMockup name="audit" />
          </div>
          <ArrowLink href="/security" className="mt-8">
            Security and privacy in detail
          </ArrowLink>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {SECURITY_POINTS.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
                <IconChip icon={Icon} accent="red" />
                <h3 className="mt-5 text-lg font-semibold text-ink-950">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
