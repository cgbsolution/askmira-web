import { BookOpen, Fingerprint, IndianRupee, type LucideIcon } from "lucide-react";

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  note?: string;
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: "Payroll" | "Getting started" | "Attendance";
  icon: LucideIcon;
  readMinutes: number;
  updated: string;
  sections: GuideSection[];
};

/**
 * Practical guides. Statutory dates are general guidance; each guide that
 * mentions them says so and points readers to their adviser.
 */
export const guides: Guide[] = [
  {
    slug: "payroll-month-end-checklist-india",
    title: "The payroll month-end checklist for Indian HR teams",
    summary:
      "What to settle before you run payroll, what to check while it runs, and the statutory deposits and returns that follow.",
    category: "Payroll",
    icon: IndianRupee,
    readMinutes: 7,
    updated: "2026-10-27",
    sections: [
      {
        heading: "Why a checklist",
        paragraphs: [
          "Most payroll errors are not calculation errors. They are inputs that changed after the calculation — a late regularisation, a joiner whose date moved, an increment with the wrong effective date. A month-end checklist is a way of deciding, in order, when each input stops moving.",
        ],
      },
      {
        heading: "1. Before you run: settle the inputs",
        list: [
          "Attendance: every regularisation decided, overtime approved, and the period locked.",
          "Leave: pending requests for the month approved or rejected, so loss-of-pay days are final.",
          "Joiners and leavers: joining dates, last working days and anyone moving to full and final settlement.",
          "Salary changes: increments and promotions with the right effective date, and any arrears they create.",
          "Deductions and holds: loan instalments, advances to recover, and salaries to hold this month.",
        ],
      },
      {
        heading: "2. During the run: review the exceptions",
        paragraphs: ["Compute, then look at the employees whose pay is unusual before you look at anyone else's."],
        list: [
          "Anyone with zero payable days, or a negative net pay.",
          "New joiners and leavers, whose pay should be prorated.",
          "Employees near the ESI wage limit, who can move in or out of coverage.",
          "Large month-on-month changes in gross or TDS, especially after tax declarations change.",
          "Held salaries, to confirm they are still meant to be held.",
        ],
      },
      {
        heading: "3. Approve and pay",
        list: [
          "Approve the run once the exceptions are explained.",
          "Generate the bank transfer file in your bank's format and upload it.",
          "Publish payslips to employees.",
          "Post the payroll journal to your accounting system.",
        ],
      },
      {
        heading: "4. After pay day: deposits and returns",
        paragraphs: ["The usual due dates for salary-related deposits and returns:"],
        table: {
          head: ["What", "Usual due date"],
          rows: [
            ["PF contributions and ECR", "15th of the following month"],
            ["ESI contributions", "15th of the following month"],
            ["TDS on salary (deposit)", "7th of the following month; for March, 30 April"],
            ["TDS return (Form 24Q)", "31 July, 31 October, 31 January and 31 May, for the four quarters"],
            ["Form 16 to employees", "By 15 June after the financial year"],
            ["Professional tax and LWF", "Set by each state — check your state's schedule"],
          ],
        },
        note: "Due dates are general guidance as of October 2026 and can be extended by notification. Confirm with your tax adviser before relying on them.",
      },
      {
        heading: "How AskMira helps",
        paragraphs: [
          "In AskMira the order above is built in: a payroll run needs a locked attendance period, each employee's pay is reviewed before approval, and the bank file, ECR, challans, 24Q and Form 16 come from the approved run. Statutory rates are kept as dated versions, so an old run recomputes exactly as it did at the time.",
        ],
      },
    ],
  },
  {
    slug: "prepare-employee-data-for-import",
    title: "Moving off spreadsheets: preparing your employee data",
    summary:
      "How to get your employee sheet ready for AskMira, what the import checks, and how to fix the rows it sends back.",
    category: "Getting started",
    icon: BookOpen,
    readMinutes: 5,
    updated: "2026-10-27",
    sections: [
      {
        heading: "Start from what you already have",
        paragraphs: [
          "You do not need to rebuild your data in a new format. AskMira reads its own template, and it also reads exports from other HR systems as they come: headers are matched whatever their case and spacing.",
        ],
      },
      {
        heading: "The columns that matter most",
        paragraphs: ["The sheet is organised in six groups. Fill in the first two before anything else; the rest can follow."],
        list: [
          "Basic details: name, work email, mobile, gender and date of birth.",
          "Job details: joining date, employment type, designation, department, location, company (legal entity), grade and reporting manager.",
          "Personal: family names, emergency contact, blood group.",
          "Address: current and permanent.",
          "Statutory: PAN, Aadhaar, UAN and ESI number.",
          "Bank: account and IFSC for salary.",
        ],
      },
      {
        heading: "Tidy these before you upload",
        list: [
          "One person, one work email. AskMira refuses a second row with the same email, because one email is one login.",
          "Reporting managers who are themselves in the sheet, so the org chart can be drawn.",
          "Consistent names for departments, locations and legal entities, so they do not split into near-duplicates.",
          "Dates in one format throughout the sheet.",
        ],
      },
      {
        heading: "What happens when you upload",
        paragraphs: [
          "Every row is read and checked before anything is saved. Rows that pass are added; rows that do not are listed with a plain-English reason for each — a missing joining date, an email already in use, a manager who cannot be found.",
          "Download the file of rows not added, fix them, and upload just that file again. Nothing that was already added is duplicated.",
        ],
      },
      {
        heading: "Adding one person at a time",
        paragraphs: [
          "For a single joiner, use Add employees → One person. The wizard walks through the same groups and checks each field as you go.",
        ],
      },
    ],
  },
  {
    slug: "biometric-attendance-essl-zkteco",
    title: "Connecting eSSL and ZKTeco biometric devices",
    summary:
      "How AskMira receives punches from biometric terminals, what to set on the device, and how to check it is working.",
    category: "Attendance",
    icon: Fingerprint,
    readMinutes: 4,
    updated: "2026-10-27",
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "Most biometric terminals sold in India can push attendance logs to a server using the ADMS (\"iclock\") protocol. AskMira speaks that protocol: the device sends each punch as it happens, and AskMira files it against the right employee with the device's time zone applied.",
          "AskMira never sends commands or user lists back to a device — only the acknowledgements the protocol needs.",
        ],
      },
      {
        heading: "Register the device",
        list: [
          "In AskMira, go to Settings → Devices and add the device with the serial number printed on its label.",
          "AskMira gives the device its own push address, containing a token unique to that device.",
          "Enrol each person on the device with their AskMira employee code as the device user ID — that is how punches are matched to people.",
        ],
      },
      {
        heading: "Point the device at AskMira",
        list: [
          "In the device's communication or cloud server settings, enter the push address AskMira gave you.",
          "If the device's firmware only accepts a host and port, HR can allow serial-number-only push for that one device.",
          "Save, and make a test punch.",
        ],
        note: "The serial number in every upload must match the registered device. If two workspaces register the same serial for serial-only push, AskMira refuses it rather than guessing.",
      },
      {
        heading: "Check it is working",
        list: [
          "Settings → Devices shows when each device was last heard from, and flags one that has gone quiet.",
          "The test punch appears on the employee's attendance for today.",
          "Punches with a code AskMira does not recognise are parked as exceptions for HR, not dropped.",
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

export type ProductUpdate = {
  date: string;
  title: string;
  body: string;
  tags: string[];
};

/** Product updates, newest first, from the build log. */
export const productUpdates: ProductUpdate[] = [
  {
    date: "2026-10-26",
    title: "A new look, from the AskMira brand kit",
    body: "The portal, emails, payslips and the employee app now use the AskMira logo and colours. Status colours stay separate from the brand red, so an error never looks like a button.",
    tags: ["Design"],
  },
  {
    date: "2026-10-26",
    title: "Salary master export in your existing format",
    body: "Export the salary master in the familiar employee salary master layout, with selections kept as you page through the list.",
    tags: ["Payroll"],
  },
  {
    date: "2026-10-24",
    title: "Safer employee import",
    body: "The Excel import now refuses a repeated email within the sheet and gives you a download of every row that was not added, with the reason.",
    tags: ["Core HR"],
  },
  {
    date: "2026-10-23",
    title: "Salary master: type it, upload it, see the trail",
    body: "Edit every salary component directly, upload changes in bulk, and see the history of each change.",
    tags: ["Payroll"],
  },
  {
    date: "2026-10-22",
    title: "Payroll hardening",
    body: "A full pass over payroll: ECR format checks, guards against paying a month twice, salary holds, arrear ECR and encashment limits.",
    tags: ["Payroll", "Compliance"],
  },
  {
    date: "2026-10-22",
    title: "Menus organised by HR module, and a simpler way to add people",
    body: "The sidebar now follows HR modules. Onboarding → Add employees handles one person or many from Excel.",
    tags: ["Core HR"],
  },
  {
    date: "2026-10-21",
    title: "Branded emails, and approvals from the email itself",
    body: "Every email uses your workspace's branded layout, which admins can edit. Approval emails carry Approve and Reject buttons.",
    tags: ["Workflows"],
  },
  {
    date: "2026-10-21",
    title: "Connect AnytimeHire and Expense Genie in one click",
    body: "Admins connect each product from Settings → Connectors, with a separate secret for every workspace.",
    tags: ["Integrations"],
  },
  {
    date: "2026-10-20",
    title: "Ask Mira, your HR companion",
    body: "A companion in the sidebar that answers policy questions and looks up people, leave, attendance and reports as the signed-in person, within their permissions. Every page also gained a short help guide.",
    tags: ["AI"],
  },
  {
    date: "2026-10-16",
    title: "Two-step sign-in with your company's logo",
    body: "People enter their work email or mobile first and see their company's sign-in page, with Google, Microsoft or company single sign-on where enabled.",
    tags: ["Security"],
  },
  {
    date: "2026-10-15",
    title: "Approval chains, handbook answers and WhatsApp",
    body: "Multi-level approval chains, policy answers that quote your handbook, WhatsApp and push notifications, and sign-in for AI assistant connectors.",
    tags: ["Workflows", "AI"],
  },
];

export type ResourceCategory = { slug: string; title: string; description: string; href: string };

export const resourceHubs: ResourceCategory[] = [
  { slug: "guides", title: "Guides", description: "Practical how-tos for payroll, attendance and getting started.", href: "/resources#guides" },
  { slug: "updates", title: "Product updates", description: "What we have shipped recently, newest first.", href: "/resources/product-updates" },
  { slug: "faq", title: "FAQ", description: "Answers about setup, payroll, security and AI.", href: "/resources/faq" },
  { slug: "stories", title: "Customer stories", description: "How teams run HR on AskMira.", href: "/customers" },
];
