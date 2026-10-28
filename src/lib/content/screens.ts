import type { StaticImageData } from "next/image";

import amAttendance from "@/assets/screens/am-attendance.jpg";
import amBudget from "@/assets/screens/am-budget.jpg";
import amHiring from "@/assets/screens/am-hiring.jpg";
import amHome from "@/assets/screens/am-home.jpg";
import amMira from "@/assets/screens/am-mira.jpg";
import amOrgchart from "@/assets/screens/am-orgchart.jpg";
import amPayroll from "@/assets/screens/am-payroll.jpg";
import amOnboarding from "@/assets/screens/am-onboarding.jpg";
import amReports from "@/assets/screens/am-reports.jpg";
import amScenarios from "@/assets/screens/am-scenarios.jpg";
import athDash from "@/assets/screens/ath-dash.jpg";
import athJobs from "@/assets/screens/ath-jobs.jpg";
import athPipeline from "@/assets/screens/ath-pipeline.jpg";
import egApprovals from "@/assets/screens/eg-approvals.jpg";
import egDash from "@/assets/screens/eg-dash.jpg";
import egReports from "@/assets/screens/eg-reports.jpg";
import hdAssets from "@/assets/screens/hd-assets.jpg";
import hdDash from "@/assets/screens/hd-dash.jpg";
import hdTickets from "@/assets/screens/hd-tickets.jpg";
import pfLogin from "@/assets/screens/pf-login.jpg";
import sxLogin from "@/assets/screens/sx-login.jpg";

import amDirectoryImg from "@/assets/screens/am-directory.jpg";
import amProfileImg from "@/assets/screens/am-profile.jpg";
import amImportImg from "@/assets/screens/am-import.jpg";
import amDevicesImg from "@/assets/screens/am-devices.jpg";
import amLeaveImg from "@/assets/screens/am-leave.jpg";
import amPayrunImg from "@/assets/screens/am-payrun.jpg";
import amStatutoryImg from "@/assets/screens/am-statutory.jpg";
import amPayslipImg from "@/assets/screens/am-payslip.jpg";
import amBankfileImg from "@/assets/screens/am-bankfile.jpg";
import amCandidatesImg from "@/assets/screens/am-candidates.jpg";
import amPerformanceImg from "@/assets/screens/am-performance.jpg";
import amGoalsImg from "@/assets/screens/am-goals.jpg";
import amExpensesImg from "@/assets/screens/am-expenses.jpg";
import amDocsImg from "@/assets/screens/am-docs.jpg";
import amApprovalsImg from "@/assets/screens/am-approvals.jpg";
import amSurveysImg from "@/assets/screens/am-surveys.jpg";
import amUsersImg from "@/assets/screens/am-users.jpg";
import amComplianceImg from "@/assets/screens/am-compliance.jpg";
import amCultureImg from "@/assets/screens/am-culture.jpg";
import amHiringAnalyticsImg from "@/assets/screens/am-hiring-analytics.jpg";
import amPhoneImg from "@/assets/screens/am-phone-home.jpg";
import { appByKey, type AppKey, type ConnectionStatus } from "./ecosystem";
import type { MockupKey } from "./types";

/*
 * Real screenshots of each product, captured from demo workspaces that hold
 * sample data only (made-up people and companies). Nothing here is a customer's
 * data, and nothing is drawn: each image is the app as it renders today.
 */

export type ScreenApp = Exclude<AppKey, "mira">;

export type Hotspot = {
  /** Position over the screenshot, in % of its width and height. */
  x: number;
  y: number;
  title: string;
  body: string;
};

export type Screen = {
  id: string;
  app: ScreenApp;
  /** Short page name, shown in the window's address bar and on the screen picker. */
  title: string;
  alt: string;
  image: StaticImageData;
  theme?: "light" | "dark";
  hotspots?: Hotspot[];
};

export const APPS: Record<ScreenApp, { name: string; role: string }> = {
  hrms: { name: "AskMira", role: "HRMS" },
  anytimehire: { name: "AnytimeHire", role: "Hiring" },
  "expense-genie": { name: "Expense Genie", role: "Expenses" },
  helpdesk: { name: "CGB Helpdesk", role: "IT support" },
  procureflow: { name: "ProcureFlow", role: "Procurement" },
  saleinx: { name: "Saleinx", role: "CRM" },
};

export const appStatus = (app: ScreenApp): ConnectionStatus => appByKey(app).connection.status;

export const screens = {
  amHome: {
    id: "am-home",
    app: "hrms",
    title: "Home",
    alt: "AskMira home screen for an HR admin: headcount, new hires, people on leave, approvals waiting, a punch-in clock and leave balances.",
    image: amHome,
    hotspots: [
      { x: 22, y: 35, title: "Numbers from one record", body: "Headcount, joiners, leave and approvals are counted from the same employee record payroll reads." },
      { x: 53, y: 51, title: "Punch in from the browser", body: "Web punch with location. The phone app and biometric devices land on the same day." },
      { x: 79, y: 35, title: "Approvals in one inbox", body: "Leave, attendance fixes, profile changes and requisitions wait here for whoever signs next." },
    ],
  },
  amPayroll: {
    id: "am-payroll",
    app: "hrms",
    title: "Payroll runs",
    alt: "AskMira payroll runs: one row per month with entity, status, employee count, gross and net pay in rupees.",
    image: amPayroll,
    hotspots: [
      { x: 50, y: 62, title: "Every month, one run", body: "Draft, review, approve, publish. Nothing moves without a second person's sign-off." },
      { x: 79, y: 69, title: "Gross to net, in rupees", body: "PF, ESI, professional tax, LWF and TDS worked out on every payslip." },
      { x: 89, y: 19, title: "Start the next run", body: "Reads locked attendance, leave and salary revisions for the month." },
    ],
  },
  amBudget: {
    id: "am-budget",
    app: "hrms",
    title: "Headcount budget",
    alt: "AskMira headcount budget by department: approved, filled, vacant and frozen seats for the financial year.",
    image: amBudget,
    hotspots: [
      { x: 50, y: 57, title: "Approved seats per department", body: "The year's approved headcount and cost, by department." },
      { x: 70, y: 64, title: "Vacant seats are visible", body: "New positions over budget are refused before anyone starts hiring." },
    ],
  },
  amScenarios: {
    id: "am-scenarios",
    app: "hrms",
    title: "Scenarios",
    alt: "AskMira workforce scenario: a draft plan for next year's team, with the extra seats and their cost against the live plan.",
    image: amScenarios,
  },
  amOnboarding: {
    id: "am-onboarding",
    app: "hrms",
    title: "Onboarding",
    alt: "AskMira onboarding: new joiners with their joining dates and the tasks HR, IT and managers still have to finish.",
    image: amOnboarding,
  },
  amReports: {
    id: "am-reports",
    app: "hrms",
    title: "People analytics",
    alt: "AskMira people analytics: headcount today, joiners, attrition and voluntary attrition, with headcount and attrition charts by month.",
    image: amReports,
    hotspots: [
      { x: 60, y: 42, title: "Attrition you can trust", body: "Worked out from real exits and month-end headcount, not a survey." },
      { x: 38, y: 76, title: "Headcount by month", body: "Joiners and leavers each month, for any team or location." },
    ],
  },
  amOrgchart: {
    id: "am-orgchart",
    app: "hrms",
    title: "Org chart",
    alt: "AskMira org chart: a canvas of people cards under the chief executive, with team filters.",
    image: amOrgchart,
    hotspots: [{ x: 60, y: 63, title: "Drag to reorganise", body: "HR moves people between managers on the canvas, with undo." }],
  },
  amHiring: {
    id: "am-hiring",
    app: "hrms",
    title: "Requisitions",
    alt: "AskMira requisitions: a requisition waiting for approval with an off-budget warning, and a list of open roles.",
    image: amHiring,
    hotspots: [
      { x: 84, y: 43, title: "Approve in order", body: "Each requisition follows its approval chain before a single candidate is added." },
      { x: 40, y: 48, title: "Warned when off budget", body: "A role outside an approved position says so before anyone signs." },
    ],
  },
  amAttendance: {
    id: "am-attendance",
    app: "hrms",
    title: "Attendance",
    alt: "AskMira attendance: today's clock, punch in and out, a map of where punches came from and the month's attendance.",
    image: amAttendance,
  },
  amMira: {
    id: "am-mira",
    app: "hrms",
    title: "Ask Mira",
    alt: "Ask Mira, AskMira's assistant, answering a question in the workspace with the source of its answer.",
    image: amMira,
  },
  athDash: {
    id: "ath-dash",
    app: "anytimehire",
    title: "Dashboard",
    alt: "AnytimeHire dashboard: active jobs, interviews scheduled, hire rate and a monthly hiring funnel chart.",
    image: athDash,
    hotspots: [
      { x: 60, y: 38, title: "Hiring at a glance", body: "Open jobs, interviews booked and candidates waiting on you." },
      { x: 40, y: 76, title: "Funnel by month", body: "Applied, interviewed, offered and hired, month by month." },
    ],
  },
  athPipeline: {
    id: "ath-pipeline",
    app: "anytimehire",
    title: "Candidates",
    alt: "AnytimeHire candidates for one job: AI round, panel round and offer stages, with interview score, trust score and résumé fit.",
    image: athPipeline,
    hotspots: [
      { x: 44, y: 19, title: "Stages you can see", body: "From AI round to panel round to offer, with a count at every step." },
      { x: 66, y: 43, title: "Scored AI interviews", body: "Each candidate's interview score and trust score from proctoring." },
      { x: 79, y: 43, title: "Résumé fit", body: "High, medium or low fit against the job, before the interview." },
    ],
  },
  athJobs: {
    id: "ath-jobs",
    app: "anytimehire",
    title: "Job openings",
    alt: "AnytimeHire job openings: cards for each open role with applications sent, interviews completed and top candidates.",
    image: athJobs,
  },
  egDash: {
    id: "eg-dash",
    app: "expense-genie",
    title: "Dashboard",
    alt: "Expense Genie admin dashboard in dark mode: this month's volume, pending and approved spend, a spending trend and a category breakdown.",
    image: egDash,
    theme: "dark",
    hotspots: [
      { x: 63, y: 42, title: "This month's spend", body: "Submitted, pending and approved, in rupees." },
      { x: 40, y: 68, title: "Spend against reimbursed", body: "See what has been claimed and what has been paid back." },
      { x: 92, y: 18, title: "Claims waiting on you", body: "One click to the approval queue." },
    ],
  },
  egApprovals: {
    id: "eg-approvals",
    app: "expense-genie",
    title: "Approvals",
    alt: "Expense Genie approvals queue in dark mode: claims with amounts, overdue flags and approve or reject buttons.",
    image: egApprovals,
    theme: "dark",
    hotspots: [{ x: 96, y: 30, title: "Approve or reject", body: "Overdue claims are flagged so nobody waits on a reimbursement." }],
  },
  egReports: {
    id: "eg-reports",
    app: "expense-genie",
    title: "Reports",
    alt: "Expense Genie reports in dark mode: approved and pending spend, spend by category and top spenders.",
    image: egReports,
    theme: "dark",
  },
  hdDash: {
    id: "hd-dash",
    app: "helpdesk",
    title: "Dashboard",
    alt: "CGB Helpdesk dashboard: total, queued, open, on-hold and closed tickets, engineers online and a ticket overview chart.",
    image: hdDash,
    hotspots: [
      { x: 55, y: 22, title: "Every ticket by status", body: "New, open, on hold and resolved, counted live." },
      { x: 86, y: 55, title: "Queue at a glance", body: "Where tickets are sitting this week." },
    ],
  },
  hdTickets: {
    id: "hd-tickets",
    app: "helpdesk",
    title: "Tickets",
    alt: "CGB Helpdesk ticket list: subject, location, requester, age, status and category for each ticket.",
    image: hdTickets,
    hotspots: [{ x: 72, y: 53, title: "Status and category", body: "Hardware, access, network or email — routed to the right engineer." }],
  },
  hdAssets: {
    id: "hd-assets",
    app: "helpdesk",
    title: "Assets",
    alt: "CGB Helpdesk asset register: asset code, type, status and location of laptops, monitors, phones and printers.",
    image: hdAssets,
  },
  pfLogin: {
    id: "pf-login",
    app: "procureflow",
    title: "Sign in",
    alt: "ProcureFlow's buyer portal sign-in page.",
    image: pfLogin,
  },
  sxLogin: {
    id: "sx-login",
    app: "saleinx",
    title: "Sign in",
    alt: "Saleinx CRM sign-in page.",
    image: sxLogin,
  },
  amDirectory: {
    id: "am-directory",
    app: "hrms",
    title: "Employees",
    alt: "AskMira employee directory: name, title, employee code, department, location and status, with filters.",
    image: amDirectoryImg,
  },
  amProfile: {
    id: "am-profile",
    app: "hrms",
    title: "Employee profile",
    alt: "An employee's profile in AskMira: job, personal, bank and statutory details on one record.",
    image: amProfileImg,
  },
  amImport: {
    id: "am-import",
    app: "hrms",
    title: "Add employees",
    alt: "AskMira's add employees screen: add one person, or many at once from an Excel file that is checked row by row.",
    image: amImportImg,
  },
  amDevices: {
    id: "am-devices",
    app: "hrms",
    title: "Biometric devices",
    alt: "AskMira biometric devices: eSSL and ZKTeco devices connected to the workspace.",
    image: amDevicesImg,
  },
  amLeave: {
    id: "am-leave",
    app: "hrms",
    title: "Leave",
    alt: "AskMira leave: balances by leave type, requests and the team calendar.",
    image: amLeaveImg,
  },
  amPayrun: {
    id: "am-payrun",
    app: "hrms",
    title: "Payroll run",
    alt: "An AskMira payroll run for one month: employees, gross, deductions, net pay and statutory totals.",
    image: amPayrunImg,
  },
  amStatutory: {
    id: "am-statutory",
    app: "hrms",
    title: "Statutory",
    alt: "AskMira statutory settings and returns: PF, ESI, professional tax and labour welfare fund.",
    image: amStatutoryImg,
  },
  amPayslip: {
    id: "am-payslip",
    app: "hrms",
    title: "Payslip",
    alt: "An AskMira payslip: earnings, deductions and net pay for the month.",
    image: amPayslipImg,
  },
  amBankfile: {
    id: "am-bankfile",
    app: "hrms",
    title: "Bank files",
    alt: "AskMira disbursements: bank transfer files for a payroll run, by bank.",
    image: amBankfileImg,
  },
  amCandidates: {
    id: "am-candidates",
    app: "hrms",
    title: "Candidates",
    alt: "AskMira candidates: everyone in the hiring pipeline with their role, stage and source.",
    image: amCandidatesImg,
  },
  amPerformance: {
    id: "am-performance",
    app: "hrms",
    title: "Review cycles",
    alt: "AskMira performance review cycles with their stage and completion.",
    image: amPerformanceImg,
  },
  amGoals: {
    id: "am-goals",
    app: "hrms",
    title: "Goals",
    alt: "AskMira goals: each person's goals with progress and due dates.",
    image: amGoalsImg,
  },
  amExpenses: {
    id: "am-expenses",
    app: "hrms",
    title: "Expense review",
    alt: "AskMira expense claims waiting for review, with amounts and categories.",
    image: amExpensesImg,
  },
  amDocs: {
    id: "am-docs",
    app: "hrms",
    title: "Letters",
    alt: "AskMira letters: offer, appointment and experience letters made from the company's own templates.",
    image: amDocsImg,
  },
  amApprovals: {
    id: "am-approvals",
    app: "hrms",
    title: "Approvals",
    alt: "AskMira approvals inbox: leave, attendance, profile and requisition requests waiting for a decision.",
    image: amApprovalsImg,
  },
  amSurveys: {
    id: "am-surveys",
    app: "hrms",
    title: "Surveys",
    alt: "AskMira surveys and polls with response counts.",
    image: amSurveysImg,
  },
  amUsers: {
    id: "am-users",
    app: "hrms",
    title: "Users and roles",
    alt: "AskMira users and roles: who can sign in and what each role may see and do.",
    image: amUsersImg,
  },
  amCompliance: {
    id: "am-compliance",
    app: "hrms",
    title: "Compliance",
    alt: "AskMira compliance: the audit trail and data-protection controls for the workspace.",
    image: amComplianceImg,
  },
  amCulture: {
    id: "am-culture",
    app: "hrms",
    title: "Culture feed",
    alt: "AskMira culture feed: shoutouts, announcements and celebrations.",
    image: amCultureImg,
  },
  amHiringAnalytics: {
    id: "am-hiring-analytics",
    app: "hrms",
    title: "Hiring analytics",
    alt: "AskMira hiring analytics: the hiring funnel with candidates and drop-off at each stage.",
    image: amHiringAnalyticsImg,
  },
  amPhone: {
    id: "am-phone-home",
    app: "hrms",
    title: "Home on a phone",
    alt: "AskMira's home screen on a phone browser, with the punch-in clock and today's numbers.",
    image: amPhoneImg,
  },
} satisfies Record<string, Screen>;

/** The product tour: each app with its screens, in the order of the business flow. */
export const tour: { app: ScreenApp; lead: string; screens: Screen[] }[] = [
  {
    app: "hrms",
    lead: "People, attendance, payroll and analytics on one employee record.",
    screens: [screens.amHome, screens.amPayroll, screens.amBudget, screens.amReports, screens.amHiring],
  },
  {
    app: "anytimehire",
    lead: "Jobs, AI interviews and candidate scoring. Opens from AskMira without a second sign-in.",
    screens: [screens.athDash, screens.athPipeline, screens.athJobs],
  },
  {
    app: "expense-genie",
    lead: "Claims, approvals and spend reports. Opens from AskMira without a second sign-in.",
    screens: [screens.egDash, screens.egApprovals, screens.egReports],
  },
  {
    app: "helpdesk",
    lead: "IT tickets and the asset register. HR sees them inside AskMira.",
    screens: [screens.hdDash, screens.hdTickets, screens.hdAssets],
  },
  {
    app: "procureflow",
    lead: "Procure-to-pay with buyer and supplier portals. Connection to AskMira is planned.",
    screens: [screens.pfLogin],
  },
  {
    app: "saleinx",
    lead: "Sales CRM with pipeline analytics. Connection to AskMira is planned.",
    screens: [screens.sxLogin],
  },
];

/** The screen where each step of the hiring journey happens. Planned steps have none. */
export const journeyScreens: Partial<Record<string, Screen>> = {
  budget: screens.amBudget,
  workforce: screens.amScenarios,
  approval: screens.amHiring,
  recruitment: screens.athPipeline,
  onboarding: screens.amOnboarding,
  assets: screens.hdAssets,
  expenses: screens.egApprovals,
  helpdesk: screens.hdTickets,
  reporting: screens.amReports,
};

/** One representative screen per connected app. */
export const appScreens = {
  anytimehire: screens.athPipeline,
  "expense-genie": screens.egDash,
  helpdesk: screens.hdTickets,
} satisfies Partial<Record<ScreenApp, Screen>>;

/** A part of a screenshot, zoomed in: left, top and width as % of the full image. */
export type Crop = { x: number; y: number; w: number };

/** The real screen behind each feature picture on the site. */
export const featureScreens: Partial<Record<MockupKey, { screen: Screen; crop?: Crop; device?: "phone" }>> = {
  dashboard: { screen: screens.amHome },
  directory: { screen: screens.amDirectory },
  profile: { screen: screens.amProfile },
  import: { screen: screens.amImport },
  attendance: { screen: screens.amAttendance },
  devices: { screen: screens.amDevices },
  leave: { screen: screens.amLeave },
  payroll: { screen: screens.amPayrun },
  statutory: { screen: screens.amStatutory },
  payslip: { screen: screens.amPayslip },
  bankfile: { screen: screens.amBankfile },
  pipeline: { screen: screens.amCandidates },
  onboarding: { screen: screens.amOnboarding },
  analytics: { screen: screens.amReports },
  performance: { screen: screens.amPerformance },
  goals: { screen: screens.amGoals },
  expense: { screen: screens.amExpenses },
  document: { screen: screens.amDocs },
  workflow: { screen: screens.amApprovals },
  engagement: { screen: screens.amCulture },
  survey: { screen: screens.amSurveys },
  access: { screen: screens.amUsers },
  audit: { screen: screens.amCompliance },
  mira: { screen: screens.amMira },
  mobile: { screen: screens.amPhone, device: "phone" },
};
