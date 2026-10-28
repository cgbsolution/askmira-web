import { SpotBox, SpotDashboard, SpotHeadset, SpotMira, SpotReceipt, SpotRecruit, SpotTrend, type SpotIcon } from "@/components/illustrations/spots";
import type { Accent } from "./types";

/*
 * The AskMira platform: the HRMS at the centre and the business apps around it.
 *
 * Every status here was checked on 2026-10-28 against source code:
 *   - AskMira:      C:\cgbcode\askmira (backend/app/services/products, positions, hiring, companion)
 *   - AnytimeHire:  Desktop\code-files\Inteview-Tool (app/routers/askmira.py and the rest)
 *   - Expense Genie: C:\cgbcode\expgenie (expenses-backend/routes/askmira.js and the rest)
 *   - CGB Helpdesk: E:\cgb-code\CGB-Helpdesk (the local copy has no AskMira endpoints; the
 *                   live link is verified from AskMira's side only)
 *   - ProcureFlow and Saleinx: only their public sign-in pages could be seen (no
 *     credentials were available), so nothing beyond their own public description
 *     is claimed, and every connection to them is "planned".
 * See website/docs/INTEGRATION_STATUS.md for the full matrix and remaining work.
 */

export type ConnectionStatus = "live" | "partial" | "available" | "planned";

export const CONNECTION_LABEL: Record<ConnectionStatus, string> = {
  live: "Live",
  partial: "Partly connected",
  available: "Not connected yet",
  planned: "Planned",
};

export const CONNECTION_HELP: Record<ConnectionStatus, string> = {
  live: "Built and working today, checked in both products' code.",
  partial: "Some of this works today; the rest is listed as remaining work.",
  available: "Both products have what is needed, but the link between them is not built yet.",
  planned: "On the roadmap. Not built.",
};

export type AppKey = "hrms" | "anytimehire" | "expense-genie" | "helpdesk" | "saleinx" | "procureflow" | "mira";

export type PlatformApp = {
  key: AppKey;
  name: string;
  /** What it is, in a few words. */
  kind: string;
  icon: SpotIcon;
  accent: Accent;
  summary: string;
  /** Capabilities seen in the product's own code (or, for login-only apps, its public description). */
  capabilities: string[];
  /** How it connects to the AskMira HRMS today. */
  connection: { status: ConnectionStatus; detail: string };
  /** Where a visitor reads more. */
  href: string;
  /** True when the product's code could not be inspected. */
  limitedEvidence?: boolean;
};

export const platformApps: PlatformApp[] = [
  {
    key: "hrms",
    name: "AskMira HRMS",
    kind: "People, time and payroll",
    icon: SpotDashboard,
    accent: "red",
    summary:
      "The core: one employee record for attendance, leave, Indian statutory payroll, performance, culture — and the department budgets that hiring is checked against.",
    capabilities: [
      "Employee records, onboarding and self-service",
      "Attendance, leave and statutory payroll",
      "Department headcount budgets: approved positions and cost for the financial year",
      "What-if position scenarios with cost projections",
      "Requisitions with a CTC range, routed through approval chains",
    ],
    connection: { status: "live", detail: "This is the platform the other apps connect to." },
    href: "/platform",
  },
  {
    key: "anytimehire",
    name: "AnytimeHire",
    kind: "AI recruitment and interviews",
    icon: SpotRecruit,
    accent: "marigold",
    summary:
      "Finds and interviews candidates at scale: resume-to-job matching, AI avatar interviews with proctoring, and rubric scoring a recruiter can check.",
    capabilities: [
      "Jobs by department, with a maximum CTC budget",
      "Resume database with parsing and resume-to-job matching",
      "AI avatar interviews, proctoring and coding assessments",
      "Rubric scoring with quotes; recruiters decide every outcome",
      "A talent agent that refreshes profiles, matches and invites",
    ],
    connection: {
      status: "live",
      detail:
        "One-click connect, single sign-on from AskMira, people sync, and Ask Mira lookups of jobs, candidates and interviews.",
    },
    href: "/connected-platform#anytimehire",
  },
  {
    key: "expense-genie",
    name: "Expense Genie",
    kind: "Expenses and reimbursements",
    icon: SpotReceipt,
    accent: "blush",
    summary:
      "Employees claim expenses in a chat, on the web or on their phone; rules and caps route each claim, and finance tracks reimbursement.",
    capabilities: [
      "Claims by chat, web or the mobile app, with receipts",
      "Approval rules and policy caps",
      "Categories with monthly budgets and budget-versus-actual",
      "Reimbursement and payment tracking",
      "Reports and an activity trail",
    ],
    connection: {
      status: "live",
      detail:
        "One-click connect, single sign-on, people sync, claims shown inside AskMira, and Ask Mira lookups of claims and totals.",
    },
    href: "/connected-platform#expense-genie",
  },
  {
    key: "helpdesk",
    name: "CGB Helpdesk",
    kind: "Tickets and IT assets",
    icon: SpotHeadset,
    accent: "ink",
    summary:
      "Internal support: tickets with priorities and SLA timers, assignment and reassignment, and an asset register linked to the tickets raised about each asset.",
    capabilities: [
      "Tickets with categories, priority and SLA response and resolution timers",
      "Assignment, reassignment and reopening, with a full conversation",
      "Asset register with assignments to people",
      "Tickets linked to the asset they are about",
      "One IT team serving several organisations",
    ],
    connection: {
      status: "live",
      detail:
        "People raise and reply to tickets from inside AskMira, see the assets they hold, and Ask Mira looks up tickets and assets.",
    },
    href: "/connected-platform#helpdesk",
  },
  {
    key: "saleinx",
    name: "Saleinx",
    kind: "Sales CRM",
    icon: SpotTrend,
    accent: "marigold",
    summary:
      "An operational CRM with built-in analytics, automation and team collaboration — where pipeline and forecast live.",
    capabilities: ["Operational CRM", "Built-in analytics", "Automation", "Team collaboration"],
    connection: {
      status: "planned",
      detail: "Not connected to AskMira yet. Forecast-driven budget and hiring planning is on the roadmap.",
    },
    href: "/connected-platform#saleinx",
    limitedEvidence: true,
  },
  {
    key: "procureflow",
    name: "ProcureFlow",
    kind: "Procure-to-pay and vendors",
    icon: SpotBox,
    accent: "blush",
    summary:
      "Multi-tenant procure-to-pay for Indian manufacturing, with a buyer portal for your team and a separate portal for suppliers.",
    capabilities: ["Procure-to-pay", "Buyer portal", "Supplier (vendor) portal", "Multi-tenant"],
    connection: {
      status: "planned",
      detail: "Not connected to AskMira yet. Purchases against department budgets and asset hand-over are on the roadmap.",
    },
    href: "/connected-platform#procureflow",
    limitedEvidence: true,
  },
  {
    key: "mira",
    name: "Ask Mira",
    kind: "AI companion",
    icon: SpotMira,
    accent: "marigold",
    summary:
      "Answers questions across AskMira and the connected apps — always as the person asking, with their permissions, and never approving anything on its own.",
    capabilities: [
      "Policies, people, leave, attendance and workforce reports",
      "AnytimeHire jobs, candidates and interviews",
      "Expense Genie claims and totals",
      "CGB Helpdesk tickets and assets",
    ],
    connection: {
      status: "partial",
      detail: "Works across AskMira, AnytimeHire, Expense Genie and CGB Helpdesk today; budgets, Saleinx and ProcureFlow are planned.",
    },
    href: "/ai",
  },
];

export const appByKey = (key: AppKey) => platformApps.find((a) => a.key === key)!;

/* ── The sales-to-budget-to-hiring journey ─────────────────────────────── */

export type JourneyStep = {
  id: string;
  title: string;
  app: AppKey;
  /** What happens, in one line. */
  summary: string;
  /** The running example, one company through the whole journey. */
  example: string;
  status: ConnectionStatus;
  /** What works today, and what is still to build, for this step. */
  today: string;
  next?: string;
};

/** One sample company, followed end to end: a regional sales team that needs two more people. */
export const journey: JourneyStep[] = [
  {
    id: "sales",
    title: "Sales",
    app: "saleinx",
    summary: "The CRM tracks opportunities, deals and projected revenue.",
    example: "Sales West's weighted pipeline for the quarter is running 28% above plan.",
    status: "planned",
    today: "Saleinx holds the pipeline and forecast.",
    next: "Send forecast figures to AskMira so budget owners see them next to the budget.",
  },
  {
    id: "budget",
    title: "Budget planning",
    app: "hrms",
    summary: "Finance sets each department's approved headcount and cost for the year.",
    example: "Sales West is approved for 18 positions and ₹3.80 Cr in FY 2026-27; 16 seats are filled.",
    status: "live",
    today: "Department headcount budgets — positions and cost per financial year — are in AskMira.",
    next: "Show the CRM forecast beside the budget (needs the Saleinx link).",
  },
  {
    id: "workforce",
    title: "Workforce planning",
    app: "hrms",
    summary: "The manager models the extra people before asking for them.",
    example: "A what-if scenario adds two Account Executives from 1 December: about ₹6.4 L this year.",
    status: "live",
    today: "Position scenarios project headcount and cost without touching live positions.",
  },
  {
    id: "approval",
    title: "Hiring approval",
    app: "hrms",
    summary: "A requisition carries the role, department, CTC range and the reason.",
    example: "Requisition: 2 × Account Executive, CTC ₹8–11 L, citing the Q4 pipeline. It routes to HR, then Finance.",
    status: "live",
    today: "Requisitions with a CTC range and approval chains; new positions are refused if they exceed the approved budget.",
  },
  {
    id: "recruitment",
    title: "Recruitment",
    app: "anytimehire",
    summary: "The approved role is recruited for, with AI screening and interviews.",
    example: "140 applicants matched to the job, 12 AI interviews scored, two offers accepted.",
    status: "partial",
    today: "AnytimeHire is linked to AskMira: single sign-on, people sync and Ask Mira lookups.",
    next: "Open the AnytimeHire job automatically when the AskMira requisition is approved.",
  },
  {
    id: "onboarding",
    title: "Onboarding",
    app: "hrms",
    summary: "The selected candidate becomes an employee record with a joiner plan.",
    example: "Both joiners get a start date, document checklist and first-week tasks for HR, IT and the manager.",
    status: "partial",
    today: "Candidates hired in AskMira's own hiring module become employees with a joiner plan.",
    next: "Hand a candidate marked hired in AnytimeHire to AskMira onboarding.",
  },
  {
    id: "procurement",
    title: "Procurement",
    app: "procureflow",
    summary: "The manager requests laptops and software against the approved budget.",
    example: "Two laptops and two CRM seats are requested; supplier quotes come back through the vendor portal.",
    status: "planned",
    today: "ProcureFlow runs purchasing with buyer and supplier portals.",
    next: "Check purchase requests against AskMira department budgets.",
  },
  {
    id: "assets",
    title: "Asset allocation",
    app: "helpdesk",
    summary: "Purchased equipment is registered and assigned to the new employees.",
    example: "Both laptops are registered and assigned before day one.",
    status: "partial",
    today: "The CGB Helpdesk asset register is linked, so people see the assets they hold inside AskMira.",
    next: "Register delivered ProcureFlow purchases as assets automatically.",
  },
  {
    id: "expenses",
    title: "Expenses",
    app: "expense-genie",
    summary: "Employees claim expenses and policies route them for approval.",
    example: "A client-visit taxi is claimed in chat with a receipt photo; the policy cap is applied.",
    status: "live",
    today: "Expense Genie is linked: single sign-on, people sync, claims inside AskMira and Ask Mira lookups.",
    next: "Pay approved claims through AskMira payroll.",
  },
  {
    id: "helpdesk",
    title: "Support",
    app: "helpdesk",
    summary: "Employees raise tickets for IT, HR, equipment and operations.",
    example: "A VPN access ticket in week one is resolved inside its SLA.",
    status: "live",
    today: "Tickets are raised and answered from inside AskMira, in the helpdesk.",
  },
  {
    id: "reporting",
    title: "Management reporting",
    app: "mira",
    summary: "Managers review budget, hiring, spend and support in one place.",
    example: "The manager asks Mira what the two hires cost against what is left this year.",
    status: "partial",
    today: "Workforce reports in AskMira; Ask Mira answers across hiring, expenses and helpdesk.",
    next: "Budget, procurement and sales figures in the same view.",
  },
];

/* ── What Ask Mira answers across the platform ─────────────────────────── */

export type MiraQuestion = {
  q: string;
  status: ConnectionStatus;
  /** Which app answers it, and how. */
  how: string;
};

export const miraQuestions: MiraQuestion[] = [
  {
    q: "Summarise our current recruitment pipeline.",
    status: "live",
    how: "Jobs, candidates by stage and upcoming interviews from AnytimeHire (or AskMira's own hiring module).",
  },
  {
    q: "Summarise this month's employee expense submissions.",
    status: "live",
    how: "Totals by status and category from Expense Genie — company-wide for HR, approvals for managers.",
  },
  {
    q: "Show the open support tickets affecting our team.",
    status: "partial",
    how: "Open tickets from CGB Helpdesk for you, your queue or the company; a by-team filter is still to come.",
  },
  {
    q: "Which employees still need equipment assigned?",
    status: "partial",
    how: "Mira lists who holds which asset in CGB Helpdesk; matching that against new joiners is still to come.",
  },
  {
    q: "Can our department afford to hire two more people?",
    status: "planned",
    how: "AskMira already checks new positions against the department budget; Mira cannot read budgets yet.",
  },
  {
    q: "How much of our budget remains?",
    status: "planned",
    how: "Needs a budget lookup for Mira, and spend from Expense Genie and ProcureFlow in one place.",
  },
  {
    q: "Which purchase requests are awaiting approval?",
    status: "planned",
    how: "Needs the ProcureFlow connection.",
  },
  {
    q: "How could the latest sales forecast affect our hiring plans?",
    status: "planned",
    how: "Needs the Saleinx connection.",
  },
];

/* ── The connection matrix ─────────────────────────────────────────────── */

export type Connection = {
  from: string;
  to: string;
  status: ConnectionStatus;
  what: string;
  remaining?: string;
};

export const connections: Connection[] = [
  {
    from: "AskMira",
    to: "AnytimeHire",
    status: "live",
    what: "One-click connect with a per-workspace secret, single sign-on, people sync, Ask Mira lookups.",
  },
  {
    from: "AskMira requisition",
    to: "AnytimeHire job",
    status: "available",
    what: "Both sides have the records and APIs.",
    remaining: "Create or update the AnytimeHire job when a requisition is approved.",
  },
  {
    from: "AnytimeHire hire",
    to: "AskMira joiner",
    status: "available",
    what: "AnytimeHire marks candidates hired; AskMira onboarding can create joiners.",
    remaining: "Hand the hired candidate to AskMira onboarding.",
  },
  {
    from: "AskMira",
    to: "Expense Genie",
    status: "live",
    what: "One-click connect, single sign-on, people sync, claims inside AskMira, Ask Mira lookups.",
  },
  {
    from: "Expense Genie payout",
    to: "AskMira payroll",
    status: "available",
    what: "Expense Genie records payments; AskMira pays salary reimbursements.",
    remaining: "Send approved claims to the payroll run.",
  },
  {
    from: "Expense Genie budgets",
    to: "AskMira department budgets",
    status: "planned",
    what: "Expense Genie budgets are per category, not per department.",
    remaining: "Department budgets in Expense Genie, or spend reported to AskMira by department.",
  },
  {
    from: "AskMira",
    to: "CGB Helpdesk",
    status: "live",
    what: "Raise and reply to tickets inside AskMira, asset register, Ask Mira lookups.",
  },
  {
    from: "Saleinx forecast",
    to: "AskMira budgets",
    status: "planned",
    what: "Not connected.",
    remaining: "A forecast feed from Saleinx and a place to show it beside the budget.",
  },
  {
    from: "ProcureFlow",
    to: "AskMira budgets and approvals",
    status: "planned",
    what: "Not connected.",
    remaining: "Budget checks on purchase requests, and people and departments from AskMira.",
  },
  {
    from: "ProcureFlow purchase",
    to: "Asset register",
    status: "planned",
    what: "Not connected.",
    remaining: "Register delivered equipment as assets and assign them to the requester's joiner.",
  },
  {
    from: "Ask Mira",
    to: "Saleinx, ProcureFlow, budgets",
    status: "planned",
    what: "Not connected.",
    remaining: "Read-only lookups for each, under the asker's permissions.",
  },
];
