import { SpotBox, SpotDashboard, SpotHeadset, SpotMira, SpotReceipt, SpotRecruit, SpotTrend, type SpotIcon } from "@/components/illustrations/spots";
import type { Accent } from "./types";

/*
 * The AskMiraa platform: the HRMS at the centre and the business apps around it.
 *
 * Every connection here is built and was checked on 2026-11-05 against each
 * product's own code:
 *   - AskMiraa:      C:\cgbcode\askmira (backend/app/services/products, hiring/linked_jobs,
 *                   onboarding/linked_hires, payroll/linked_expenses, positions/spend,
 *                   assets/received, companion)
 *   - AnytimeHire:  app/routers/askmira.py (job.open, hires)
 *   - Expense Genie: expenses-backend/routes/askmira.js (payable, claims.paid)
 *   - CGB Helpdesk: src/lib/askmira (tickets scope team, holdings, asset.create)
 *   - Saleinx and ProcureFlow: their src/lib/askmira and integrations/askmira modules
 * See website/docs/INTEGRATION_STATUS.md for the full matrix.
 */

export type ConnectionStatus = "live";

export const CONNECTION_LABEL: Record<ConnectionStatus, string> = {
  live: "Live",
};

export const CONNECTION_HELP: Record<ConnectionStatus, string> = {
  live: "Built and working, in both products.",
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
  /** Capabilities seen in the product's own code. */
  capabilities: string[];
  /** How it connects to the AskMiraa HRMS. */
  connection: { status: ConnectionStatus; detail: string };
  /** Where a visitor reads more. */
  href: string;
};

export const platformApps: PlatformApp[] = [
  {
    key: "hrms",
    name: "AskMiraa HRMS",
    kind: "People, time and payroll",
    icon: SpotDashboard,
    accent: "red",
    summary:
      "The core: one employee record for attendance, leave, Indian statutory payroll, performance and culture — and the department budgets that hiring, spend and purchasing are seen against.",
    capabilities: [
      "Employee records, onboarding and self-service",
      "Attendance, leave and statutory payroll",
      "Department budgets: approved positions and cost, with payroll, expenses and purchasing beside them",
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
        "One-click connect, single sign-on and people sync. An approved AskMiraa requisition opens its job here; a hired candidate comes back to AskMiraa to add as a joiner.",
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
        "One-click connect, single sign-on, people sync and claims inside AskMiraa. Approved claims are paid with salary in AskMiraa payroll and marked paid here.",
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
        "People raise and reply to tickets inside AskMiraa and see the assets they hold. Equipment received in ProcureFlow is added to the register from AskMiraa.",
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
      "An operational CRM with built-in analytics and automation — where leads, deals, the pipeline and each Won's approval live.",
    capabilities: [
      "Leads and deals by stage, with each stage's own rules",
      "A manager's approval on every Won",
      "Pipeline analytics by stage",
      "Roles for reps, managers and viewers",
    ],
    connection: {
      status: "live",
      detail:
        "One-click connect, single sign-on and people sync with each person's Saleinx role. Deals, the pipeline and Wons to approve open inside AskMiraa, and the pipeline sits beside department budgets.",
    },
    href: "/connected-platform#saleinx",
  },
  {
    key: "procureflow",
    name: "ProcureFlow",
    kind: "Procure-to-pay and vendors",
    icon: SpotBox,
    accent: "blush",
    summary:
      "Multi-tenant procure-to-pay for Indian manufacturing, with a buyer portal for your team and a separate portal for suppliers.",
    capabilities: [
      "Requisitions, approvals and purchase orders",
      "Goods receipts and invoices",
      "Cost-centre budgets: allocated, committed, consumed and available",
      "Buyer portal and supplier (vendor) portal",
    ],
    connection: {
      status: "live",
      detail:
        "One-click connect, single sign-on and people sync with each person's ProcureFlow role. Approvals, requisitions, orders, invoices and budgets open inside AskMiraa; received equipment goes to the asset register.",
    },
    href: "/connected-platform#procureflow",
  },
  {
    key: "mira",
    name: "Ask Miraa",
    kind: "AI companion",
    icon: SpotMira,
    accent: "marigold",
    summary:
      "Answers questions across AskMiraa and the connected apps, and does what the person asks once they confirm — always as them, with their permissions.",
    capabilities: [
      "Policies, people, leave, attendance, payroll and workforce reports",
      "Department budgets: what is left, and whether more hires fit",
      "Leave, attendance requests and approvals, on your confirm",
      "AnytimeHire jobs, candidates and interviews; Expense Genie claims and totals",
      "CGB Helpdesk tickets and assets; Saleinx deals; ProcureFlow approvals",
    ],
    connection: {
      status: "live",
      detail: "Works across AskMiraa, AnytimeHire, Expense Genie, CGB Helpdesk, Saleinx and ProcureFlow.",
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
  /** How it works across the apps. */
  today: string;
};

/** One sample company, followed end to end: a regional sales team that needs two more people. */
export const journey: JourneyStep[] = [
  {
    id: "sales",
    title: "Sales",
    app: "saleinx",
    summary: "Deals move through their stages in the CRM, and a manager approves each Won.",
    example: "Sales West's pipeline for the quarter is running 28% above plan, and a new order is Won.",
    status: "live",
    today: "Saleinx's own rules decide each stage. Ask Miraa can add a lead from a note or move a deal, as the rep, once they confirm.",
  },
  {
    id: "order",
    title: "Booking the order",
    app: "mira",
    summary: "The signed order opens its positions and writes its prospective P&L.",
    example: "Ask Miraa checks the Won is approved and the PO matches the team's billing, then opens two positions.",
    status: "live",
    today: "Positions open in AnytimeHire and the forecast is written in AskMiraa, step by step; a step that fails undoes the ones before it.",
  },
  {
    id: "budget",
    title: "Budget planning",
    app: "hrms",
    summary: "Finance sets each department's approved headcount and cost for the year.",
    example: "Sales West is approved for 18 positions and ₹3.80 Cr in FY 2026-27; 16 seats are filled.",
    status: "live",
    today: "Payroll paid, expenses, ProcureFlow purchasing and the Saleinx pipeline sit beside each department's budget, each from the app that owns it.",
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
    today: "New positions are refused if they exceed the approved budget. The last approval opens the job in AnytimeHire.",
  },
  {
    id: "recruitment",
    title: "Recruitment",
    app: "anytimehire",
    summary: "The approved role is recruited for, with AI screening and interviews.",
    example: "140 applicants matched to the job, 12 AI interviews scored, two offers accepted.",
    status: "live",
    today: "Recruiters work in AnytimeHire, signed in from AskMiraa, with the people AskMiraa sends it.",
  },
  {
    id: "onboarding",
    title: "Onboarding",
    app: "hrms",
    summary: "The selected candidate becomes an employee record with a joiner plan.",
    example: "Both joiners get a start date, document checklist and first-week tasks for HR, IT and the manager.",
    status: "live",
    today: "Candidates marked Hired in AnytimeHire are listed under Add employees, with their details filled in.",
  },
  {
    id: "procurement",
    title: "Procurement",
    app: "procureflow",
    summary: "The manager requests laptops and software against the cost-centre budget.",
    example: "Two laptops and two CRM seats are requested and approved; supplier quotes come back through the vendor portal.",
    status: "live",
    today: "ProcureFlow checks each request against its cost-centre budget. Ask Miraa approves what waits on you, once you confirm.",
  },
  {
    id: "assets",
    title: "Asset allocation",
    app: "helpdesk",
    summary: "Purchased equipment is registered and assigned to the new employees.",
    example: "Both laptops are registered from the goods receipt and assigned before day one.",
    status: "live",
    today: "Received units go to the asset register — CGB Helpdesk's, or AskMiraa's — once each, with serial, cost and vendor.",
  },
  {
    id: "expenses",
    title: "Expenses",
    app: "expense-genie",
    summary: "Employees claim expenses and policies route them for approval.",
    example: "A client-visit taxi is claimed in chat with a receipt photo; the policy cap is applied.",
    status: "live",
    today: "Approved claims are paid with salary in AskMiraa payroll, untaxed, and marked paid in Expense Genie.",
  },
  {
    id: "helpdesk",
    title: "Support",
    app: "helpdesk",
    summary: "Employees raise tickets for IT, HR, equipment and operations.",
    example: "A VPN access ticket in week one is resolved inside its SLA.",
    status: "live",
    today: "Tickets are raised and answered from inside AskMiraa; managers see their team's in Ask Miraa.",
  },
  {
    id: "reporting",
    title: "Management reporting",
    app: "mira",
    summary: "Managers review budget, hiring, spend and support in one place.",
    example: "HR asks Miraa whether Sales West can afford the two hires, and what is left this year.",
    status: "live",
    today: "Workforce reports in AskMiraa; Ask Miraa answers across budgets, hiring, expenses, purchasing, sales and support.",
  },
];

/* ── What Ask Miraa answers across the platform ─────────────────────────── */

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
    how: "Jobs, candidates by stage and upcoming interviews from AnytimeHire (or AskMiraa's own hiring module).",
  },
  {
    q: "Summarise this month's employee expense submissions.",
    status: "live",
    how: "Totals by status and category from Expense Genie — company-wide for HR, approvals for managers.",
  },
  {
    q: "Show the open support tickets affecting our team.",
    status: "live",
    how: "Tickets raised by the people who report to you, from CGB Helpdesk.",
  },
  {
    q: "Which employees still need equipment assigned?",
    status: "live",
    how: "This month's joiners and what each holds in the asset register — CGB Helpdesk's, or AskMiraa's.",
  },
  {
    q: "Can our department afford to hire two more people?",
    status: "live",
    how: "The department's headcount budget: positions and cost left, and whether the hires at that CTC fit.",
  },
  {
    q: "How much of our budget remains?",
    status: "live",
    how: "Positions and people cost left, with payroll paid, expenses and ProcureFlow purchasing for the year beside it.",
  },
  {
    q: "Which purchase requests are awaiting approval?",
    status: "live",
    how: "What waits on you in ProcureFlow — approve or reject it in the chat, once you confirm.",
  },
  {
    q: "How could the latest sales forecast affect our hiring plans?",
    status: "live",
    how: "The Saleinx pipeline beside the department's headcount budget; a won order opens its positions when you book it.",
  },
];

/* ── The connection matrix ─────────────────────────────────────────────── */

export type Connection = {
  from: string;
  to: string;
  status: ConnectionStatus;
  what: string;
};

export const connections: Connection[] = [
  {
    from: "AskMiraa",
    to: "AnytimeHire",
    status: "live",
    what: "One-click connect with a per-workspace secret, single sign-on, people sync, Ask Miraa lookups.",
  },
  {
    from: "AskMiraa requisition",
    to: "AnytimeHire job",
    status: "live",
    what: "The last approval opens the job in AnytimeHire, once; HR can try again if AnytimeHire refuses.",
  },
  {
    from: "AnytimeHire hire",
    to: "AskMiraa joiner",
    status: "live",
    what: "Candidates marked Hired are listed under Add employees, with name, email, phone, job and department filled in.",
  },
  {
    from: "Saleinx order",
    to: "AnytimeHire and the P&L",
    status: "live",
    what: "Ask Miraa books a won, approved order: its positions open in AnytimeHire and its prospective P&L in AskMiraa.",
  },
  {
    from: "AskMiraa",
    to: "Expense Genie",
    status: "live",
    what: "One-click connect, single sign-on, people sync, claims inside AskMiraa, Ask Miraa lookups.",
  },
  {
    from: "Expense Genie claims",
    to: "AskMiraa payroll",
    status: "live",
    what: "Approved claims are paid with salary, untaxed, once each, and marked paid in Expense Genie.",
  },
  {
    from: "Expense Genie spend",
    to: "AskMiraa department budgets",
    status: "live",
    what: "Approved claims added up by each submitter's department, beside the budget.",
  },
  {
    from: "AskMiraa",
    to: "CGB Helpdesk",
    status: "live",
    what: "Raise and reply to tickets inside AskMiraa, the asset register, Ask Miraa lookups and ticket actions.",
  },
  {
    from: "AskMiraa",
    to: "Saleinx",
    status: "live",
    what: "One-click connect, single sign-on, people sync with Saleinx's own roles; deals, pipeline and Wons to approve inside AskMiraa.",
  },
  {
    from: "AskMiraa",
    to: "ProcureFlow",
    status: "live",
    what: "One-click connect, single sign-on, people sync with ProcureFlow's own roles; approvals, orders, invoices and budgets inside AskMiraa.",
  },
  {
    from: "ProcureFlow budgets",
    to: "AskMiraa department budgets",
    status: "live",
    what: "Each cost centre's allocated, committed and available amounts, beside the department of the same name.",
  },
  {
    from: "ProcureFlow receipt",
    to: "Asset register",
    status: "live",
    what: "Received units become assets — in CGB Helpdesk's register or AskMiraa's — once each, ready to hand over.",
  },
  {
    from: "Ask Miraa",
    to: "Every connected app",
    status: "live",
    what: "Lookups and confirmed actions in each app, under the asker's own permissions there.",
  },
];
