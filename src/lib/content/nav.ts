import { SpotBook, SpotConnected, SpotDashboard, SpotMegaphone, SpotMira, SpotNews, SpotPlug, SpotQuestion, SpotQuote, SpotShield, type SpotIcon } from "@/components/illustrations/spots";
import { platformApps } from "./ecosystem";
import { features, FEATURE_GROUPS } from "./features";
import { solutions } from "./solutions";

export type NavLink = { title: string; href: string; description?: string; icon?: SpotIcon };

/** Product: the platform-level pages. */
export const productLinks: NavLink[] = [
  { title: "Platform overview", href: "/platform", description: "How the HRMS modules fit together on one record.", icon: SpotDashboard },
  { title: "Connected platform", href: "/connected-platform", description: "HRMS plus hiring, expenses, support, sales and procurement.", icon: SpotConnected },
  { title: "Ask Mira AI", href: "/ai", description: "Answers across HR and your connected apps, with guardrails.", icon: SpotMira },
  { title: "Integrations", href: "/integrations", description: "Devices, banks, identity, AI assistants and an API.", icon: SpotPlug },
  { title: "Security & privacy", href: "/security", description: "Isolation, audit, sign-in controls and DPDP.", icon: SpotShield },
  { title: "What's new", href: "/resources/product-updates", description: "Recent product updates.", icon: SpotMegaphone },
];

/** The business apps around the HRMS, each with how it connects. */
export const appLinks: NavLink[] = [
  ...platformApps
    .filter((a) => a.key !== "hrms" && a.key !== "mira")
    .map((a) => ({ title: a.name, href: a.href, description: a.kind, icon: a.icon })),
];

/** Features: the twelve module pages, grouped as in the mega menu. */
export const featureGroups = FEATURE_GROUPS.map((group) => ({
  title: group,
  links: features
    .filter((f) => f.group === group)
    .map((f) => ({ title: f.name, href: `/features/${f.slug}`, description: f.short, icon: f.icon })),
}));

export const solutionGroups = (["By role", "By size"] as const).map((group) => ({
  title: group,
  links: solutions
    .filter((s) => s.menuGroup === group)
    .map((s) => ({ title: s.label, href: `/solutions/${s.slug}`, description: s.short, icon: s.icon })),
}));

export const resourceLinks: NavLink[] = [
  { title: "Guides", href: "/resources", description: "Practical how-tos for payroll, attendance and setup.", icon: SpotBook },
  { title: "Product updates", href: "/resources/product-updates", description: "What we have shipped recently.", icon: SpotNews },
  { title: "FAQ", href: "/resources/faq", description: "Setup, payroll, security and AI questions.", icon: SpotQuestion },
  { title: "Customer stories", href: "/customers", description: "How teams run HR on AskMira.", icon: SpotQuote },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { title: "Platform overview", href: "/platform" },
      { title: "Connected platform", href: "/connected-platform" },
      { title: "Ask Mira AI", href: "/ai" },
      { title: "Integrations", href: "/integrations" },
      { title: "Security & privacy", href: "/security" },
      { title: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Features",
    links: features.slice(0, 7).map((f) => ({ title: f.name, href: `/features/${f.slug}` })),
  },
  {
    title: "More features",
    links: features.slice(7).map((f) => ({ title: f.name, href: `/features/${f.slug}` })),
  },
  {
    title: "Solutions",
    links: solutions.map((s) => ({ title: s.label, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Resources & company",
    links: [
      { title: "Guides", href: "/resources" },
      { title: "Product updates", href: "/resources/product-updates" },
      { title: "FAQ", href: "/resources/faq" },
      { title: "Customer stories", href: "/customers" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { title: "Privacy policy", href: "/privacy" },
  { title: "Terms of service", href: "/terms" },
  { title: "Security", href: "/security" },
];
