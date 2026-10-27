import {
  Briefcase,
  Building2,
  IndianRupee,
  Rocket,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { Accent, MockupKey } from "./types";

export type Solution = {
  slug: string;
  name: string;
  /** Menu label, e.g. "HR teams". */
  label: string;
  short: string;
  icon: LucideIcon;
  accent: Accent;
  menuGroup: "By role" | "By size";
  headline: string;
  intro: string;
  heroMockup: MockupKey;
  pains: { title: string; body: string }[];
  outcomes: { eyebrow: string; title: string; body: string; points: string[]; feature: string; mockup: MockupKey }[];
  month: { title: string; body: string }[];
  features: string[];
  seoDescription: string;
};

export const solutions: Solution[] = [
  {
    slug: "hr-teams",
    name: "AskMira for HR teams",
    label: "HR teams",
    short: "Spend the month on people, not on chasing data.",
    icon: UsersRound,
    accent: "red",
    menuGroup: "By role",
    headline: "Spend the month on people, not on chasing data",
    intro:
      "One record for every employee, attendance that is settled before payroll, and employees who can answer their own questions. HR gets its weeks back.",
    heroMockup: "dashboard",
    pains: [
      { title: "Data in five places", body: "Joiner details in one sheet, attendance in another, salaries in a third — and every report starts with reconciling them." },
      { title: "The month-end crunch", body: "Late regularisations, missed punches and last-minute leave land on HR the week payroll is due." },
      { title: "The same questions, every day", body: "Leave balances, payslips, policy clauses: answered by hand, one message at a time." },
    ],
    outcomes: [
      {
        eyebrow: "One record",
        title: "Change it once, right everywhere",
        body: "Payroll, attendance, approvals and the org chart all read the same employee record.",
        points: ["Excel import with row-by-row checks", "Profile changes by request and approval", "Every edit recorded"],
        feature: "employee-management",
        mockup: "profile",
      },
      {
        eyebrow: "A settled month",
        title: "Attendance that is finished before payroll starts",
        body: "Nightly recompute, regularisations as they happen, and a lock when the month is done.",
        points: ["Web, phone and biometric punch", "Shifts, overtime and comp-off", "Monthly lock for payroll"],
        feature: "attendance-leave",
        mockup: "attendance",
      },
      {
        eyebrow: "Self-service",
        title: "Questions answered before they reach you",
        body: "Employees see their own balances, payslips and documents, and ask policy questions in plain words.",
        points: ["Home page with everything due", "Policy answers with the source quoted", "Helpdesk for the rest"],
        feature: "self-service",
        mockup: "mira",
      },
    ],
    month: [
      { title: "Week 1", body: "New joiners imported or added through the wizard; onboarding tasks go to IT and managers automatically." },
      { title: "Weeks 2–3", body: "Leave and regularisations approved as they come in, often straight from email." },
      { title: "Week 4", body: "Review the period summary, lock attendance, and hand a settled month to payroll." },
      { title: "Any day", body: "Run a headcount or attrition report in a click instead of a day of spreadsheets." },
    ],
    features: ["employee-management", "attendance-leave", "self-service", "workflows", "documents", "analytics"],
    seoDescription:
      "How AskMira helps HR teams: one employee record, attendance settled before payroll, self-service answers and approvals that route themselves.",
  },
  {
    slug: "employees",
    name: "AskMira for employees",
    label: "Employees",
    short: "Your leave, pay and documents, without asking anyone.",
    icon: UserRound,
    accent: "marigold",
    menuGroup: "By role",
    headline: "Everything about your work life, in one place that makes sense",
    intro:
      "Punch in, check your leave, download a payslip, declare investments and say thank you to a colleague — from your phone, in a minute.",
    heroMockup: "mobile",
    pains: [
      { title: "Not knowing where you stand", body: "How much leave is left? Was that half day marked? Who do you even ask?" },
      { title: "Waiting for paperwork", body: "Payslips, salary certificates and letters that take a request and a reminder." },
      { title: "Good work going unseen", body: "Thank-yous lost in chat threads, and feedback only once a year." },
    ],
    outcomes: [
      {
        eyebrow: "Your day",
        title: "A home page that knows your day",
        body: "Your punch, your balance, your holidays and anything waiting for you, the moment you open it.",
        points: ["Punch in with one tap", "Leave balance and who's out", "Requests and their status"],
        feature: "self-service",
        mockup: "dashboard",
      },
      {
        eyebrow: "Your pay",
        title: "Pay and tax, explained",
        body: "Payslips every month, tax declarations and proofs, and loan or encashment requests.",
        points: ["Payslips to download", "Old or new tax regime declarations", "Proof uploads with status"],
        feature: "payroll",
        mockup: "payslip",
      },
      {
        eyebrow: "Your voice",
        title: "Be recognised, and be heard",
        body: "Shoutouts and awards in the company feed, plus surveys and an anonymous channel for concerns.",
        points: ["Give and receive shoutouts", "Reward points", "Anonymous Your Voice"],
        feature: "engagement",
        mockup: "engagement",
      },
    ],
    month: [
      { title: "Every morning", body: "Punch in from the browser or your phone, inside the office geofence." },
      { title: "When you need a day off", body: "Apply in a few taps; your manager can approve from the email." },
      { title: "Pay day", body: "Your payslip is ready to open and download." },
      { title: "Tax season", body: "Declare investments and upload proofs where your payslip lives." },
    ],
    features: ["self-service", "attendance-leave", "payroll", "engagement", "documents", "expenses"],
    seoDescription:
      "How AskMira helps employees: punch in, leave, payslips, tax declarations, documents and recognition from any phone.",
  },
  {
    slug: "managers",
    name: "AskMira for managers",
    label: "Managers",
    short: "Lead your team without the admin.",
    icon: Briefcase,
    accent: "blush",
    menuGroup: "By role",
    headline: "Lead your team, not a pile of approvals",
    intro:
      "Every approval in one inbox — or straight from the email — a live view of who is in, and reviews that build on goals and one-on-ones all year.",
    heroMockup: "workflow",
    pains: [
      { title: "Approvals everywhere", body: "Leave in one tool, expenses in another, attendance fixes in a chat message." },
      { title: "No view of the team today", body: "Who is in, who is on leave, who forgot to punch — found out too late." },
      { title: "Reviews from memory", body: "A year of work summarised the night before the deadline." },
    ],
    outcomes: [
      {
        eyebrow: "Approvals",
        title: "One inbox, or no inbox at all",
        body: "Everything waiting on you in one list, with Approve and Reject buttons in the email too.",
        points: ["Leave, attendance and expenses together", "Approve from email", "Reminders when something waits"],
        feature: "workflows",
        mockup: "workflow",
      },
      {
        eyebrow: "Your team",
        title: "Your team's day at a glance",
        body: "Attendance review for your reporting line, and who's out today on your home page.",
        points: ["Attendance review by person", "Regularisations to approve", "Team leave calendar"],
        feature: "attendance-leave",
        mockup: "leave",
      },
      {
        eyebrow: "Growth",
        title: "Reviews that write themselves",
        body: "Goals, one-on-one notes and feedback collected through the year, ready for the review.",
        points: ["Goals and check-ins", "One-on-ones with shared notes", "Calibration and increments"],
        feature: "performance",
        mockup: "goals",
      },
    ],
    month: [
      { title: "Monday", body: "Clear the approvals inbox in five minutes, or from email between meetings." },
      { title: "Mid-week", body: "One-on-ones with notes both of you can see next time." },
      { title: "Month end", body: "Check your team's attendance review before HR locks the month." },
      { title: "Review season", body: "Write reviews from a year of goals and feedback, not from memory." },
    ],
    features: ["workflows", "attendance-leave", "performance", "recruitment-onboarding", "analytics", "engagement"],
    seoDescription:
      "How AskMira helps managers: one approvals inbox with email approvals, team attendance, goals, one-on-ones and reviews.",
  },
  {
    slug: "finance-payroll",
    name: "AskMira for finance and payroll",
    label: "Finance & payroll",
    short: "Close payroll with numbers you can defend.",
    icon: IndianRupee,
    accent: "red",
    menuGroup: "By role",
    headline: "Close payroll with numbers you can defend",
    intro:
      "Payroll runs on locked attendance, statutory files come out of the run, and the bank file and journal entry are generated rather than typed.",
    heroMockup: "payroll",
    pains: [
      { title: "Inputs that keep moving", body: "An attendance change after payroll is computed means recomputing — or paying the wrong amount." },
      { title: "Filings by hand", body: "ECR files, challans and TDS returns rebuilt in spreadsheets every month or quarter." },
      { title: "Payroll and the books disagree", body: "Journal entries typed from the payroll register, and reconciled for weeks." },
    ],
    outcomes: [
      {
        eyebrow: "Control",
        title: "A run that cannot start on unsettled data",
        body: "Locked attendance, reviewed pay and double-pay guards before anything is approved.",
        points: ["Runs only on a locked period", "Salary holds that stay held", "Dated statutory rule sets"],
        feature: "payroll",
        mockup: "payroll",
      },
      {
        eyebrow: "Compliance",
        title: "Statutory files from the run itself",
        body: "PF, ESI, professional tax, LWF and TDS, with the files and returns they need.",
        points: ["EPFO ECR file", "24Q returns, challans and Form 16", "State-wise PT and LWF"],
        feature: "payroll",
        mockup: "statutory",
      },
      {
        eyebrow: "Close",
        title: "Bank file and journal, generated",
        body: "Pay through your bank's format and post to Tally or Zoho Books with your own ledger names.",
        points: ["HDFC, ICICI, SBI, Axis and Kotak", "Ledger mapping per payslip line", "Full and final settlements"],
        feature: "payroll",
        mockup: "bankfile",
      },
    ],
    month: [
      { title: "Before the run", body: "Attendance locked by HR; arrears, adjustments and loans in place." },
      { title: "The run", body: "Compute, review every employee's pay, approve." },
      { title: "Pay day", body: "Bank file uploaded, payslips published to employees." },
      { title: "After", body: "ECR, ESI, PT and TDS challans; the journal posted to your books." },
    ],
    features: ["payroll", "attendance-leave", "expenses", "analytics", "access-control", "workflows"],
    seoDescription:
      "How AskMira helps finance and payroll teams: payroll on locked attendance, statutory files, bank files and Tally/Zoho journals.",
  },
  {
    slug: "growing-businesses",
    name: "AskMira for growing businesses",
    label: "Growing businesses",
    short: "Grow past spreadsheets without an HR systems project.",
    icon: Rocket,
    accent: "marigold",
    menuGroup: "By size",
    headline: "Outgrow your spreadsheets, not your HR team",
    intro:
      "Bring your employee sheet in an afternoon, run compliant payroll from the first month, and switch on more modules only when you need them.",
    heroMockup: "import",
    pains: [
      { title: "Spreadsheets that broke at fifty people", body: "Version clashes, formulas nobody owns, and one person who knows how it all works." },
      { title: "Compliance worries", body: "PF, ESI, PT and TDS done by hand, with deadlines that do not move." },
      { title: "A first HR hire doing everything", body: "Payroll, joiners, letters and questions — with no time for the people part." },
    ],
    outcomes: [
      {
        eyebrow: "Start fast",
        title: "Your existing sheet is the starting point",
        body: "Import employees from Excel; AskMira checks every row and tells you exactly what to fix.",
        points: ["Row-by-row checks", "Download of rows not added", "One person at a time with the joiner wizard"],
        feature: "employee-management",
        mockup: "import",
      },
      {
        eyebrow: "Stay compliant",
        title: "Statutory payroll from month one",
        body: "PF, ESI, PT, LWF and TDS computed in the run, with the files ready to submit.",
        points: ["Payroll on locked attendance", "ECR, challans, 24Q and Form 16", "Bank files"],
        feature: "payroll",
        mockup: "statutory",
      },
      {
        eyebrow: "Grow into it",
        title: "Switch on what you need, when you need it",
        body: "Start with core HR, attendance and payroll; add hiring, performance and culture later.",
        points: ["Modules switched on per workspace", "Same record underneath", "Nothing to migrate later"],
        feature: "workflows",
        mockup: "dashboard",
      },
    ],
    month: [
      { title: "Day 1", body: "Your workspace and first admin are set up with you on the call." },
      { title: "Week 1", body: "Employees imported from Excel; leave and attendance policies set." },
      { title: "First month-end", body: "Attendance locked and your first payroll run in AskMira." },
      { title: "Later", body: "Hiring, performance and culture switched on as the team grows." },
    ],
    features: ["employee-management", "payroll", "attendance-leave", "self-service", "recruitment-onboarding", "documents"],
    seoDescription:
      "AskMira for growing Indian businesses: Excel import, statutory payroll from month one, and modules switched on as you grow.",
  },
  {
    slug: "enterprise",
    name: "AskMira for enterprises",
    label: "Enterprise",
    short: "Multi-entity HR with the controls your auditors expect.",
    icon: Building2,
    accent: "ink",
    menuGroup: "By size",
    headline: "Multi-entity HR with the controls your auditors expect",
    intro:
      "Several legal entities and locations in one workspace, single sign-on and provisioning, an audit log nobody can edit, and an API for the systems around you.",
    heroMockup: "access",
    pains: [
      { title: "Entities with their own rules", body: "Different PF codes, PT states and holiday calendars, run as separate islands." },
      { title: "IT and security reviews", body: "SSO, provisioning, access reviews and logs — required before any rollout." },
      { title: "Systems that must talk", body: "Finance, IT and identity tools that need people data the moment it changes." },
    ],
    outcomes: [
      {
        eyebrow: "Structure",
        title: "Entities, locations and positions in one place",
        body: "Each legal entity with its own registrations and each location with its own calendar.",
        points: ["Multiple legal entities", "Location-wise holidays and geofences", "Positions and org chart"],
        feature: "employee-management",
        mockup: "directory",
      },
      {
        eyebrow: "Control",
        title: "Identity and access your IT team will sign off",
        body: "OIDC single sign-on, SCIM provisioning, IP allowlists and an insert-only audit log.",
        points: ["SSO enforcement", "Two-step verification", "Operator access granted by you"],
        feature: "access-control",
        mockup: "audit",
      },
      {
        eyebrow: "Connect",
        title: "An API and webhooks for everything around you",
        body: "Scoped API keys and signed webhooks keep your other systems current.",
        points: ["Scoped, revocable API keys", "HMAC-signed webhooks with retries", "MCP for AI assistants"],
        feature: "workflows",
        mockup: "workflow",
      },
    ],
    month: [
      { title: "Security review", body: "SSO, SCIM, IP allowlists and audit log walked through with IT." },
      { title: "Pilot", body: "One entity or location live first, on the same workspace as the rest." },
      { title: "Roll-out", body: "Remaining entities added with their own registrations and calendars." },
      { title: "Run", body: "API and webhooks feeding finance and IT systems as people change." },
    ],
    features: ["access-control", "employee-management", "payroll", "workflows", "analytics", "documents"],
    seoDescription:
      "AskMira for enterprises: multiple legal entities, SSO and SCIM, IP allowlists, insert-only audit log, API and webhooks.",
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
