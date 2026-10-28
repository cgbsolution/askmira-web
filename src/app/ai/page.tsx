import { SpotAuditLog, SpotBook, SpotBuildings, SpotCalendar, SpotChart, SpotConnected, SpotDevice, SpotLock, SpotMira, SpotPerson, SpotPin, SpotPlane, SpotPlug, SpotPrivacy, SpotTeam, SpotTile, SpotToggle, type SpotIcon } from "@/components/illustrations/spots";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MiraChatMock } from "@/components/product/mock-platform";
import { CtaBand } from "@/components/sections/CtaBand";
import { DarkHero } from "@/components/sections/DarkHero";
import { MiraAcross } from "@/components/sections/ecosystem/MiraAcross";
import { FaqList } from "@/components/sections/FaqList";
import { IconChip, MockStage, SectionHeading } from "@/components/sections/primitives";
import { faqGroups } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ask Mira — the HR companion with guardrails",
  description:
    "Ask Mira answers HR questions from your own policies with the source quoted, looks things up with the asker's permissions, and is off until your admin switches it on.",
  path: "/ai",
});

const CAPABILITIES: { icon: SpotIcon; title: string; body: string; points: string[] }[] = [
  {
    icon: SpotBook,
    title: "Policy answers, with the source quoted",
    body: "Employees ask in their own words. Mira answers from your handbook and policies, and names the document and section it used.",
    points: ["No more hunting through PDFs", "An answer anyone can check", "The helpdesk is there when a person is needed"],
  },
  {
    icon: SpotChart,
    title: "Reports, asked in plain words",
    body: "Ask \"how many joiners in Pune this quarter?\" and Mira turns it into a report definition. The model sees field names, never a single row.",
    points: ["The same safeguards as the report builder", "Shows how it read your question", "Rows scoped to what you may see"],
  },
  {
    icon: SpotPlug,
    title: "Your AI assistant, connected",
    body: "Connect AskMira to Claude or ChatGPT over MCP. The assistant signs in as the person and gets exactly their permissions.",
    points: ["Sign-in with OAuth", "Every call recorded", "The same permissions as in AskMira"],
  },
];

const LOOKUPS: { icon: SpotIcon; label: string }[] = [
  { icon: SpotBook, label: "Company policies" },
  { icon: SpotPerson, label: "Your own record" },
  { icon: SpotTeam, label: "People" },
  { icon: SpotCalendar, label: "Who is on leave" },
  { icon: SpotDevice, label: "Attendance" },
  { icon: SpotBuildings, label: "Departments" },
  { icon: SpotPin, label: "Locations" },
  { icon: SpotChart, label: "Reports" },
  { icon: SpotConnected, label: "Connected products" },
];

const RULES: { icon: SpotIcon; title: string; body: string }[] = [
  { icon: SpotToggle, title: "Off by default", body: "No AI call is made until your admin turns AI on for the workspace, with their name on the audit entry." },
  { icon: SpotPrivacy, title: "Consent comes first", body: "Where the data is an employee's own, their consent for that purpose must allow it. A blank is not a yes." },
  { icon: SpotPlane, title: "Transfers are recorded", body: "Any data sent to a provider outside India is recorded with the provider, the purpose and the categories of data." },
  { icon: SpotAuditLog, title: "Every request logged", body: "The model used, the outcome and who asked — published to admins in the AI Trust Center." },
  { icon: SpotLock, title: "Never more than the asker", body: "Mira works with the signed-in person's permissions. It cannot see what they cannot." },
  { icon: SpotMira, title: "Plain about limits", body: "With no AI key configured, the screen says so instead of showing a spinner that never ends." },
];

export default function AiPage() {
  const aiFaqs = faqGroups.find((g) => g.title === "AI")?.items ?? [];
  return (
    <>
      <DarkHero
        eyebrow="Ask Mira AI"
        eyebrowIcon={SpotMira}
        title="An HR companion that shows its working"
        lead="Ask Mira answers questions from your own policies and records, quotes where the answer came from, and never sees more than the person asking."
        secondary={{ label: "The rules Mira follows", href: "#guardrails" }}
        visual={
          <div className="mx-auto max-w-md">
            <MiraChatMock />
          </div>
        }
      />

      <section className="section-y bg-background" aria-labelledby="capabilities-heading">
        <div className="container-site">
          <SectionHeading
            id="capabilities-heading"
            eyebrow="What it does"
            title="Three ways AI helps inside AskMira"
            lead="Each one is built so a person can check the result — not just trust it."
          />
          <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, body, points }) => (
              <StaggerItem key={title}>
                <div className="flex h-full flex-col rounded-3xl border border-cream-200 bg-white p-7">
                  <IconChip icon={Icon} accent="marigold" />
                  <h3 className="mt-6 font-display text-display-4 font-semibold text-ink-950">{title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
                  <ul className="mt-6 grid gap-2 border-t border-cream-200 pt-5">
                    {points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm font-medium text-ink-700">
                        <span className="size-1.5 rounded-full bg-brand-500" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y-sm bg-background" aria-labelledby="lookups-heading">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 id="lookups-heading" className="font-display text-display-3 font-semibold text-ink-950">
              What Mira can look up for you
            </h2>
            <p className="mt-4 text-lead text-ink-600">
              Mira answers questions; it does not change records on its own. These are the things it can read — each
              one only as far as the person asking is allowed to see.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {LOOKUPS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-ink-800">
                  <SpotTile icon={Icon} size="xs" className="-my-1 -ml-2.5 size-7 rounded-full p-1" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <MockStage tone="marigold">
              <MiraChatMock className="mx-auto w-full max-w-md" />
            </MockStage>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="across-heading">
        <div className="container-site">
          <SectionHeading
            id="across-heading"
            eyebrow="Across your apps"
            title="Questions managers ask, and what Mira answers today"
            lead="Mira reads AnytimeHire, Expense Genie and CGB Helpdesk where they are connected. Budget, procurement and sales questions are on the roadmap — and approvals always stay with people."
          />
          <MiraAcross className="mt-12" />
        </div>
      </section>

      <section id="guardrails" className="section-y bg-ink-950 text-white" aria-labelledby="rules-heading">
        <div className="container-site">
          <SectionHeading
            id="rules-heading"
            tone="dark"
            eyebrow="Guardrails"
            title="The rules Mira follows"
            lead="These are enforced in the product's code, not in a policy document."
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RULES.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-7">
                  <SpotTile icon={Icon} size="md" tone="cream" />
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-background" aria-labelledby="ai-faq-heading">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="ai-faq-heading" align="left" title="Questions about AI" lead="If yours is not here, ask us in a demo." />
          <FaqList items={aiFaqs} />
        </div>
      </section>

      <CtaBand title="See Ask Mira answer your questions" lead="Bring a policy question your team asks every week. We will show you the answer, and where it came from." />
    </>
  );
}
