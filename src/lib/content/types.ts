import type { SpotIcon } from "@/components/illustrations/spots";

/** Product previews, rendered by components/product/registry.tsx. */
export type MockupKey =
  | "dashboard"
  | "directory"
  | "profile"
  | "import"
  | "attendance"
  | "devices"
  | "leave"
  | "payroll"
  | "statutory"
  | "payslip"
  | "bankfile"
  | "pipeline"
  | "onboarding"
  | "analytics"
  | "performance"
  | "goals"
  | "expense"
  | "document"
  | "workflow"
  | "engagement"
  | "survey"
  | "access"
  | "audit"
  | "mira"
  | "mobile";

/** Decorative accent for icon chips and panels. Never used to signal status. */
export type Accent = "red" | "marigold" | "blush" | "ink";

export type FeatureBlock = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  mockup: MockupKey;
};

export type Highlight = { icon: SpotIcon; title: string; body: string };

export type Faq = { q: string; a: string };

export type Feature = {
  slug: string;
  name: string;
  /** One line, for menus and cards. */
  short: string;
  icon: SpotIcon;
  accent: Accent;
  /** Which menu group it sits in. */
  group: "Core HR" | "Time & pay" | "Talent" | "Platform";
  headline: string;
  intro: string;
  heroMockup: MockupKey;
  whatIs: { title: string; body: string[] };
  blocks: FeatureBlock[];
  highlights: Highlight[];
  faqs: Faq[];
  related: string[];
  seoTitle: string;
  seoDescription: string;
};
