import {
  Award,
  Banknote,
  Bell,
  BookOpen,
  Building2,
  Calculator,
  CalendarDays,
  ChartColumn,
  ClipboardCheck,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  FolderLock,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  IndianRupee,
  Inbox,
  KeyRound,
  Landmark,
  LogIn,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareQuote,
  Network,
  Plane,
  Receipt,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  UserCog,
  UserPlus,
  UsersRound,
  Vote,
  Webhook,
  Workflow,
} from "lucide-react";

import type { Feature } from "./types";

/**
 * The twelve feature pages. Every claim here is something the product ships
 * today; anything built but not yet verified against a live partner account is
 * called out as "in pilot" in the text, not presented as available.
 */
export const features: Feature[] = [
  {
    slug: "employee-management",
    name: "Employee information",
    short: "One trusted record for every person, from offer to exit.",
    icon: UsersRound,
    accent: "red",
    group: "Core HR",
    headline: "Every employee record, complete and in one place",
    intro:
      "Personal, job, pay, bank, statutory and document details live on one profile. Changes go through approval, every edit is logged, and nobody re-types the same details into three spreadsheets.",
    heroMockup: "profile",
    whatIs: {
      title: "The record everything else reads from",
      body: [
        "Employee information is AskMira's system of record. Payroll takes salary and bank details from it, attendance takes shifts and work locations, and the org chart draws itself from reporting lines.",
        "Because there is one record, a change made once — a transfer, a new bank account, a promotion — is right everywhere the next time anyone looks.",
      ],
    },
    blocks: [
      {
        eyebrow: "Profiles",
        title: "Profiles people can trust",
        body: "Everything about a person, on one page, with a history of who changed what.",
        points: [
          "Personal, job, bank and statutory IDs (PAN, UAN, ESI) on one profile",
          "PAN and other sensitive fields encrypted at rest",
          "Employees request changes; HR approves; admins update directly",
          "Custom fields and custom tables for whatever your company tracks",
        ],
        mockup: "profile",
      },
      {
        eyebrow: "Directory",
        title: "Find anyone, see how the company fits together",
        body: "A searchable directory and an org chart that stays current because it is drawn from the same records.",
        points: [
          "Search people by name, employee code or email from anywhere",
          "Org chart drawn from reporting lines",
          "Positions, legal entities and work locations",
          "Lifecycle events — confirmation, transfer, promotion — with effective dates",
        ],
        mockup: "directory",
      },
      {
        eyebrow: "Getting started",
        title: "Bring your whole company in, in an afternoon",
        body: "Add one joiner with a guided wizard, or everyone at once from your existing Excel sheet.",
        points: [
          "Excel import that checks every row before anything is saved",
          "A download of the rows that were not added, with the reason for each",
          "One email is one login, so duplicate people are refused",
          "Multiple legal entities and locations from day one",
        ],
        mockup: "import",
      },
    ],
    highlights: [
      { icon: ClipboardCheck, title: "Exits and clearance", body: "Resignations, notice periods and clearance tasks for IT, finance and the manager." },
      { icon: Network, title: "Org chart", body: "Always current, because it reads the same reporting lines payroll and approvals use." },
      { icon: Building2, title: "Assets", body: "Laptops, phones and ID cards assigned, returned and tracked against each person." },
    ],
    faqs: [
      { q: "Can employees edit their own details?", a: "They can request a change from their profile. HR sees the old and new values side by side and approves or rejects it. Admins and HR change records directly, without raising a request." },
      { q: "How do we move our existing data in?", a: "Upload your employee sheet in Excel. AskMira checks every row first and gives you a file of any rows it could not add, with the reason, so you can fix and re-upload just those." },
      { q: "Where are sensitive fields like PAN kept?", a: "In the database, encrypted at rest, and shown only to roles that are allowed to see them." },
    ],
    related: ["recruitment-onboarding", "documents", "access-control"],
    seoTitle: "Employee information management",
    seoDescription:
      "One employee record for personal, job, pay, bank and statutory details, with approvals, history, an org chart and Excel import.",
  },
  {
    slug: "recruitment-onboarding",
    name: "Recruitment & onboarding",
    short: "From requisition to a joiner's first day, without email chains.",
    icon: UserPlus,
    accent: "marigold",
    group: "Talent",
    headline: "Hire well, then make day one easy",
    intro:
      "Raise a requisition, publish it on your careers page, move candidates through interviews and offers, then hand each joiner straight into onboarding with their details already filled in.",
    heroMockup: "pipeline",
    whatIs: {
      title: "One path from open role to productive teammate",
      body: [
        "Hiring and onboarding are one flow in AskMira. The candidate you hire becomes the employee you onboard — no re-keying, no lost documents between teams.",
        "Managers raise and approve roles, recruiters run the pipeline, and HR, IT and the manager each get the onboarding tasks that belong to them.",
      ],
    },
    blocks: [
      {
        eyebrow: "Hiring",
        title: "A pipeline everyone can follow",
        body: "Every candidate, every stage, every interview — visible to the people who need it.",
        points: [
          "Requisitions approved before a role opens",
          "Your own careers site, with a page for every job",
          "Candidates by stage, talent pools and employee referrals",
          "Candidates pick their interview slot from a link",
          "Offers candidates can accept online",
        ],
        mockup: "pipeline",
      },
      {
        eyebrow: "Onboarding",
        title: "Day one, prepared before it arrives",
        body: "Checklists turn into tasks for each team, and the joiner sees their own plan.",
        points: [
          "Joiner plans built from your onboarding checklists",
          "Tasks for HR, IT, the manager and the joiner",
          "Documents and assets collected before the start date",
          "A personal onboarding page for every new joiner",
        ],
        mockup: "onboarding",
      },
    ],
    highlights: [
      { icon: TrendingUp, title: "Hiring analytics", body: "Funnel, sources and time to hire for every requisition." },
      { icon: Megaphone, title: "Job boards", body: "LinkedIn, Naukri and Indeed posting is in pilot — built, and being verified with live accounts." },
      { icon: UsersRound, title: "Already use AnytimeHire?", body: "Connect it and see openings, candidates and interviews inside AskMira." },
    ],
    faqs: [
      { q: "Do candidates need an account?", a: "No. Candidates apply from your careers page and use secure links to book interviews and respond to offers." },
      { q: "What happens to a candidate's details after they accept?", a: "They carry over into onboarding, so HR does not type them again." },
      { q: "Can we post to LinkedIn and Naukri?", a: "Job board posting is built and in pilot. We switch it on for a workspace once it has been verified against that board's live account." },
    ],
    related: ["employee-management", "documents", "workflows"],
    seoTitle: "Recruitment and onboarding",
    seoDescription:
      "Requisitions, a careers site, candidate pipeline, interview scheduling, offers and onboarding checklists in one flow.",
  },
  {
    slug: "attendance-leave",
    name: "Attendance & leave",
    short: "Punches, shifts and leave that payroll can trust.",
    icon: CalendarDays,
    accent: "blush",
    group: "Time & pay",
    headline: "Attendance that is right before payroll runs",
    intro:
      "Employees punch in from the web, their phone or a biometric device. Shifts, overtime and regularisations are worked out every night, and HR locks the month before payroll reads it.",
    heroMockup: "attendance",
    whatIs: {
      title: "From punch to payroll, without a spreadsheet in between",
      body: [
        "Attendance in AskMira is built backwards from payroll. Every punch, shift, holiday and approved leave becomes payable days and loss-of-pay days for the period.",
        "When HR locks the month, nothing can change behind payroll's back. If something must change, unlock, fix and lock again — with each step recorded.",
      ],
    },
    blocks: [
      {
        eyebrow: "Punch",
        title: "Punch in from wherever work happens",
        body: "Office, field or factory floor — each gets a way to punch that suits it.",
        points: [
          "Web and phone punch, checked against a geofence around each work location",
          "eSSL and ZKTeco biometric devices push punches directly",
          "A shared kiosk mode for shop floors and reception desks",
          "Late marks, half days and missed punches flagged for regularisation",
        ],
        mockup: "attendance",
      },
      {
        eyebrow: "Shifts",
        title: "Shifts, overtime and timesheets in one place",
        body: "Rosters and rules decide what a day is worth, so nobody has to.",
        points: [
          "Shift definitions, rosters and assignments",
          "Overtime requests and approvals",
          "Timesheets for project and client hours",
          "A monthly lock, so payroll always reads a settled month",
        ],
        mockup: "devices",
      },
      {
        eyebrow: "Leave",
        title: "Leave that balances itself",
        body: "Policies accrue, carry forward and encash on their own; managers approve in a tap.",
        points: [
          "Leave types, balances and accrual rules by policy",
          "Holiday calendars for each location",
          "Comp-off and leave encashment",
          "Approve from the inbox, a phone, or the email itself",
          "Who's out today, on everyone's home page",
        ],
        mockup: "leave",
      },
    ],
    highlights: [
      { icon: MapPin, title: "Geofenced punch", body: "Punches outside a work location's radius are flagged, not silently accepted." },
      { icon: Fingerprint, title: "Biometric devices", body: "Point eSSL or ZKTeco devices at AskMira and punches arrive on their own." },
      { icon: Timer, title: "Nightly recompute", body: "Days are recalculated every night until the period is locked." },
    ],
    faqs: [
      { q: "Which biometric devices work with AskMira?", a: "eSSL and ZKTeco devices that support the ADMS push protocol, which covers most terminals sold in India. Each device is registered to your workspace and its serial number is checked on every upload." },
      { q: "Can employees punch from their phone?", a: "Yes, from the phone's browser, with location shared. If a work location has a geofence, punches outside it are flagged for review." },
      { q: "What stops someone changing attendance after payroll has run?", a: "The period lock. Once HR locks a month, no recompute or regularisation can change it until it is unlocked, and both actions are recorded." },
    ],
    related: ["payroll", "self-service", "workflows"],
    seoTitle: "Attendance and leave management",
    seoDescription:
      "Web, phone and biometric punch with geofencing, shifts, overtime, timesheets, leave policies and a monthly payroll lock.",
  },
  {
    slug: "payroll",
    name: "Payroll & compliance",
    short: "Indian payroll with PF, ESI, PT, LWF and TDS built in.",
    icon: IndianRupee,
    accent: "red",
    group: "Time & pay",
    headline: "Run Indian payroll with the statutory work done for you",
    intro:
      "AskMira computes salaries from locked attendance, applies PF, ESI, professional tax, LWF and TDS, and produces payslips, the bank file and the return files — with a check at every step before money moves.",
    heroMockup: "payroll",
    whatIs: {
      title: "Payroll that shows its working",
      body: [
        "A payroll run in AskMira is a sequence you can follow: lock attendance, compute, review each employee's pay, approve, then generate the bank file and statutory files.",
        "Statutory rates are kept as dated versions, never overwritten. A run from last year recomputes exactly as it did then, even after the rules have changed.",
      ],
    },
    blocks: [
      {
        eyebrow: "The run",
        title: "A monthly run you can follow step by step",
        body: "Each step has to finish before the next can start, so mistakes surface while they are cheap.",
        points: [
          "Runs only on a locked attendance period",
          "Salary structures, plus an editable salary master with bulk upload",
          "Arrears, adjustments, loans and salary holds",
          "Every employee's pay reviewed before approval",
        ],
        mockup: "payroll",
      },
      {
        eyebrow: "Statutory",
        title: "Statutory compliance, built in rather than bolted on",
        body: "The filings Indian payroll teams lose evenings to, produced from the run itself.",
        points: [
          "PF, with the EPFO ECR file",
          "ESI, professional tax and labour welfare fund by state",
          "TDS under the old and new regimes, with declarations and proofs",
          "24Q returns, challans and Form 16",
        ],
        mockup: "statutory",
      },
      {
        eyebrow: "Pay out",
        title: "Pay people, post to the books, close the month",
        body: "The last mile of payroll, without retyping a single figure.",
        points: [
          "Bank files for HDFC, ICICI, SBI, Axis and Kotak",
          "Accounting journals for Tally and Zoho Books, mapped ledger by ledger",
          "Full and final settlements with gratuity and leave encashment",
          "Payslips employees open on their phone",
        ],
        mockup: "bankfile",
      },
    ],
    highlights: [
      { icon: Landmark, title: "Dated rule sets", body: "A rate change adds a new version from its effective date; history is never rewritten." },
      { icon: Calculator, title: "Money is exact", body: "Amounts are stored as exact decimals, never floating point, so paise never drift." },
      { icon: Banknote, title: "Double-pay guards", body: "The same month cannot be paid twice, and held salaries stay held." },
    ],
    faqs: [
      { q: "Which statutory deductions does AskMira handle?", a: "Provident Fund, ESI, professional tax and labour welfare fund by state, and TDS on salary under both tax regimes, with investment declarations, proofs, 24Q returns, challans and Form 16." },
      { q: "Can we run payroll before attendance is final?", a: "No. A run needs a locked attendance period. That rule is what keeps loss-of-pay days and payable days from changing after the money has gone." },
      { q: "Which banks are supported for salary transfer files?", a: "HDFC, ICICI, SBI, Axis and Kotak formats ship today. A new bank is usually a new format definition rather than new code." },
      { q: "Do you post payroll to our accounting software?", a: "Yes. Map each payslip line to a ledger once, and AskMira exports the journal for Tally or Zoho Books. An export with an unmapped line is refused rather than guessed." },
    ],
    related: ["attendance-leave", "expenses", "analytics"],
    seoTitle: "Payroll software with Indian statutory compliance",
    seoDescription:
      "Payroll on locked attendance with PF ECR, ESI, PT, LWF, TDS, 24Q, Form 16, bank files for major Indian banks and Tally/Zoho journals.",
  },
  {
    slug: "performance",
    name: "Performance",
    short: "Goals, reviews and growth on one honest record.",
    icon: Target,
    accent: "marigold",
    group: "Talent",
    headline: "Reviews that are fair, on time and actually used",
    intro:
      "Set goals, run review cycles with self and manager input, calibrate ratings across teams, and turn the outcome into increments and promotions — without a spreadsheet in sight.",
    heroMockup: "performance",
    whatIs: {
      title: "Performance as a year-round conversation",
      body: [
        "Goals, one-on-ones and feedback happen through the year, so the review is a summary rather than a surprise.",
        "Calibration and increments use the same ratings, which means the decision a manager made is the one that reaches payroll.",
      ],
    },
    blocks: [
      {
        eyebrow: "Through the year",
        title: "Goals, one-on-ones and feedback",
        body: "The everyday habits that make the annual review easy.",
        points: [
          "Goals for people and teams, with progress updates",
          "One-on-one notes managers and reports both see",
          "Feedback any time, from anyone",
          "Learning courses assigned and tracked",
        ],
        mockup: "goals",
      },
      {
        eyebrow: "Review cycles",
        title: "Cycles that run on schedule",
        body: "Configure once, and every stage reminds the right people.",
        points: [
          "Review cycles with self and manager stages",
          "Competencies and rating scales you define",
          "Calibration across teams before ratings are final",
          "Increments, promotions and improvement plans",
        ],
        mockup: "performance",
      },
    ],
    highlights: [
      { icon: GraduationCap, title: "Learning", body: "Courses assigned to people or teams, with overdue reminders." },
      { icon: TrendingUp, title: "Increments", body: "Proposals flow from ratings to approval to the salary master." },
      { icon: MessageSquareQuote, title: "Feedback", body: "Continuous feedback that managers can bring into the review." },
    ],
    faqs: [
      { q: "Can we use our own rating scale and competencies?", a: "Yes. Rating scales and competencies are set up by HR for each cycle." },
      { q: "How does calibration work?", a: "Managers see ratings across their teams together and adjust before the cycle closes, so ratings mean the same thing in every team." },
    ],
    related: ["engagement", "analytics", "employee-management"],
    seoTitle: "Performance management",
    seoDescription:
      "Goals, one-on-ones, feedback, review cycles, calibration, increments, promotions and learning in one place.",
  },
  {
    slug: "self-service",
    name: "Employee self-service",
    short: "Employees help themselves, on any screen.",
    icon: Smartphone,
    accent: "blush",
    group: "Core HR",
    headline: "Give every employee answers without raising a ticket",
    intro:
      "Payslips, tax declarations, leave, attendance, documents and requests — employees handle their own from a browser or their phone, and HR stops being the help desk.",
    heroMockup: "dashboard",
    whatIs: {
      title: "A home page that knows your day",
      body: [
        "Every employee lands on a home page with their punch, leave balance, upcoming holidays and anything waiting for them.",
        "From there, the common jobs are a tap away: apply for leave, download a payslip, declare investments, ask a policy question.",
      ],
    },
    blocks: [
      {
        eyebrow: "Pay and tax",
        title: "Pay, tax and benefits, explained",
        body: "The questions employees ask HR most, answered on their own screen.",
        points: [
          "Payslips for every month, ready to download",
          "Tax declarations and proof uploads",
          "Loan and leave encashment requests",
          "Benefits and stock options in one place",
        ],
        mockup: "payslip",
      },
      {
        eyebrow: "Ask HR",
        title: "Policy answers, with the source quoted",
        body: "Employees ask in plain language and get the answer from your own handbook.",
        points: [
          "Answers drawn from your company's policies",
          "The policy and section quoted with every answer",
          "Helpdesk tickets for anything that needs a person",
          "AI is off until your admin switches it on",
        ],
        mockup: "mira",
      },
      {
        eyebrow: "On the go",
        title: "Built for the phone in every pocket",
        body: "Every page works on a phone browser and can be added to the home screen.",
        points: [
          "Punch in, apply for leave and approve from a phone",
          "Add AskMira to the home screen like an app",
          "Native Android and iOS apps are in testing",
          "Email approvals for managers on the move",
        ],
        mockup: "mobile",
      },
    ],
    highlights: [
      { icon: BookOpen, title: "Help on every page", body: "Each screen has a short guide, so people learn by doing." },
      { icon: Inbox, title: "One inbox", body: "Everything waiting for you — approvals, tasks, surveys — in one list." },
      { icon: Bell, title: "Notifications", body: "In the app, by email and, if you connect it, on WhatsApp." },
    ],
    faqs: [
      { q: "Is there a mobile app?", a: "Every page of AskMira works in a phone browser and can be added to the home screen. Native Android and iOS apps are built and in testing." },
      { q: "Can employees see each other's pay?", a: "No. Employees see their own pay and documents. What managers and HR can see is controlled by role." },
    ],
    related: ["attendance-leave", "payroll", "workflows"],
    seoTitle: "Employee self-service portal",
    seoDescription:
      "Payslips, tax declarations, leave, attendance and policy answers for every employee, on any screen.",
  },
  {
    slug: "expenses",
    name: "Expenses & travel",
    short: "Claims, advances and GST credits, approved without chasing.",
    icon: Receipt,
    accent: "marigold",
    group: "Time & pay",
    headline: "Expense claims that pay back fast and audit clean",
    intro:
      "Employees claim with a receipt, your policies and rates check it as it is filed, managers and finance approve, and reimbursements can flow through payroll.",
    heroMockup: "expense",
    whatIs: {
      title: "Policy checked when the claim is made, not a month later",
      body: [
        "Limits and rates are applied while the employee fills in the claim, so finance reviews exceptions rather than every line.",
        "Approved claims can be paid with salary, and the GST on eligible invoices is tracked for input credit.",
      ],
    },
    blocks: [
      {
        eyebrow: "Claims",
        title: "Claims and travel, in one place",
        body: "From a taxi receipt to a three-city trip with an advance.",
        points: [
          "Claims with receipts, checked against your policies and rates",
          "Travel requests and advances",
          "Team approvals, then finance review",
          "GST credits tracked from eligible invoices",
        ],
        mockup: "expense",
      },
      {
        eyebrow: "Connected",
        title: "Paid with salary, or wherever you already work",
        body: "Expenses fit around your payroll and the tools you already use.",
        points: [
          "Salary reimbursements paid through the payroll run",
          "Already on Expense Genie? Connect it and see claims inside AskMira",
          "Exports for finance at month end",
        ],
        mockup: "workflow",
      },
    ],
    highlights: [
      { icon: Plane, title: "Travel", body: "Trips, advances and settlement against actual spend." },
      { icon: ScrollText, title: "Policies and rates", body: "Limits by grade, city or category, applied as the claim is made." },
      { icon: IndianRupee, title: "Through payroll", body: "Reimbursements land in the salary, with no separate transfer." },
    ],
    faqs: [
      { q: "Can reimbursements be paid with salary?", a: "Yes. Approved salary reimbursements are picked up by the next payroll run." },
      { q: "We already use Expense Genie. Do we have to switch?", a: "No. Connect Expense Genie and its claims, approvals and totals appear inside AskMira." },
    ],
    related: ["payroll", "workflows", "analytics"],
    seoTitle: "Expense and travel management",
    seoDescription:
      "Expense claims with receipts and policy checks, travel advances, approvals, GST credits and reimbursements through payroll.",
  },
  {
    slug: "documents",
    name: "Documents & letters",
    short: "Letters, policies and records — generated, acknowledged, stored.",
    icon: FileText,
    accent: "ink",
    group: "Core HR",
    headline: "Letters in seconds, and every document where you expect it",
    intro:
      "Offer, appointment, confirmation and relieving letters come from your own templates with each person's details filled in. Policies get acknowledged, and every document sits on the employee's profile.",
    heroMockup: "document",
    whatIs: {
      title: "Your templates, everyone's documents",
      body: [
        "HR writes a template once, with fields like name, designation and salary. AskMira fills them in for one person or a whole batch.",
        "Issued letters, uploaded proofs and acknowledged policies are filed on each employee's profile, in private storage.",
      ],
    },
    blocks: [
      {
        eyebrow: "Letters",
        title: "Generate the letters HR writes every week",
        body: "From one appointment letter to a hundred increment letters, in the same few clicks.",
        points: [
          "Templates with fields filled in from the employee record",
          "Letters issued one at a time or in bulk",
          "Aadhaar eSign through Digio is in pilot",
          "Every issued letter filed on the person's profile",
        ],
        mockup: "document",
      },
      {
        eyebrow: "Policies",
        title: "Know who has read the policy",
        body: "Publish a policy, ask for acknowledgement, and see who is still pending.",
        points: [
          "Company documents and policies in one library",
          "Acknowledgement tracking by person and department",
          "Retention rules for how long records are kept",
          "Employees find their own documents under My documents",
        ],
        mockup: "audit",
      },
    ],
    highlights: [
      { icon: FolderLock, title: "Private storage", body: "Files sit in a private store and are served only through AskMira, which checks who is asking and records it." },
      { icon: Download, title: "Bulk letters", body: "Increment season, done in one batch rather than one hundred Word files." },
      { icon: ShieldCheck, title: "Retention", body: "Keep records as long as the law requires, and no longer." },
    ],
    faqs: [
      { q: "Can we use our existing letter formats?", a: "Yes. Paste your letter into a template and mark the fields to fill in." },
      { q: "Do you support e-signatures?", a: "Aadhaar eSign through Digio is built and in pilot. It is switched on per workspace once verified with live credentials." },
    ],
    related: ["employee-management", "recruitment-onboarding", "access-control"],
    seoTitle: "HR document management and letters",
    seoDescription:
      "Letter templates, bulk letters, policy acknowledgement, retention rules and private document storage for every employee.",
  },
  {
    slug: "workflows",
    name: "Workflows & approvals",
    short: "Approvals that route themselves — and work from email.",
    icon: Workflow,
    accent: "red",
    group: "Platform",
    headline: "Every request finds the right approver, first time",
    intro:
      "Leave, attendance fixes, expenses, profile changes and lifecycle events follow approval chains you define. Approvers act from one inbox, a phone, or the Approve and Reject buttons in the email itself.",
    heroMockup: "workflow",
    whatIs: {
      title: "Rules you set once, followed every time",
      body: [
        "Approval chains decide who approves what, by role, manager or department. Reminders keep things moving and every decision is recorded.",
        "For anything AskMira does not cover, webhooks and the API let your own systems react the moment something changes.",
      ],
    },
    blocks: [
      {
        eyebrow: "Approvals",
        title: "Multi-level approvals, without the chasing",
        body: "The right people, in the right order, with reminders when something stalls.",
        points: [
          "Approval chains by role, reporting line or department",
          "One approvals inbox for everything waiting on you",
          "Approve or reject straight from the email",
          "Admins and HR act directly, without raising requests for themselves",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "Automation",
        title: "Automation that keeps HR's calendar clear",
        body: "Scheduled jobs and events do the routine follow-up.",
        points: [
          "Reminders for attendance, timesheets, overdue courses and asset returns",
          "Onboarding and clearance tasks created from your checklists",
          "Webhooks signed with HMAC, and a scoped REST API",
          "Branded email templates your admin can edit",
        ],
        mockup: "audit",
      },
    ],
    highlights: [
      { icon: Mail, title: "Email approvals", body: "Approve and Reject buttons that work from any mail app." },
      { icon: Webhook, title: "Webhooks", body: "Every change can notify your systems, signed and retried." },
      { icon: GitBranch, title: "Approval chains", body: "As many levels as your policy needs, per request type." },
    ],
    faqs: [
      { q: "Can managers approve without signing in?", a: "Yes. Approval emails carry Approve and Reject buttons. Each link names one approver and one request, and once the request is decided the link cannot change it." },
      { q: "Can we connect AskMira to our own systems?", a: "Yes. Create scoped API keys and webhook endpoints in Settings. Webhooks are signed so your system can verify they came from AskMira." },
    ],
    related: ["attendance-leave", "expenses", "access-control"],
    seoTitle: "HR workflow automation and approvals",
    seoDescription:
      "Multi-level approval chains, email approvals, reminders, lifecycle automation, webhooks and a REST API.",
  },
  {
    slug: "analytics",
    name: "Analytics & reports",
    short: "Headcount, attrition and cost, answered in a click.",
    icon: ChartColumn,
    accent: "ink",
    group: "Platform",
    headline: "See your workforce clearly, and export anything",
    intro:
      "Live dashboards for headcount, joiners and leavers, attendance and payroll cost, plus a report library you can filter and export to Excel.",
    heroMockup: "analytics",
    whatIs: {
      title: "Numbers from the system that runs the work",
      body: [
        "Because attendance, payroll and people data live in one place, a report never has to reconcile three exports.",
        "Managers see their own teams; HR sees the company. The same role rules apply to every chart and every export.",
      ],
    },
    blocks: [
      {
        eyebrow: "Dashboards",
        title: "The questions leadership asks every month",
        body: "Headcount, movement, attendance and cost, up to date when you open it.",
        points: [
          "Headcount by department, location and entity",
          "Joiners, leavers and attrition trends",
          "Attendance patterns and leave usage",
          "Payroll cost by month and cost centre",
        ],
        mockup: "analytics",
      },
      {
        eyebrow: "Reports",
        title: "A report library you can actually use",
        body: "Filter, choose your columns and export, without asking anyone for a dump.",
        points: [
          "Ready-made reports across every module",
          "Filters, column choice and Excel export",
          "Hiring analytics for every requisition",
          "A BI connector for your data warehouse is in pilot",
        ],
        mockup: "directory",
      },
    ],
    highlights: [
      { icon: Database, title: "One source", body: "Every number comes from the same records payroll uses." },
      { icon: FileSpreadsheet, title: "Excel export", body: "Any report, filtered the way you need it." },
      { icon: Sparkles, title: "Ask in plain words", body: "With AI switched on, ask a question and get the figure with how it was worked out." },
    ],
    faqs: [
      { q: "Can managers see analytics for their own team?", a: "Yes. Managers see their reporting tree; HR and admins see the whole company." },
      { q: "Can we get the data into our own BI tool?", a: "Excel export works today. A direct BI connector is built and in pilot." },
    ],
    related: ["payroll", "performance", "engagement"],
    seoTitle: "HR analytics and reporting",
    seoDescription:
      "Dashboards for headcount, attrition, attendance and payroll cost, with a filterable report library and Excel export.",
  },
  {
    slug: "engagement",
    name: "Engagement & culture",
    short: "Recognition, surveys and a voice for everyone.",
    icon: HeartHandshake,
    accent: "blush",
    group: "Talent",
    headline: "Make culture something you can see and act on",
    intro:
      "Shoutouts, awards and points make good work visible. Surveys, polls and an anonymous Your Voice channel tell you how people really feel, so you hear about problems early.",
    heroMockup: "engagement",
    whatIs: {
      title: "Where people meet people",
      body: [
        "The culture feed is where announcements, shoutouts, awards and events live — the part of HR employees choose to open.",
        "Surveys and Your Voice give HR a measured signal, with anonymity that is enforced rather than promised.",
      ],
    },
    blocks: [
      {
        eyebrow: "Recognition",
        title: "Recognition that travels across the company",
        body: "Say thank you in public, and let it add up to something.",
        points: [
          "A company feed with shoutouts and announcements",
          "Awards with nominations",
          "Reward points people can see grow",
          "Clubs for the things people care about outside work",
        ],
        mockup: "engagement",
      },
      {
        eyebrow: "Listening",
        title: "Hear what people won't say in a meeting",
        body: "Measured feedback, plus a safe channel for the hard things.",
        points: [
          "Surveys, with anonymous results held back until enough people answer",
          "Quick polls and events",
          "Your Voice: anonymous concerns, handled as cases",
          "Trends over time, not just one snapshot",
        ],
        mockup: "survey",
      },
    ],
    highlights: [
      { icon: Award, title: "Awards", body: "Nominate, shortlist and celebrate, in the feed." },
      { icon: Vote, title: "Polls and events", body: "Quick questions and RSVPs without a separate tool." },
      { icon: ShieldCheck, title: "Anonymity that holds", body: "Anonymous results wait until enough people have answered, so nobody is singled out." },
    ],
    faqs: [
      { q: "Are answers anonymous?", a: "When a poll or survey is anonymous, its results stay hidden until enough people have answered, so one person's answer cannot be picked out." },
      { q: "What is Your Voice?", a: "A channel where employees raise concerns anonymously. Each concern becomes a case HR can respond to without learning who raised it." },
    ],
    related: ["performance", "self-service", "analytics"],
    seoTitle: "Employee engagement and recognition",
    seoDescription:
      "Culture feed, shoutouts, awards, reward points, clubs, surveys, polls and an anonymous Your Voice channel.",
  },
  {
    slug: "access-control",
    name: "Roles & access",
    short: "The right people see the right data. Nobody else.",
    icon: KeyRound,
    accent: "ink",
    group: "Platform",
    headline: "Access that matches how your company is run",
    intro:
      "Admins, HR sub-admins and employees, with manager rights that follow reporting lines. Every screen and every API call checks them, and every change is recorded.",
    heroMockup: "access",
    whatIs: {
      title: "Permissions enforced on the server, not just hidden in the menu",
      body: [
        "Hiding a button is not security. AskMira checks the role on every request, so data a person cannot see never leaves the server.",
        "Managing people is a place in the org chart, not a role you hand out: anyone with direct reports gets manager rights for their team, and loses them when the team changes.",
      ],
    },
    blocks: [
      {
        eyebrow: "Roles",
        title: "Roles that fit your HR team",
        body: "A small set of roles that are easy to reason about, and hard to misconfigure.",
        points: [
          "Admin, HR sub-admin and employee roles",
          "Manager rights that follow reporting lines automatically",
          "Admins and HR act directly; employees raise requests",
          "Operator access for payroll bureaus, granted by the client",
        ],
        mockup: "access",
      },
      {
        eyebrow: "Sign-in",
        title: "Sign-in your IT team will approve",
        body: "Use the identity provider you already have, or strong passwords with a second step.",
        points: [
          "Single sign-on with OpenID Connect",
          "Google and Microsoft sign-in",
          "Two-step verification and IP allowlists",
          "SCIM provisioning to add and remove people automatically",
        ],
        mockup: "audit",
      },
    ],
    highlights: [
      { icon: ScrollText, title: "Insert-only audit log", body: "Every change is recorded, and the log itself cannot be edited or deleted." },
      { icon: UserCog, title: "Workspace isolation", body: "Each company's data is separated on every query, by design." },
      { icon: LogIn, title: "SSO and 2-step", body: "OIDC single sign-on, Google and Microsoft, and two-step verification." },
    ],
    faqs: [
      { q: "Can we use our company's single sign-on?", a: "Yes. AskMira supports OpenID Connect single sign-on, plus Google and Microsoft sign-in. Admins can require SSO for everyone." },
      { q: "Who can see salaries?", a: "Employees see their own. Payroll and admin roles see what their role allows. Every view of sensitive data follows the same server-side rules." },
      { q: "Can a payroll bureau or CA firm work in our workspace?", a: "Yes, through operator access you grant. Their actions are recorded as theirs, so you can always tell your staff from the bureau's." },
    ],
    related: ["employee-management", "workflows", "documents"],
    seoTitle: "Role-based access control and security",
    seoDescription:
      "Admin, sub-admin, manager and employee access enforced on the server, with SSO, two-step verification, IP allowlists, SCIM and an insert-only audit log.",
  },
];

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);

export const FEATURE_GROUPS = ["Core HR", "Time & pay", "Talent", "Platform"] as const;
