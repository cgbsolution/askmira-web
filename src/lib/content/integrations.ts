/**
 * Integrations, each with an honest status:
 *
 *   available  works today
 *   pilot      built, but not yet verified against a live partner account
 *              (the backend adapters say so in their own notes)
 *   planned    on the roadmap (docs/ROADMAP.md), not built
 *
 * Tiles use a monogram rather than the partner's logo: no partner has approved
 * the use of their mark on this site.
 */
export type IntegrationStatus = "available" | "pilot" | "planned";

export type IntegrationCategory =
  | "Sign-in & identity"
  | "Attendance devices"
  | "Payroll & finance"
  | "Hiring"
  | "Notifications"
  | "AI assistants"
  | "Connected products"
  | "Developers";

export type Integration = {
  name: string;
  monogram: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  description: string;
};

export const integrations: Integration[] = [
  { name: "Google sign-in", monogram: "G", category: "Sign-in & identity", status: "available", description: "Sign in with Google Workspace accounts. Only verified emails are accepted." },
  { name: "Microsoft sign-in", monogram: "M", category: "Sign-in & identity", status: "available", description: "Sign in with Microsoft work accounts." },
  { name: "OpenID Connect SSO", monogram: "ID", category: "Sign-in & identity", status: "available", description: "Single sign-on with any OIDC identity provider, with the option to require it for everyone." },
  { name: "SCIM provisioning", monogram: "SC", category: "Sign-in & identity", status: "available", description: "Create and deactivate people automatically from your identity provider." },

  { name: "eSSL devices", monogram: "eS", category: "Attendance devices", status: "available", description: "Biometric terminals push punches over the ADMS protocol; each device is registered and checked by serial number." },
  { name: "ZKTeco devices", monogram: "ZK", category: "Attendance devices", status: "available", description: "The same ADMS push protocol, for ZKTeco terminals." },

  { name: "Salary bank files", monogram: "₹", category: "Payroll & finance", status: "available", description: "Transfer files in HDFC, ICICI, SBI, Axis and Kotak formats, generated from the approved run." },
  { name: "EPFO ECR", monogram: "PF", category: "Payroll & finance", status: "available", description: "The electronic challan-cum-return file for Provident Fund, from the payroll run." },
  { name: "TDS returns and Form 16", monogram: "TDS", category: "Payroll & finance", status: "available", description: "24Q returns, challans and Form 16 for salary TDS." },
  { name: "Tally", monogram: "T", category: "Payroll & finance", status: "available", description: "Payroll journal export with your own ledger names; unmapped lines are refused, not guessed." },
  { name: "Zoho Books", monogram: "Z", category: "Payroll & finance", status: "available", description: "The same ledger-mapped payroll journal, for Zoho Books." },

  { name: "LinkedIn Jobs", monogram: "in", category: "Hiring", status: "pilot", description: "Publish openings to LinkedIn. Built; being verified against a live partner account." },
  { name: "Naukri", monogram: "N", category: "Hiring", status: "pilot", description: "Publish openings to Naukri. Built; being verified against a live account." },
  { name: "Indeed", monogram: "I", category: "Hiring", status: "pilot", description: "Publish openings to Indeed. Built; being verified against a live account." },
  { name: "Google Calendar", monogram: "GC", category: "Hiring", status: "pilot", description: "Interview invitations on interviewers' calendars. Built; being verified with a live calendar." },
  { name: "Microsoft 365 calendar", monogram: "MC", category: "Hiring", status: "pilot", description: "Interview invitations in Outlook calendars. Built; being verified with a live tenant." },

  { name: "WhatsApp Business", monogram: "W", category: "Notifications", status: "available", description: "Notifications on WhatsApp through the Cloud API, using your own WhatsApp Business account." },
  { name: "Email", monogram: "@", category: "Notifications", status: "available", description: "Branded emails your admin can edit, with Approve and Reject buttons in approval emails." },
  { name: "Slack", monogram: "S", category: "Notifications", status: "planned", description: "On the roadmap: notifications and approvals in Slack." },
  { name: "Microsoft Teams", monogram: "MT", category: "Notifications", status: "planned", description: "On the roadmap: notifications and approvals in Teams." },

  { name: "Claude", monogram: "C", category: "AI assistants", status: "available", description: "Connect AskMira to Claude over MCP; it acts as the signed-in person, with their permissions." },
  { name: "ChatGPT", monogram: "AI", category: "AI assistants", status: "available", description: "The same MCP connector, for ChatGPT." },

  { name: "AnytimeHire", monogram: "AH", category: "Connected products", status: "available", description: "Openings, candidates and interviews from AnytimeHire, inside AskMira, connected in one click." },
  { name: "ExpenseGenie", monogram: "EG", category: "Connected products", status: "available", description: "Claims, approvals and totals from ExpenseGenie, inside AskMira." },
  { name: "CGB Helpdesk", monogram: "HD", category: "Connected products", status: "available", description: "IT tickets and the asset register from CGB Helpdesk, inside AskMira." },
  { name: "Digio eSign", monogram: "DG", category: "Connected products", status: "pilot", description: "Aadhaar eSign for letters. Built; being verified with live credentials." },

  { name: "REST API", monogram: "{ }", category: "Developers", status: "available", description: "Scoped, revocable API keys for employees, leave, attendance, org and hiring data." },
  { name: "Webhooks", monogram: "WH", category: "Developers", status: "available", description: "Every change can notify your systems — HMAC-signed, retried, never sent to private addresses." },
  { name: "BI connector", monogram: "BI", category: "Developers", status: "pilot", description: "Scheduled exports to your data warehouse. Built; delivery to destinations is in pilot." },
];

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  "Sign-in & identity",
  "Attendance devices",
  "Payroll & finance",
  "Hiring",
  "Notifications",
  "AI assistants",
  "Connected products",
  "Developers",
];

export const STATUS_LABEL: Record<IntegrationStatus, string> = {
  available: "Available",
  pilot: "In pilot",
  planned: "Planned",
};
