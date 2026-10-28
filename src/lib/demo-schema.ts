// zod/mini: the same rules as full zod at a fraction of the download.
import * as z from "zod/mini";

/**
 * The demo request, validated identically in the browser (as people type) and
 * on the server (before anything is sent to the API). Limits match the API's
 * own schema in backend/app/schemas/demo_request.py.
 */

export const COMPANY_SIZES = ["1-50", "51-200", "201-500", "501-1,000", "1,000+"] as const;

export const ROLES = ["HR or People", "Finance or Payroll", "Founder or Leadership", "IT", "Other"] as const;

export const INTERESTS = [
  { value: "payroll", label: "Payroll & compliance" },
  { value: "attendance", label: "Attendance & leave" },
  { value: "core_hr", label: "Employee records" },
  { value: "hiring", label: "Hiring & onboarding" },
  { value: "performance", label: "Performance" },
  { value: "engagement", label: "Engagement" },
  { value: "ai", label: "Ask Mira AI" },
  { value: "expenses", label: "Expense Genie" },
  { value: "helpdesk", label: "CGB Helpdesk" },
  { value: "crm", label: "Saleinx CRM" },
  { value: "procurement", label: "ProcureFlow" },
] as const;

export const TOPICS = [
  { value: "demo", label: "Book a demo" },
  { value: "pricing", label: "Pricing and plans" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
] as const;

const INTEREST_VALUES = INTERESTS.map((i) => i.value) as [string, ...string[]];
const TOPIC_VALUES = TOPICS.map((t) => t.value) as [string, ...string[]];

/**
 * Starts with a letter; then letters in any script (with their vowel signs),
 * spaces and . ' ’ - — "D'Souza", "Anne-Marie" and "प्रिया" all pass. Same rule as the API.
 */
const NAME_PATTERN = /^\p{L}[\p{L}\p{M} .'’-]*$/u;

/** Digits with optional +, spaces, brackets and dashes. */
export const PHONE_ALLOWED = /[^\d+\s()-]/g;

const digitCount = (v: string) => v.replace(/\D/g, "").length;

export const demoRequestSchema = z.object({
  fullName: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Please enter your full name."),
      z.minLength(2, "A name needs at least 2 characters."),
      z.maxLength(100, "Please keep your name under 100 characters."),
      z.regex(NAME_PATTERN, "Please use letters only — no numbers or symbols."),
    ),
  workEmail: z.pipe(
    z
      .string()
      .check(
        z.trim(),
        z.minLength(1, "Please enter your work email."),
        z.maxLength(254, "That email address is too long."),
      ),
    z.email("Please enter a valid email address, like name@company.com."),
  ),
  company: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Please enter your company's name."),
      z.minLength(2, "A company name needs at least 2 characters."),
      z.maxLength(120, "Please keep the company name under 120 characters."),
    ),
  phone: z
    .string()
    .check(
      z.trim(),
      z.maxLength(20, "That phone number is too long."),
      z.refine((v) => v === "" || /^\+?[\d\s()-]+$/.test(v), "Please use digits only, with an optional + at the start."),
      z.refine(
        (v) => v === "" || (digitCount(v) >= 8 && digitCount(v) <= 15),
        "Please enter a phone number with 8 to 15 digits.",
      ),
    ),
  companySize: z.enum(COMPANY_SIZES, "Please choose your company size."),
  role: z.union([z.enum(ROLES), z.literal("")]),
  interests: z.array(z.enum(INTEREST_VALUES)).check(z.maxLength(INTERESTS.length)),
  message: z.string().check(z.trim(), z.maxLength(1000, "Please keep your message under 1,000 characters.")),
  topic: z.enum(TOPIC_VALUES),
  consent: z.boolean().check(z.refine((v) => v, "Please agree so that we can contact you about your request.")),
  /** A field people never see. Anything in it means a bot filled the form. */
  website: z.string().check(z.maxLength(200)),
  /** The page the form was sent from, for the sales team's context. */
  sourcePath: z.string().check(z.maxLength(200)),
});

export type DemoRequestInput = z.input<typeof demoRequestSchema>;
export type DemoRequest = z.output<typeof demoRequestSchema>;

export const MESSAGE_LIMIT = 1000;

export const emptyDemoRequest = (topic: string = "demo", sourcePath = "/"): DemoRequestInput => ({
  fullName: "",
  workEmail: "",
  company: "",
  phone: "",
  // Left unset so the select shows its placeholder; the schema rejects it until chosen.
  companySize: undefined as unknown as DemoRequestInput["companySize"],
  role: "",
  interests: [],
  message: "",
  topic,
  consent: false,
  website: "",
  sourcePath,
});
