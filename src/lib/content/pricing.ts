/*
 * Plans and what each one includes. The plan cards and the comparison table
 * both read from here, so a feature only ever has to be placed once.
 * List only what the product ships.
 */

export type PlanId = "free" | "core" | "premium" | "ultimate";

export type Plan = {
  id: PlanId;
  /** The small label above the plan name. */
  segment: string;
  name: string;
  tagline: string;
  /** Monthly price in rupees. */
  price: number;
  /** "/forever" or "/month". */
  period: string;
  includedEmployees: number;
  /** Rupees per additional employee per month; null when the plan has no add-on seats. */
  perAdditional: number | null;
  /** The small line under the employee limit. */
  note: string;
  badge?: string;
  /** The highlighted card. */
  featured?: boolean;
  cta: string;
  /** "Everything in Core, plus" — null on the first plan. */
  inherits: string | null;
  highlights: string[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    segment: "Small teams",
    name: "Free",
    tagline: "Keep employee records, letters and payslips in one place from day one.",
    price: 0,
    period: "/forever",
    includedEmployees: 20,
    perAdditional: null,
    note: "No card needed",
    badge: "Free",
    cta: "Get started",
    inherits: null,
    highlights: [
      "Employee records and documents",
      "Directory and org chart",
      "Letters on your own letterhead",
      "Payslip generation",
    ],
  },
  {
    id: "core",
    segment: "Growing teams",
    name: "Core",
    tagline: "Run everyday HR, attendance and statutory payroll as your company grows.",
    price: 4999,
    period: "/month",
    includedEmployees: 50,
    perAdditional: 99,
    note: "Billed quarterly",
    cta: "Request a free trial",
    inherits: "Free",
    highlights: [
      "Onboarding and joiner checklists",
      "Core HR, exits and full and final",
      "Attendance, shifts and leave",
      "Payroll with PF, ESI, PT, LWF and TDS",
      "Dashboards and reports",
      "Helpdesk",
      "Mobile app and self-service",
      "Multiple companies (legal entities)",
    ],
  },
  {
    id: "premium",
    segment: "Best value",
    name: "Premium",
    tagline: "The best price-to-value plan for teams that travel, spend and work on projects.",
    price: 5999,
    period: "/month",
    includedEmployees: 50,
    perAdditional: 119,
    note: "Billed quarterly",
    badge: "Most popular",
    featured: true,
    cta: "Request a free trial",
    inherits: "Core",
    highlights: [
      "Travel, expense and reimbursement",
      "Geo-fenced punch",
      "Timesheets, overtime and projects",
      "Asset management",
    ],
  },
  {
    id: "ultimate",
    segment: "Complete suite",
    name: "Ultimate",
    tagline: "Everything AskMiraa does — from hiring to performance, culture and Ask Miraa.",
    price: 6999,
    period: "/month",
    includedEmployees: 50,
    perAdditional: 139,
    note: "Billed quarterly",
    cta: "Request a free trial",
    inherits: "Premium",
    highlights: [
      "Performance: goals, reviews, 1:1s and PIPs",
      "Surveys, polls and announcements",
      "Culture: shoutouts, awards and clubs",
      "Hiring and careers site",
      "Learning and rewards",
      "Ask Miraa, the AI companion",
    ],
  },
];

export const PLAN_ORDER: PlanId[] = PLANS.map((p) => p.id);

/** A row of the comparison table, included from `from` onwards. */
export type ComparisonRow = { feature: string; from: PlanId };
export type ComparisonGroup = { title: string; rows: ComparisonRow[] };

export const COMPARISON: ComparisonGroup[] = [
  {
    title: "Employee data",
    rows: [
      { feature: "Employee records, documents and ID details", from: "free" },
      { feature: "Directory and org chart", from: "free" },
      { feature: "Letters on your letterhead, with ready-made templates", from: "free" },
      { feature: "Excel import of your existing employees", from: "free" },
    ],
  },
  {
    title: "Onboarding and core HR",
    rows: [
      { feature: "Add employees one by one or from Excel", from: "core" },
      { feature: "New joiners and onboarding checklists", from: "core" },
      { feature: "Positions, transfers and change requests", from: "core" },
      { feature: "Exits, clearance and full and final", from: "core" },
    ],
  },
  {
    title: "Attendance and leave",
    rows: [
      { feature: "Web and mobile punch, kiosk punch", from: "core" },
      { feature: "Shifts, alternate Saturdays and holidays", from: "core" },
      { feature: "Leave types, balances and approvals", from: "core" },
      { feature: "Comp-off and attendance corrections", from: "core" },
      { feature: "Geo-fenced punch with location", from: "premium" },
      { feature: "Overtime and timesheets", from: "premium" },
    ],
  },
  {
    title: "Payroll",
    rows: [
      { feature: "Payslip generation", from: "free" },
      { feature: "Salary master and salary structures", from: "core" },
      { feature: "PF, ESI, PT, LWF and TDS", from: "core" },
      { feature: "PF ECR, bank files and statutory filings", from: "core" },
      { feature: "Arrears, loans, gratuity and tax proofs", from: "core" },
      { feature: "Payslips by email and bulk download", from: "core" },
    ],
  },
  {
    title: "Self-service and support",
    rows: [
      { feature: "Employee self-service in any browser", from: "core" },
      { feature: "Mobile app for employees and managers", from: "core" },
      { feature: "Approvals by email", from: "core" },
      { feature: "Helpdesk for employee queries", from: "core" },
      { feature: "Dashboards and the report library", from: "core" },
    ],
  },
  {
    title: "Companies and projects",
    rows: [
      { feature: "Multiple companies (legal entities) with their own logo", from: "core" },
      { feature: "Internal and client projects", from: "premium" },
      { feature: "Asset inventory and requests", from: "premium" },
    ],
  },
  {
    title: "Travel and expense",
    rows: [
      { feature: "Travel requests", from: "premium" },
      { feature: "Expense claims and reimbursement through payroll", from: "premium" },
      { feature: "Expense policies and GST details", from: "premium" },
    ],
  },
  {
    title: "Performance and culture",
    rows: [
      { feature: "Goals, review cycles and calibration", from: "ultimate" },
      { feature: "1:1s, feedback and PIPs", from: "ultimate" },
      { feature: "Surveys, polls and announcements", from: "ultimate" },
      { feature: "Shoutouts, awards and clubs", from: "ultimate" },
      { feature: "Learning and reward points", from: "ultimate" },
    ],
  },
  {
    title: "Hiring and AI",
    rows: [
      { feature: "Requisitions, pipeline, interviews and offers", from: "ultimate" },
      { feature: "Careers site and job boards", from: "ultimate" },
      { feature: "Ask Miraa, the AI companion", from: "ultimate" },
    ],
  },
  {
    title: "Security, in every plan",
    rows: [
      { feature: "Two-step verification and single sign-on", from: "free" },
      { feature: "Role-based access and the insert-only audit log", from: "free" },
      { feature: "Help guides on every page", from: "free" },
    ],
  },
];

/** True when a row is included in a plan. */
export function includedIn(row: ComparisonRow, plan: PlanId): boolean {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf(row.from);
}

/** For companies the four plans do not fit. */
export const CUSTOM_PLANS = [
  {
    name: "For start-ups",
    body: "Early-stage company that wants payroll and HR right from the first hire? We will put together a plan for your stage.",
  },
  {
    name: "For large and blue-collar workforces",
    body: "Hundreds of employees, plants and shifts, kiosk punch at the gate? We quote a plan around your headcount and sites.",
  },
];

export const formatAmount = (n: number) => n.toLocaleString("en-IN");
export const formatRupees = (n: number) => `₹${formatAmount(n)}`;

/** Short facts under the plan cards — every one true in every plan. */
export const PLAN_FACTS = [
  { title: "Help on every page", body: "A short guide on every screen, for HR and employees" },
  { title: "Set up with our team", body: "We create your workspace and import your people" },
  { title: "Secure by default", body: "Two-step sign-in, roles and an insert-only audit log" },
  { title: "Your data stays yours", body: "Export your employee records to Excel any time" },
];
