import { SpotBank, SpotBox, SpotCalendar, SpotChat, SpotCode, SpotConnected, SpotDatabase, SpotDevice, SpotDocuments, SpotFileSend, SpotHeadset, SpotKey, SpotLedger, SpotMail, SpotMegaphone, SpotMira, SpotReceipt, SpotRecruit, SpotShield, SpotSign, SpotTeam, SpotTrend, type SpotIcon } from "@/components/illustrations/spots";

/**
 * Integrations AskMira ships. Each connects with the customer's own account at
 * the partner (their bot, their keys, their board subscription).
 *
 * Tiles show a spot illustration of what each integration does, not the
 * partner's logo: no partner has approved the use of their mark on this site.
 */
export type IntegrationStatus = "available";

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
  /** A spot illustration of what the integration does — partners' own logos are not used. */
  spot: SpotIcon;
  category: IntegrationCategory;
  status: IntegrationStatus;
  description: string;
};

export const integrations: Integration[] = [
  { name: "Google sign-in", spot: SpotKey, category: "Sign-in & identity", status: "available", description: "Sign in with Google Workspace accounts. Only verified emails are accepted." },
  { name: "Microsoft sign-in", spot: SpotKey, category: "Sign-in & identity", status: "available", description: "Sign in with Microsoft work accounts." },
  { name: "OpenID Connect SSO", spot: SpotShield, category: "Sign-in & identity", status: "available", description: "Single sign-on with any OIDC identity provider, with the option to require it for everyone." },
  { name: "SCIM provisioning", spot: SpotTeam, category: "Sign-in & identity", status: "available", description: "Create and deactivate people automatically from your identity provider." },

  { name: "eSSL devices", spot: SpotDevice, category: "Attendance devices", status: "available", description: "Biometric terminals push punches over the ADMS protocol; each device is registered and checked by serial number." },
  { name: "ZKTeco devices", spot: SpotDevice, category: "Attendance devices", status: "available", description: "The same ADMS push protocol, for ZKTeco terminals." },

  { name: "Salary bank files", spot: SpotBank, category: "Payroll & finance", status: "available", description: "Transfer files in HDFC, ICICI, SBI, Axis and Kotak formats, generated from the approved run." },
  { name: "EPFO ECR", spot: SpotFileSend, category: "Payroll & finance", status: "available", description: "The electronic challan-cum-return file for Provident Fund, from the payroll run." },
  { name: "TDS returns and Form 16", spot: SpotDocuments, category: "Payroll & finance", status: "available", description: "24Q returns, challans and Form 16 for salary TDS." },
  { name: "Tally", spot: SpotLedger, category: "Payroll & finance", status: "available", description: "Payroll journal export with your own ledger names; unmapped lines are refused, not guessed." },
  { name: "Zoho Books", spot: SpotLedger, category: "Payroll & finance", status: "available", description: "The same ledger-mapped payroll journal, for Zoho Books." },

  { name: "LinkedIn Jobs", spot: SpotMegaphone, category: "Hiring", status: "available", description: "Publish openings to LinkedIn with your own account, from the requisition." },
  { name: "Naukri", spot: SpotMegaphone, category: "Hiring", status: "available", description: "Publish openings to Naukri with your own subscription; applications come back to the requisition." },
  { name: "Indeed", spot: SpotMegaphone, category: "Hiring", status: "available", description: "Publish openings to Indeed with your own account." },
  { name: "Google Calendar", spot: SpotCalendar, category: "Hiring", status: "available", description: "Interview invitations on interviewers' Google calendars, with their free and busy times." },
  { name: "Microsoft 365 calendar", spot: SpotCalendar, category: "Hiring", status: "available", description: "Interview invitations in Outlook calendars, with their free and busy times." },

  { name: "WhatsApp Business", spot: SpotChat, category: "Notifications", status: "available", description: "Notifications on WhatsApp through the Cloud API, using your own WhatsApp Business account." },
  { name: "Email", spot: SpotMail, category: "Notifications", status: "available", description: "Branded emails your admin can edit, with Approve and Reject buttons in approval emails." },
  { name: "Slack", spot: SpotChat, category: "Notifications", status: "available", description: "Approvals and updates as direct messages from your own Slack app, with Approve and Reject buttons." },
  { name: "Microsoft Teams", spot: SpotChat, category: "Notifications", status: "available", description: "Approvals and updates in Teams chats from your own Teams bot, with Approve and Reject buttons." },

  { name: "Claude", spot: SpotMira, category: "AI assistants", status: "available", description: "Connect AskMira to Claude over MCP; it acts as the signed-in person, with their permissions." },
  { name: "ChatGPT", spot: SpotMira, category: "AI assistants", status: "available", description: "The same MCP connector, for ChatGPT." },

  { name: "AnytimeHire", spot: SpotRecruit, category: "Connected products", status: "available", description: "Connected in one click: approved requisitions open their job there, and hired candidates come back as joiners." },
  { name: "Expense Genie", spot: SpotReceipt, category: "Connected products", status: "available", description: "Claims and totals inside AskMira; approved claims are paid with salary in payroll." },
  { name: "CGB Helpdesk", spot: SpotHeadset, category: "Connected products", status: "available", description: "IT tickets and the asset register from CGB Helpdesk, inside AskMira." },
  { name: "Saleinx CRM", spot: SpotTrend, category: "Connected products", status: "available", description: "Deals, the pipeline and Wons to approve inside AskMira; a won order opens its positions; the pipeline sits beside department budgets." },
  { name: "ProcureFlow", spot: SpotBox, category: "Connected products", status: "available", description: "Approvals, orders, invoices and cost-centre budgets inside AskMira; received equipment added to the asset register." },
  { name: "Digio eSign", spot: SpotSign, category: "Connected products", status: "available", description: "Aadhaar eSign for letters, with your Digio account; the signed copy is filed on the profile." },

  { name: "REST API", spot: SpotCode, category: "Developers", status: "available", description: "Scoped, revocable API keys for employees, leave, attendance, org and hiring data." },
  { name: "Webhooks", spot: SpotConnected, category: "Developers", status: "available", description: "Every change can notify your systems — HMAC-signed, retried, never sent to private addresses." },
  { name: "BI connector", spot: SpotDatabase, category: "Developers", status: "available", description: "Nightly CSV files in your own S3-compatible bucket, or a feed link for Power BI, Excel and Looker Studio." },
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
};
