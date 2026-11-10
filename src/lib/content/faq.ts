import type { Faq } from "./types";

export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "Can I sign up and try AskMiraa on my own?",
        a: "No. Every AskMiraa workspace is set up by our team after a demo, together with your first admin. It keeps strangers off the platform and means your workspace starts with your company's details, entities and locations already in place.",
      },
      {
        q: "How do we move our employee data in?",
        a: "Upload your existing employee sheet in Excel — AskMiraa's template or another HR system's export as it is. Every row is checked first, and you get a file of any rows that could not be added, with the reason for each.",
      },
      {
        q: "Do we have to use every module?",
        a: "No. Modules are switched on per workspace. Many teams start with core HR, attendance, leave and payroll, and add hiring, performance and culture later on the same employee record.",
      },
      {
        q: "Does it work on phones?",
        a: "Yes. Employees punch in, apply for leave, approve, open payslips and ask Miraa from the AskMiraa app for Android, and every page also works in a phone browser — including on iPhone — and can be added to the home screen.",
      },
    ],
  },
  {
    title: "Payroll and compliance",
    items: [
      {
        q: "Which statutory requirements does AskMiraa cover?",
        a: "Provident Fund with the ECR file, ESI, professional tax and labour welfare fund by state, and TDS on salary under both regimes, with declarations, proofs, challans, 24Q returns and Form 16.",
      },
      {
        q: "Which banks can we pay salaries through?",
        a: "Transfer files in HDFC, ICICI, SBI, Axis and Kotak formats ship today. Adding another bank is usually a new format definition rather than new code.",
      },
      {
        q: "Can a payroll bureau or our CA firm run payroll for us?",
        a: "Yes. Your admin grants a named person at the bureau access to payroll until a date you choose. Their actions are recorded as theirs, and you can revoke access at any time.",
      },
    ],
  },
  {
    title: "Security and data",
    items: [
      {
        q: "How is our data kept separate from other companies?",
        a: "Every query is scoped to your workspace on the server, from the workspace in your sign-in token — never from anything a browser sends. It is one of the checks our releases must pass.",
      },
      {
        q: "Can anyone change the audit log?",
        a: "No. The audit log is insert-only: there is no way to edit or delete an entry, and a change and its audit entry are saved together or not at all.",
      },
      {
        q: "What sign-in options are there?",
        a: "Email and password with two-step verification, Google and Microsoft sign-in, and single sign-on through any OpenID Connect provider. Admins can require SSO and restrict sign-in to listed IP addresses.",
      },
      {
        q: "Does AskMiraa help with the DPDP Act?",
        a: "AskMiraa records consent for each purpose, handles requests from employees about their data, and applies retention rules to records. Whether your organisation is compliant depends on your own processes too, so talk to your adviser.",
      },
    ],
  },
  {
    title: "AI",
    items: [
      {
        q: "Is AI switched on by default?",
        a: "No. AI features are off until your admin turns them on in Settings. Where an employee's own data is involved, their consent for that purpose is checked first.",
      },
      {
        q: "How do we know what the AI did?",
        a: "Every AI request is recorded with the model used, the outcome and who asked. Admins see it in the AI Trust Center, and any transfer of data to a provider outside India is recorded with the provider and purpose.",
      },
      {
        q: "What can Ask Miraa look up?",
        a: "Company policies, your own record, people, who is on leave, attendance, payroll totals, department budgets, reports and charts, and the connected apps — AnytimeHire, Expense Genie, CGB Helpdesk, Saleinx and ProcureFlow. It can also apply for leave, raise requests and tickets, or approve what waits on you, once you confirm. It always works as the signed-in person, with exactly their permissions.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        q: "How much does AskMiraa cost?",
        a: "Free covers up to 20 employees at no cost. Core is ₹4,999, Premium ₹5,999 and Ultimate ₹6,999 a month for up to 50 employees, plus ₹99, ₹119 or ₹139 a month for each additional employee. Paid plans are billed quarterly; prices exclude GST.",
      },
      {
        q: "Can I change plans later?",
        a: "Yes. Move up to a bigger plan at any time and the new modules switch on in the same workspace — your employee records, attendance and payroll history stay exactly where they are.",
      },
      {
        q: "How is the employee count worked out?",
        a: "Each plan includes up to 20 or 50 employees. Every active employee beyond that is charged at the plan's per-employee rate.",
      },
      {
        q: "Do you offer a free trial?",
        a: "Yes, on Core, Premium and Ultimate. Request a trial and our team sets up a workspace for you; there is no public sign-up.",
      },
      {
        q: "Who owns my data?",
        a: "You do. You can export your employee data to Excel at any time, and your workspace is kept separate from every other company's.",
      },
    ],
  },
];

/** The questions shown on the home page. */
export const homeFaqs: Faq[] = [
  faqGroups[0]!.items[0]!,
  faqGroups[1]!.items[0]!,
  faqGroups[2]!.items[0]!,
  faqGroups[3]!.items[0]!,
  faqGroups[0]!.items[2]!,
];
