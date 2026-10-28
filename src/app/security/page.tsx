import { SpotShield } from "@/components/illustrations/spots";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AccessMock, AuditMock } from "@/components/product/mock-people";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { SECURITY_POINTS } from "@/components/sections/home/SecurityGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CheckList, Eyebrow, IconChip, MockStage, SectionHeading } from "@/components/sections/primitives";
import { faqGroups } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security and privacy",
  description:
    "How AskMira protects HR and payroll data: workspace isolation, an insert-only audit log, SSO and two-step sign-in, encrypted sensitive fields, DPDP tools and AI governance.",
  path: "/security",
});

const AREAS = [
  {
    eyebrow: "Access",
    title: "Who can see what, enforced on the server",
    points: [
      "Every request checks the role and the reporting line — hiding a button is never the control",
      "Manager rights follow the org chart and change when the team changes",
      "Payroll bureaus get time-limited access the client grants, and their actions are recorded as theirs",
      "Workspace settings are reserved for admins",
    ],
    visual: <AccessMock />,
  },
  {
    eyebrow: "Accountability",
    title: "A record of every change that cannot be rewritten",
    points: [
      "The audit log is insert-only: no edit, no delete, by anyone",
      "A change and its audit entry are saved together, or not at all",
      "Payroll rule sets are versioned by date; history is never overwritten",
      "Money is stored as exact decimals, never floating point",
    ],
    visual: <AuditMock className="mx-auto w-full max-w-md" />,
  },
];

const SIGN_IN = [
  "OpenID Connect single sign-on, with the option to require it",
  "Google and Microsoft sign-in, verified emails only",
  "Two-step verification and IP allowlists",
  "Accounts lock after five failed sign-ins in fifteen minutes",
  "SCIM to add and remove people from your identity provider",
  "Passwords hashed with Argon2id",
];

const DATA = [
  "PAN and similar identifiers encrypted at rest",
  "Files kept in private storage and served only through AskMira, which checks who is asking",
  "Uploads checked by their content, not just their name",
  "Consent recorded per purpose; employees can raise requests about their data",
  "Retention rules decide how long each kind of record is kept",
  "Public pages are rate-limited and refuse automated form filling",
];

export default function SecurityPage() {
  const securityFaqs = faqGroups.find((g) => g.title === "Security and data")?.items ?? [];
  return (
    <>
      <PageHero
        eyebrow="Security & privacy"
        eyebrowIcon={SpotShield}
        title="Built like payroll depends on it"
        lead="Salaries, bank accounts and identity numbers are some of the most sensitive data a company holds. Here is how AskMira looks after them — described as it is built, not as a promise."
        secondary={{ label: "Send us your questionnaire", href: "/contact" }}
      />

      <section className="section-y-sm bg-background" aria-label="Security controls">
        <div className="container-site">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECURITY_POINTS.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-3xl border border-cream-200 bg-white p-7">
                  <IconChip icon={Icon} accent="red" />
                  <h2 className="mt-5 text-lg font-semibold text-ink-950">{title}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-background" aria-label="Access and accountability">
        <div className="container-site grid gap-20 lg:gap-28">
          {AREAS.map((area, i) => (
            <div key={area.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? "lg:order-2" : undefined}>
                <Eyebrow>{area.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-display-3 font-semibold text-ink-950">{area.title}</h2>
                <CheckList items={area.points} className="mt-7" />
              </Reveal>
              <Reveal delay={0.1} className={i % 2 ? "lg:order-1" : undefined}>
                <MockStage tone={i % 2 ? "marigold" : "blush"}>{area.visual}</MockStage>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-ink-950 text-white" aria-labelledby="signin-heading">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 id="signin-heading" className="font-display text-display-3 font-semibold">
              Sign-in your IT team will approve
            </h2>
            <CheckList tone="dark" items={SIGN_IN} className="mt-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-display-3 font-semibold">Data handled with care</h2>
            <CheckList tone="dark" items={DATA} className="mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="sec-faq-heading">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="sec-faq-heading"
            align="left"
            title="Security questions"
            lead="Working through a vendor security review? Send it to us and we will answer it in writing."
          />
          <FaqList items={securityFaqs} />
        </div>
      </section>

      <CtaBand
        title="Have a security questionnaire?"
        lead="Send it over. We will answer each question about how AskMira is built, in writing."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Book a demo", href: "/demo" }}
      />
    </>
  );
}
